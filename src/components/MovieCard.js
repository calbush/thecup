export default function MovieCard({ movie }) {
    
    const popularServices = ['Netflix', 'Hulu', 'Amazon Prime Video', 'Disney Plus', 'Apple TV Plus', 'Max', 'Peacock', 'Crunchyroll', 'fuboTV', 'Peacock Premium', 'Paramount Plus', 'The Roku Channel', 'YouTube Premium', 'Criterion Channel']
    const popularRentServices = ['Apple TV',  'Amazon Video']
    if (!movie){
        return <div className='movie-card'>Loading...</div>
    }
    return (
        

        <div className="movie-card">
            <div className="card-header">
                <div>{movie[1].title}</div>
                <div className="card-rating">{movie[1].vote_average}/10</div>
            </div>
            <div className="poster-description-container">
                <img src={'https://image.tmdb.org/t/p/original/' + movie[1].poster_path} alt='movie poster' height='200' width='150'/>
                <div>{movie[1].overview}</div>
            </div>
            <div className="movie-info-container">
                <div className="movie-info">{movie[1].genres.map(genre => (
                    <div className="genre" key={genre.id}>
                        {genre.name}
                    </div>
                ))}</div>
                <div className="movie-info">{movie[1].release_date}</div>
                <div className="movie-info">{movie[1].runtime}</div>
                
            </div>
            <div className="rent-stream-container">
                <ul className="streaming-services">
                    Stream:
                    {movie[0]?.flatrate &&
                        movie[0].flatrate.filter(service => popularServices.includes(service.provider_name))
                        .map(popularService => (
                                <li key={popularService.logo_path}>
                                    <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + popularService.logo_path} alt={popularService.provider_name}/>
                                </li>)
                        )
                    }
                </ul>
                <ul className="streaming-services">
                    Rent/Buy:
                    {movie[0]?.rent &&
                        movie[0].rent.filter(service => popularRentServices.includes(service.provider_name))
                        .map(popularRentService =>(
                            <li key={popularRentService.logo_path}>
                                <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + popularRentService.logo_path} alt={popularRentService}/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}