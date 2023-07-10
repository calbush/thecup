export default function GenreCheckboxes({genres, handleChange, genreCheckboxes}) {

    return (
        <div id='genre-checkboxes-container'>
        Genre:
        {genres.map((genre) => (
            <div key={genre.id}>
                <input type='checkbox' id={genre.id} name={genre.name} onChange={handleChange} checked={genreCheckboxes[genre.id]}/>
                <label htmlFor={genre.id}>{genre.name}</label>
            </div>
        ))
        }
        </div>
    )
}