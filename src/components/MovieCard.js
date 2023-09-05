import defaultPoster from '../assets/solo_cup_logo.jpeg'


export default function MovieCard({ movie }) {
    
    const popularServices = ['Netflix', 'Hulu', 'Amazon Prime Video', 'Disney Plus', 'Apple TV Plus', 'Max', 'Peacock', 'Crunchyroll', 'fuboTV', 'Peacock Premium', 'Paramount Plus', 'The Roku Channel', 'YouTube Premium', 'Criterion Channel']
    const popularRentBuyServices = ['Apple TV',  'Amazon Video']

    const checkForPopularServices = (popularServices, movieServices) => {
        if(!movieServices){
            return false
        }
        const matchingServices = movieServices.filter(service => popularServices.includes(service.provider_name))
        if (matchingServices.length <= 0){
            return false
        } else return matchingServices
        
        
    }

   if (movie[0]?.status === 'failure'){
        return <div className="movie-card">Whoops! We can't find any movies matching those parameters.</div>
    }
    else if(movie[0] === undefined && movie[1] === undefined){
        return <div className='placeholder'></div>
    }
   
    const flatrateServices = checkForPopularServices(popularServices, movie[0]?.flatrate)
    const withAdsServices = checkForPopularServices(popularServices, movie[0]?.ads)
    const rentServices = checkForPopularServices(popularRentBuyServices, movie[0]?.rent)
    const buyServices = checkForPopularServices(popularRentBuyServices, movie[0]?.buy)

    return (
        <div className="movie-card">
            <div className="movie-card-top-and-middle">
                <div className="movie-card-top-panel">
                    {movie[1].poster_path && 
                    <img src={'https://image.tmdb.org/t/p/original/' + movie[1].poster_path} alt='movie poster'/>}
                    {!movie[1].poster_path &&
                    <img src={defaultPoster} alt='no poster found'/>}
                    <div className="title-rating-description">
                        <div className="title-rating">
                            <div className="movie-title">{movie[1].title}</div>
                            <div className="movie-card-rating">{movie[1].vote_average?.toString().slice(0,3)}/10</div>
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
                    {flatrateServices &&
                        <div className="movie-subscription-services">
                            <div>Stream:</div>
                            <ul className="streaming-services">
                                    {flatrateServices.map(service => (
                                        <li key={service.logo_path}>
                                            <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + service.logo_path} alt={service.provider_name}/>
                                        </li>)
                                    )}
                            </ul>
                        </div>
                    }

                    {withAdsServices &&
                        <div className="movie-subscription-services">
                            <div>With ads:</div>
                            <ul className="streaming-services">
                                    {withAdsServices.map(service => (
                                        <li key={service.logo_path}>
                                            <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + service.logo_path} alt={service.provider_name}/>
                                        </li>)
                                    )}
                            </ul>
                        </div>
                    }   

                    {rentServices &&
                        <div className="movie-subscription-services">
                            <div>Rent:</div>
                            <ul className="streaming-services">
                                    {rentServices.map(service => (
                                        <li key={service.logo_path}>
                                            <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + service.logo_path} alt={service.provider_name}/>
                                        </li>)
                                    )}
                            </ul>
                        </div>
                    }

                    {buyServices &&
                        <div className="movie-subscription-services">
                            <div>Buy:</div>
                            <ul className="streaming-services">
                                    {buyServices.map(service => (
                                        <li key={service.logo_path}>
                                            <img className='streamer-logo' src={'https://image.tmdb.org/t/p/original/' + service.logo_path} alt={service.provider_name}/>
                                        </li>)
                                    )}
                            </ul>
                        </div>
                    }
                </div>
            </div>
    )
}