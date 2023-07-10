export default function Popularity({popularity, handleChange}){

    return (
        <div id='popularity-dropdown-container'>
            <label htmlFor='popularity-dropdown'>Film Popularity:</label>
            <select name='popularity' id='popularity-dropdown' onChange={handleChange} value={popularity}>
                <option value='any'>Any</option>
                <option value='popular'>Popular</option>
                <option value='less-popular'>Less Popular</option>
                <option value='obscure'>Obscure</option>
            </select>
        </div>
    )
}