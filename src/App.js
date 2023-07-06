
import { Form } from "./components/Form";
import MovieCard from "./components/MovieCard";
import { useState, useRef } from "react";
import { movieRandomizer } from "./utils/movieRandomizer";
import { isEqual } from "lodash";

function App() {
  const retrievedMovies = useRef([])
  const [currentMovie, setCurrentMovie] = useState('')
  let queryParameters = useRef({})
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjk1ZDBkOTBjYjY0NWM5ODI4NzQ5OGQ4YjAzYmU0NiIsInN1YiI6IjY0NmI3NzA5MmJjZjY3MDEzODk1ZjAyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-VMPfC37YRrc70K_jFz27jVgd-_bbWlnUSJHRO4jww'
    }
  }

  const getMoviesForPage = (results_page_num) => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${results_page_num}&watch_region=US&sort_by=popularity.desc&with_genres=${queryParameters.current.genreIds.join('|')}&with_watch_providers=${queryParameters.current.providerIds.join('|')}&vote_count.gte=${queryParameters.current.popularityMin}&vote_count.lte=${queryParameters.current.popularityMax}&vote_average.gte=${queryParameters.current.ratingMin}&vote_average.lte=${queryParameters.current.ratingMax}`
    return fetch(url, options)
    .then(res => res.json())
    .then(json => {
      return json.results
      //console.log('added to retrieved movies:' + retrievedMovies.current.length)
    })
    .catch(err => console.error('error: ' + err))
  }

  const getRandomizedPages = (totalPages) => {
    const moviePromises = []
    const randomlyFetchedPages = new Set()
    if (totalPages <= 10){
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++){
        moviePromises.push(getMoviesForPage(pageNumber))
      }
    } else {
      //Get 10 random pages in the range of total_pages (TMDB doesn't allow us to retrieve > page 500)
      while(randomlyFetchedPages.size < 10){
        const randomNum = Math.floor(Math.random() * Math.min(totalPages, 499))
        randomlyFetchedPages.add(randomNum)
      }
      randomlyFetchedPages.forEach((pageNumber) => {
        moviePromises.push(getMoviesForPage(pageNumber))
      })
    }
    return moviePromises
  }

  const handleClick = (newParams) => {
    console.log('Old: ' , queryParameters.current)
    console.log('New: ' , newParams)
    if(retrievedMovies.current.length === 0 || !isEqual(queryParameters.current, newParams)){
      console.log('different')
      retrievedMovies.current = []
      queryParameters.current = JSON.parse(JSON.stringify(newParams)) //{...newParams}
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&watch_region=US&sort_by=popularity.desc&with_genres=${queryParameters.current.genreIds.join('|')}&with_watch_providers=${queryParameters.current.providerIds.join('|')}&vote_count.gte=${queryParameters.current.popularityMin}&vote_count.lte=${queryParameters.current.popularityMax}&vote_average.gte=${queryParameters.current.ratingMin}&vote_average.lte=${queryParameters.current.ratingMax}`
      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          const totalPages = json.total_pages
          const moviePromises = getRandomizedPages(totalPages)
          Promise.all(moviePromises)
          .then(results => {
            retrievedMovies.current = results.flat()
            console.log(retrievedMovies.current.length)
            const randomIndex = movieRandomizer(retrievedMovies.current)
            setCurrentMovie(retrievedMovies.current[randomIndex])
            retrievedMovies.current.splice(randomIndex, 1)
          })
        })
        .catch(err => console.error('error:' + err));
    } else {
      console.log('same')
      const randomIndex = movieRandomizer(retrievedMovies.current)
      setCurrentMovie(retrievedMovies.current[randomIndex])
      retrievedMovies.current.splice(randomIndex, 1)
    }
    



  }
  return (
    <div className="App">
      <Form handleClick={handleClick}/>
      <MovieCard movie={currentMovie}/>
    </div>
  );

  }



  export default App

