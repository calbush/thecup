export default function GenreCheckboxes({genres, handleChange, genreCheckboxes, toggleAll, untoggleAll}) {

    return (
        <div className='genre-tab-container'>
            <div className='tab-title'> Select your genre(s):</div>
            <div className='genre-checkboxes-container'>
                {genres.map((genre) => (
                    <div className={genreCheckboxes[genre.id]} key={genre.id} onClick={handleChange} id={genre.id}>{genre.name}</div>
                ))}
            </div>
            <div className="toggle-btns">
                <button className='toggle-btn' onClick={toggleAll}>Check All</button>
                <button className='toggle-btn' onClick={untoggleAll}>Uncheck All</button>
            </div>
        </div>
    )
}