import { genres, providers } from '../assets'

export default function Form({handleClick}) {
    return (
        <div className='form'>
            <div id='genre-checkboxes-div'>
                Genre:
                {genres.map((genre) => (
                    <div key={genre.id}>
                        <input type='checkbox' id={genre.id} name={genre.name}/>
                        <label htmlFor={genre.id}>{genre.name}</label>
                    </div>
                ))
                }
            </div>
            <div id='provider-checkboxes-div'>
                Streaming Services:
                {providers.map((provider) => (
                    <div key={provider.id}>
                        <input type='checkbox' id={provider.id} name={provider.name} />
                        <label htmlFor={provider.id}>{provider.name}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}