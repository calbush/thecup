import Form from "./components/Form";
import MovieCard from "./components/MovieCard";
import { captureFormData, compareParamsHelper } from "./utils/captureFormData";
import { movieRandomizer } from "./utils/movieRandomizer";
import { useState } from "react";


let queryParams = {}

let retrievedMovies = []


function App() {

const [currentMovie, setCurrentMovie] = useState('')

const handleClick = () => {
  const newParams = captureFormData()
  const paramsAreSame = compareParamsHelper(newParams, queryParams)
  if (!paramsAreSame){
    queryParams = {...newParams}
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=popularity.desc&watch_region=${newParams.watchRegion}&with_genres=${newParams.genreIds.join('|')}&with_watch_providers=${newParams.providerIds.join('|')}`
    const options = {
      method : 'GET',
      headers : {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjk1ZDBkOTBjYjY0NWM5ODI4NzQ5OGQ4YjAzYmU0NiIsInN1YiI6IjY0NmI3NzA5MmJjZjY3MDEzODk1ZjAyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-VMPfC37YRrc70K_jFz27jVgd-_bbWlnUSJHRO4jww'
      }
    }
  
    fetch(url, options)
    .then(res => res.json())
    .then(json => {
      //After successfully calling the TMDB API, we need to store our response and select a random movie
      retrievedMovies = [...json.results]
      const randomIndex = movieRandomizer(retrievedMovies)
      const randomlySelectedMovie = retrievedMovies[randomIndex]
      retrievedMovies.splice(randomIndex, 1)
      setCurrentMovie({...randomlySelectedMovie})
      console.log(currentMovie)
    })
    .catch(err => console.error('error:' + err))
  } else {
      const randomIndex = movieRandomizer(retrievedMovies)
      const randomlySelectedMovie = retrievedMovies[randomIndex]
      retrievedMovies.splice(randomIndex, 1)
      setCurrentMovie({...randomlySelectedMovie})
      console.log(currentMovie)
  }
  
}

  return (
    <div className="App">
      <Form handleClick={handleClick}/>
      <MovieCard movie={currentMovie}/>
    </div>
  );
}

export default App;
