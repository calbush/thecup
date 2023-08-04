export default function GenreCheckboxes({genres, handleChange, genreCheckboxes, toggleAll, untoggleAll}) {

    return (
        <div className='genre-tab-container'>
            <div className='tab-title'> Select your genre(s)</div>
            <button className='toggle-btn' onClick={toggleAll}>Check All</button>
            <button className='toggle-btn' onClick={untoggleAll}>Uncheck All</button>
            <div className='genre-checkboxes-container'>
                {genres.map((genre) => (
                        <div className='checkbox-with-label' key={genre.id}>
                            <input className='' type='checkbox' id={genre.id} name={genre.name} onChange={handleChange} checked={genreCheckboxes[genre.id]}/>
                            <label className='' htmlFor={genre.id}>{genre.name}</label>
                        </div>
                ))}
            </div>
        </div>
    )
}