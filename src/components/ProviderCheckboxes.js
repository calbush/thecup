export default function ProviderCheckboxes({providers, handleChange, providerCheckboxes, toggleAll, untoggleAll}){
    return (
    <div className="provider-tab-container">
        <div className="tab-title">Select your service(s):</div>
        <div className='provider-checkboxes-container'>
            {providers.map((provider) => (
                <div className='provider' key={provider.id}>
                    <img src={'https://image.tmdb.org/t/p/original/' + provider.logo_path} onClick={handleChange} alt={provider.name}  id={provider.id} className={providerCheckboxes[provider.id]}/>
                </div>
            ))}
        </div>
        <div className="toggle-btns">
            <button className='toggle-btn' onClick={toggleAll}>Select All</button>
            <button className='toggle-btn' onClick={untoggleAll}>Clear All</button>
        </div>
    </div>
    )
}