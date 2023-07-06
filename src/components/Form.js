import { genres, providers } from '../assets'
import Popularity from './Popularity'
import Rating from './Rating'
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'
import { useRef } from 'react'
import React from 'react'

export const Form = ({handleClick}) => {
    let updatedParams = useRef({
        'genreIds': [],
        'providerIds': [],
        'popularityMin': 0,
        'popularityMax': 10000,
        'ratingMin': 0,
        'ratingMax': 10
    })
    const handleGenreChange = (event) => {
        const genreId = event.target.id
        if(event.target.checked){
            updatedParams.current.genreIds.push(genreId)
        } else {
            updatedParams.current.genreIds.splice(updatedParams.current.genreIds.findIndex(element => element === genreId), 1)
        }
        console.log('Genre Ids: ', updatedParams.current.genreIds)
    }

    return (
        <div className='form'>
            <Tabs>
                <TabList>
                    <Tab>Genres</Tab>
                    <Tab>Streaming Services</Tab>
                    <Tab>Rating</Tab>
                    <Tab>Popularity</Tab>
                </TabList>
            <TabPanel>
                <div id='genre-checkboxes-container'>
                    Genre:
                    {genres.map((genre) => (
                        <div key={genre.id}>
                            <input type='checkbox' id={genre.id} name={genre.name} onChange={handleGenreChange}/>
                            <label htmlFor={genre.id}>{genre.name}</label>
                        </div>
                    ))
                    }
                </div>
            </TabPanel>
            <TabPanel>
                <div id='provider-checkboxes-container'>
                    Streaming Services:
                    {providers.map((provider) => (
                        <div key={provider.id}>
                            <input type='checkbox' id={provider.id} name={provider.name} />
                            <label htmlFor={provider.id}>{provider.name}</label>
                        </div>
                    ))}
                </div>
            </TabPanel>
            <TabPanel>
                <Rating />
            </TabPanel>
            <TabPanel>
                <Popularity/>
            </TabPanel>
            </Tabs>
            <button onClick={() => {handleClick(updatedParams.current)}}>Search</button>
        </div>
    )
}