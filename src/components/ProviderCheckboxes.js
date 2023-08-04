export default function ProviderCheckboxes({providers, handleChange, providerCheckboxes, toggleAll, untoggleAll}){
    return (
    <div className="provider-tab-container">
        <div className="tab-title">Select your service(s)</div>
        <button className='toggle-btn' onClick={toggleAll}>Check All</button>
        <button className='toggle-btn' onClick={untoggleAll}>Uncheck All</button>
        <div className='provider-checkboxes-container'>
            {providers.map((provider) => (
                <label className='provider-selection' key={provider.id}>
                    <img src={'https://image.tmdb.org/t/p/original/' + provider.logo_path} alt={provider.name} className='provider-image'/>
                    <input type='checkbox' id={provider.id} name={provider.name} onChange={handleChange} checked={providerCheckboxes[provider.id]}/>
                </label>
            ))}
        </div>
    </div>
    )
}