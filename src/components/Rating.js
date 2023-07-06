export default function Rating() {
    return (
        <div id='rating-dropdown-container'>
            <label htmlFor='rating'>Rating:</label>
            <select name='rating' id='rating-dropdown'>
                <option value='any'>Any</option>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
            </select>
        </div>
    )
}