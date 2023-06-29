
import Form from "./components/Form";
import MovieCard from "./components/MovieCard";
//import { movieRandomizer } from "./utils/movieRandomizer";
import { useEffect, useState, useRef } from "react";
import { movieRandomizer } from "./utils/movieRandomizer";

function App() {

let retrievedMovies = useRef([])
const [currentMovie, setCurrentMovie] = useState('')
const [providerIds, setProviderIds] = useState([])
const [genreIds, setGenreIds] = useState([])
const watchRegion = 'US'

const genreJSON = JSON.stringify(genreIds)
const providerJSON = JSON.stringify(providerIds)


//If state changes we make an api call with the new parameters
useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=popularity.desc&watch_region=${watchRegion}&with_genres=${genreIds.join('|')}&with_watch_providers=${providerIds.join('|')}`
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
      retrievedMovies.current = [...json.results]
      console.log('api call made')
      console.log(retrievedMovies)
    })
    .catch(err => console.error('error: ' + err))
},[genreJSON, providerJSON])

const handleClick = () => {
    const newGenreIds = []
    const genreChecks = document.getElementById('genre-checkboxes-div')
    const genreNodelist = genreChecks.querySelectorAll('input')
    genreNodelist.forEach((checkbox) => {
      if(checkbox.checked){
        newGenreIds.push(checkbox.id)
      }
    })
    const newProviderIds = []
    const providerChecks = document.getElementById('provider-checkboxes-div')
    const providerNodelist = providerChecks.querySelectorAll('input')
    providerNodelist.forEach((checkbox) => {
      if(checkbox.checked){
        newProviderIds.push(checkbox.id)
      }
    })
    setGenreIds([...newGenreIds])
    setProviderIds([...newProviderIds])
    //Pick a random movie, display it, then remove it from retrievedMovies
    const movieIndex = movieRandomizer(retrievedMovies.current)
    setCurrentMovie(retrievedMovies.current[movieIndex])
    retrievedMovies.current.splice(movieIndex, 1)
    console.log(retrievedMovies.current)
  }

  return (
    <div className="App">
      <Form handleClick={handleClick}/>
      <MovieCard movie={currentMovie}/>
    </div>
  );

  }

  export default App
