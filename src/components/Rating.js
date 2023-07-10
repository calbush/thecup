export default function Rating({handleChange, rating}) {
    return (
        <div id='rating-dropdown-container'>
            <label htmlFor='rating-dropdown'>Rating:</label>
            <select name='rating' id='rating-dropdown' value={rating} onChange={handleChange}>
                <option value='any'>Any</option>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
            </select>
        </div>
    )
}