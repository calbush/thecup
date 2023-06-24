import Form from "./components/Form";
import { isEqual } from "lodash";
//const fetch = require('node-fetch')

//const matchingFilms = []

let queryParams = {
  'watchRegion': 'US',
  'providerIds': [],
  'genreIds': [],
}

let retrievedMovies = []

const handleClick = () => {
  //Make a new object with form info. IF it's different from queryParams, make another API call.
    const newQueryParams = {
      'watchRegion': 'US',
      'providerIds': [],
      'genreIds': [],
    }
    const genreDiv = document.getElementById('genre-checkboxes-div')
    const genreCheckboxes = genreDiv.querySelectorAll('input')
    genreCheckboxes.forEach(genreCheckbox => {
      if(genreCheckbox.checked){
        newQueryParams.genreIds.push(genreCheckbox.id)
      }
    })
    const providerDiv = document.getElementById('provider-checkboxes-div')
    const providerCheckboxes = providerDiv.querySelectorAll('input')
    providerCheckboxes.forEach(providerCheckbox => {
      if(providerCheckbox.checked){
        newQueryParams.providerIds.push(providerCheckbox.id)
      }
    })

    if (isEqual(newQueryParams, queryParams)){
      console.log('They\'re the same!')
    } else {
      queryParams = {...newQueryParams}
      console.log('They\'re different!')
      retrieveMovies()
    }
}

const retrieveMovies = () => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=popularity.desc&watch_region=${queryParams.watchRegion}&with_genres=${queryParams.genreIds.join('|')}&with_watch_providers=${queryParams.providerIds.join('|')}`
  const options = {
    method : 'GET',
    headers : {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGQzYTEyMmUxNjYxNDkwODk2MjhhZmI4MzZhNWEzMSIsInN1YiI6IjY0NmI3NzA5MmJjZjY3MDEzODk1ZjAyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cUF2N4BlYPIZ6e6AhtgAlQ0LD9ZPGqvlSWfONJXH0hc'
    }
  }

  fetch(url, options)
  .then(res => res.json())
  .then(json => {
    retrievedMovies = [...json.results]
    console.log(retrievedMovies)
  })
}

function App() {
  return (
    <div className="App">
      <Form handleClick={handleClick}/>
    </div>
  );
}

export default App;
