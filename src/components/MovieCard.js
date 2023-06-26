export default function MovieCard({ movie }) {
    if (!movie){
        return <div>Loading...</div>
    }
    return (
        

        <div className="movie-card">
            <div>{movie.title}</div>
            <div>{movie.overview}</div>
            <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt='movie poster' height='200' width='150'/>
        </div>
    )
}