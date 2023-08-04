
import { Form } from "./components/Form";
import MovieCard from "./components/MovieCard";
import { useState, useRef } from "react";
import { movieRandomizer } from "./utils/movieRandomizer";
import Header from "./components/Header.js"
import Footer from "./components/Footer";

function App() {
  const retrievedMovieIds = useRef([])
  const [currentMovie, setCurrentMovie] = useState('')

  async function getMovieInfo(id){
    const movieInfo = []
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjk1ZDBkOTBjYjY0NWM5ODI4NzQ5OGQ4YjAzYmU0NiIsInN1YiI6IjY0NmI3NzA5MmJjZjY3MDEzODk1ZjAyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-VMPfC37YRrc70K_jFz27jVgd-_bbWlnUSJHRO4jww'
      }
    };    
    const providerUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers`
    const movieInfoUrl = `https://api.themoviedb.org/3/movie/${id}`

    const responses = await Promise.all([fetch(providerUrl, options), fetch(movieInfoUrl, options)])

    const providerData = await responses[0].json()
    const movieData = await responses[1].json()
    
    movieInfo.push(providerData.results?.US)
    movieInfo.push(movieData)

    return movieInfo
  }

  const handleClick = async (callback, oldParams, newParams) => {
    const result = await callback(oldParams, newParams);
    if (result) {
      retrievedMovieIds.current = [];
      try {
        const results = await Promise.all(result);
        retrievedMovieIds.current = results.flat().map(obj => obj?.id);
        const randomIndex = movieRandomizer(retrievedMovieIds.current);
        const movieInfo = await getMovieInfo(retrievedMovieIds.current[randomIndex]);
        retrievedMovieIds.current.splice(randomIndex, 1)
        setCurrentMovie(movieInfo)
  
      } catch (err) {
        console.error(err);
      }
    } else {
      const randomIndex = movieRandomizer(retrievedMovieIds.current);
      const movieInfo = await getMovieInfo(retrievedMovieIds.current[randomIndex])
      retrievedMovieIds.current.splice(randomIndex, 1);
      setCurrentMovie(movieInfo);
    }
  };
  
    
  return (
    <div className="app">
      <Header/>
      <Form handleClick={handleClick}/>
      <MovieCard movie={currentMovie}/>
      <Footer/>
    </div>
  );

}

export default App

