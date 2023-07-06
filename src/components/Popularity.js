export default function Popularity(){

    return (
        <div id='popularity-dropdown-container'>
            <label htmlFor='popularity'>Film Popularity:</label>
            <select name='popularity' id='popularity-dropdown'>
                <option value='any'>Any</option>
                <option value='popular'>Popular</option>
                <option value='less-popular'>Less Popular</option>
                <option value='obscure'>Obscure</option>
            </select>
        </div>
    )
}