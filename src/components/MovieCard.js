
export default function MovieCard({ movie }) {
    
    const popularServices = ['Netflix', 'Hulu', 'Amazon Prime Video', 'Disney Plus', 'Apple TV Plus', 'Max', 'Peacock', 'Crunchyroll', 'fuboTV', 'Peacock Premium', 'Paramount Plus', 'The Roku Channel', 'YouTube Premium', 'Criterion Channel']
    const popularRentServices = ['Apple TV',  'Amazon Video']

    const checkForPopularServices = (popularServices, movieServices) => {
        if(!movieServices){
            return false
        }
        return movieServices.filter(service => popularServices.includes(service.provider_name)).length > 0
    }


   if (movie[0]?.status === 'failure'){
        return <div className="movie-card">Whoops! We can't find any movies matching those parameters.</div>
    }
    else if(movie[0] === undefined){
        return <div></div>
    }
    console.log(movie)
    return (
        

        <div className="movie-card">
            <div className="movie-card-top-and-middle">
                <div className="movie-card-top-panel">
                    <img src={'https://image.tmdb.org/t/p/original/' + movie[1].poster_path} alt='movie poster'/>
                    <div className="title-rating-description">
                        <div className="title-rating">
                            <div className="movie-title">{movie[1].title}</div>
                            <div className="movie-card-rating">{movie[1].vote_average.toString().slice(0,3)}/10</div>
                        </div>
                        <div className="movie-description">{movie[1].overview}</div>
                    </div>
                </div>
                <div className="movie-card-middle-panel">
                        <div className="middle-panel-left">
                            <div className="movie-info">{movie[1].release_date.slice(0,4)}</div>
                            <div className="movie-info">{movie[1].runtime} minutes</div>
                        </div>
                        <div className="movie-panel-right">{movie[1].genres.map(genre => {
                            if (movie[1].genres.indexOf(genre) + 1 === movie[1].genres.length){
                                return (
                                <div className="genre" key={genre.id}>
                                    {genre.name}
                                </div>
                                )
                            }
                            return (
                                <div className="genre" key={genre.id}>
                                    {genre.name},
                                </div>
                            )
                        })}</div>
                </div>
            </div>
                <div className="movie-card-bottom-panel">
                    {checkForPopularServices(popularServices, movie[0]?.flatrate) &&
                        <div className="movie-subscription-services">
                            <div>Stream:</div>
                            <ul className="streaming-services">
                                    {movie[0].flatrate.filter(service => popularServices.includes(service.provider_name))
                                    .map(popularService => (
                                            <li key={popularService.logo_path}>
                                                <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + popularService.logo_path} alt={popularService.provider_name}/>
                                            </li>)
                                    )}
                            </ul>
                        </div>
                    }
                
                    {checkForPopularServices(popularRentServices, movie[0]?.rent) &&
                        <div className="movie-rental-services">
                            <div>Rent/Buy:</div>
                            <ul className="streaming-services">
                                    {movie[0].rent.filter(service => popularRentServices.includes(service.provider_name))
                                    .map(popularRentService =>(
                                        <li key={popularRentService.logo_path}>
                                            <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + popularRentService.logo_path} alt={popularRentService}/>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    }
                </div>
            </div>
    )
}