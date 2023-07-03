
import Form from "./components/Form";
import MovieCard from "./components/MovieCard";
import { useState, useRef } from "react";
import { movieRandomizer } from "./utils/movieRandomizer";
import captureFormData from "./utils/captureFormData";
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
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${results_page_num}&watch_region=US&sort_by=popularity.desc&with_genres=${queryParameters.current.genreIds.join('|')}&with_watch_providers=${queryParameters.current.providerIds.join('|')}&vote_count.gte=${queryParameters.current.popularityMin}&vote_count.lte=${queryParameters.current.popularityMax}`
    return fetch(url, options)
    .then(res => res.json())
    .then(json => {
      return json.results
      //console.log('added to retrieved movies:' + retrievedMovies.current.length)
    })
    .catch(err => console.error('error: ' + err))
  }

  const handleClick = () => {
    const newQueryParameters = captureFormData()
    let totalPages = 0
    const randomlyFetchedPages = new Set()
    if(retrievedMovies.current.length === 0 || !isEqual(queryParameters.current, newQueryParameters)){
      retrievedMovies.current = []
      queryParameters.current = {...newQueryParameters}
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&watch_region=US&sort_by=popularity.desc&with_genres=${queryParameters.current.genreIds.join('|')}&with_watch_providers=${queryParameters.current.providerIds.join('|')}&vote_count.gte=${queryParameters.current.popularityMin}&vote_count.lte=${queryParameters.current.popularityMax}`
      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          totalPages = json.total_pages
          const promiseArray = []
          //We don't need to randomize retrieved pages if there are < 10 total_pages
          if (totalPages <= 10){
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++){
              promiseArray.push(getMoviesForPage(pageNumber))
            }
          } else {
            console.log('total pages: ' + totalPages)
            //Get 10 random pages in the range of total_pages (TMDB doesn't allow us to retrieve > page 500)
            while(randomlyFetchedPages.size < 10){
              const randomNum = Math.floor(Math.random() * Math.min(totalPages, 499))
              randomlyFetchedPages.add(randomNum)
            }
            randomlyFetchedPages.forEach((pageNumber) => {
              promiseArray.push(getMoviesForPage(pageNumber))
            })
          }
          Promise.all(promiseArray)
          .then(results => {
            retrievedMovies.current = results.flat()
            const randomIndex = movieRandomizer(retrievedMovies.current)
            setCurrentMovie(retrievedMovies.current[randomIndex])
            retrievedMovies.current.splice(randomIndex, 1)
          })
        })
        .catch(err => console.error('error:' + err));
    } else {
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

