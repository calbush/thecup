import { genres, providers } from '../assets/assets.js'
import GenreCheckboxes from './GenreCheckboxes'
import Popularity from './Popularity'
import Rating from './Rating'
import { useState } from 'react'
import React from 'react'
import ProviderCheckboxes from './ProviderCheckboxes'
import { isEqual } from 'lodash'
import '../styles/form.css'

export const Form = ({handleClick}) => {

    const [genreIds, setGenreIds] = useState([])
    const [providerIds, setProviderIds] = useState([])
    const [popularityMin, setPopularityMin] = useState(0)
    const [popularityMax, setPopularityMax] = useState(100000)
    const [ratingMin, setRatingMin] = useState(0)
    const [ratingMax, setRatingMax] = useState(10)
    const [queryParameters, setQueryParameters] = useState({})

    const [genreCheckboxes, setGenreCheckboxes] = useState({
        '28': true,
        '12': true,
        '16': true,
        '35': true,
        '80': true,
        '99': true,
        '18': true,
        '10751': true,
        '14': true,
        '36': true,
        '27': true,
        '10402': true,
        '9648': true,
        '10749': true,
        '878': true,
        '10770': true,
        '53': true,
        '10752': true,
        '37': true,
    })

    const [providerCheckboxes, setProviderCheckboxes] = useState({
        '8': false,
        '9': false,
        '337': false,
        '350': false,
        '2': false,
        '15': false,
        '1899': false,
        '386': false,
        '283': false,
        '257': false,
        '387': false,
        '10': false,
        '531': false,
        '207': false,
        '188': false,
        '258': false,
    })

    const [rating, setRating] = useState('Any')
    const [popularity, setPopularity] = useState('Any')

    const [activeTab, setActiveTab] = useState('genres')

    const toggleAll = (checkboxState, setter) => {
        const toggled = {}
        for (const property in checkboxState){
            toggled[property] = true
        setter(toggled)
        }
    }

    const untoggleAll = (checkboxState, setter) => {
        const untoggled = {}
        for (const property in checkboxState) {
            untoggled[property] = false
        }
        setter(untoggled)
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjk1ZDBkOTBjYjY0NWM5ODI4NzQ5OGQ4YjAzYmU0NiIsInN1YiI6IjY0NmI3NzA5MmJjZjY3MDEzODk1ZjAyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-VMPfC37YRrc70K_jFz27jVgd-_bbWlnUSJHRO4jww'
        }
      }

    const getMoviesForPage = (results_page_num) => {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${results_page_num}&watch_region=US&sort_by=popularity.desc&with_genres=${genreIds.join('|')}&with_watch_providers=${providerIds.join('|')}&vote_count.gte=${popularityMin}&vote_count.lte=${popularityMax}&vote_average.gte=${ratingMin}&vote_average.lte=${ratingMax}`
        return fetch(url, options)
        .then(res => res.json())
        .then(json => {
          return json.results
        })
        .catch(err => console.error('error: ' + err))
      }

      const getRandomizedPages = (totalPages) => {
        const moviePromises = []
        const randomlyFetchedPages = new Set()
        if (totalPages <= 10){
          for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++){
            moviePromises.push(getMoviesForPage(pageNumber))
          }
        } else {
          //Get 10 random pages in the range of total_pages (TMDB doesn't allow us to retrieve > page 500)
          while(randomlyFetchedPages.size < 10){
            const randomNum = Math.floor(Math.random() * Math.min(totalPages, 499) + 1)
            randomlyFetchedPages.add(randomNum)
          }
          randomlyFetchedPages.forEach((pageNumber) => {
            moviePromises.push(getMoviesForPage(pageNumber))
          })
        }
        return moviePromises
      }

    const compareParamsHelper = (oldParams, newParams) => {
        return new Promise((resolve,reject) => {
            if (!isEqual(oldParams, newParams)){
            setQueryParameters(JSON.parse(JSON.stringify(newParams)))
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&watch_region=US&sort_by=popularity.desc&with_genres=${genreIds.join('|')}&with_watch_providers=${providerIds.join('|')}&vote_count.gte=${popularityMin}&vote_count.lte=${popularityMax}&vote_average.gte=${ratingMin}&vote_average.lte=${ratingMax}`
                fetch(url, options)
                    .then(res => res.json())
                    .then(json => {
                        const totalPages = json.total_pages
                        const promiseArray = getRandomizedPages(totalPages)
                        resolve(promiseArray)
                    })
                    .catch(err => {
                        console.error('error:' + err)
                        reject(err)
                    });
            } else resolve(false)
        })
    }


    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber.target.id)
    }

    const handleGenreChange = (event) => {
        const { id , checked } = event.target
        setGenreCheckboxes((prevGenres) => ({
            ...prevGenres,
            [id]: checked,
        }))
        if(checked){
            setGenreIds((previousIds => [...previousIds, id]))
        } else {
            setGenreIds(previousIds => {
                return previousIds.toSpliced(previousIds.findIndex(element => element === id),1)
            })
        }
    }

    const handleProviderChange = (event) => {
        const { id , checked } = event.target
        setProviderCheckboxes((prevProviders) => ({
            ...prevProviders,
            [id]: checked,
        }))
        if(checked){
            setProviderIds((previousIds => [...previousIds, id]))
        } else {
            setProviderIds(previousIds => {
                return previousIds.toSpliced(previousIds.findIndex(element => element === id),1)
            })
        }
    }

    const handleRatingChange = (event) => {
        const {value} = event.target
        setRating(value)
        if (value === 'high'){
            setRatingMin(7.5)
            setRatingMax(10)
        } else if (value === 'medium'){
            setRatingMin(5.0)
            setRatingMin(7.49)
        } else if (value === 'low'){
            setRatingMin(0)
            setRatingMax(4.99)
        }
    }
    

    const handlePopularityChange = (event) => {
        const { value } = event.target
        setPopularity(value)
        if (value === 'popular'){
            console.log('popular!')
            setPopularityMin(1000)
            setPopularityMax(100000)
        } else if (value === 'less-popular'){
            console.log('less')
            setPopularityMin(51)
            setPopularityMax(999)
        } else if (value === 'obscure'){
            console.log('obscure')
            setPopularityMin(0)
            setPopularityMax(50)
        } else {
            setPopularityMin(0)
            setPopularityMax(100000)
        }
    }

    return (
        <div className='form'>
            <div className='form-card'>
                <div className='tabs-header'>
                    <div onClick={handleTabChange} id='genres' className='tab'>Genres</div>
                    <div onClick={handleTabChange} id='providers' className='tab'>Streaming Services</div>
                    <div onClick={handleTabChange} id='rating-popularity' className='tab'>Rating/Popularity</div>
                </div>
                <div className='tabs-body'>
                                {activeTab === 'genres' &&
                    <GenreCheckboxes genres={genres} handleChange={handleGenreChange} genreCheckboxes={genreCheckboxes} toggleAll={() => toggleAll(genreCheckboxes, setGenreCheckboxes)} untoggleAll={() => untoggleAll(genreCheckboxes, setGenreCheckboxes)}/>
                                }
                                {activeTab === 'providers' &&
                    <ProviderCheckboxes providers={providers} handleChange={handleProviderChange} providerCheckboxes={providerCheckboxes} toggleAll={() => toggleAll(providerCheckboxes, setProviderCheckboxes)} untoggleAll={() => untoggleAll(providerCheckboxes, setProviderCheckboxes)}/>
                                }
                                {activeTab === 'rating-popularity' &&
                                <div>
                    <Rating handleChange={handleRatingChange} rating={rating}/>
                    <Popularity handleChange={handlePopularityChange} popularity={popularity}/>
                                </div>
                                }
                </div>
            </div>
            <button className='form-button' onClick={() => {handleClick(compareParamsHelper, queryParameters, {genreIds, providerIds, popularityMin, popularityMax, ratingMin, ratingMax})}}>Search</button>
        </div>
    )
}