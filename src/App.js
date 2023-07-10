
import { Form } from "./components/Form";
import MovieCard from "./components/MovieCard";
import { useState, useRef } from "react";
import { movieRandomizer } from "./utils/movieRandomizer";

function App() {
  const retrievedMovies = useRef([])
  const [currentMovie, setCurrentMovie] = useState('')

  const handleClick = async (callback, oldParams, newParams) => {
    const result = await callback(oldParams, newParams)
    if (result) {
      retrievedMovies.current = []
          Promise.all(result)
          .then(results => {
            retrievedMovies.current = results.flat()
            const randomIndex = movieRandomizer(retrievedMovies.current)
            setCurrentMovie(retrievedMovies.current[randomIndex])
            retrievedMovies.current.splice(randomIndex, 1)
          })
          .catch(err => console.error(err))
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

