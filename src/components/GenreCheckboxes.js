export default function GenreCheckboxes({genres, handleChange, genreCheckboxes, toggleAll, untoggleAll}) {

    return (
        <div className='genre-tab-container'>
            <div className='tab-title'> Select your genre(s):</div>
            <div className='genre-checkboxes-container'>
                {genres.map((genre) => (
                        <label className='checkbox-with-label' htmlFor={genre.id}key={genre.id}>
                            <input className='' type='checkbox' id={genre.id} name={genre.name} onChange={handleChange} checked={genreCheckboxes[genre.id]}/>
                             {genre.name}
                        </label>
                ))}
            </div>
            <div class="toggle-btns">
                <button className='toggle-btn' onClick={toggleAll}>Check All</button>
                <button className='toggle-btn' onClick={untoggleAll}>Uncheck All</button>
            </div>
        </div>
    )
}