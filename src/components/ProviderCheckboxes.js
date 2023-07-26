export default function ProviderCheckboxes({providers, handleChange, providerCheckboxes, checkboxToggle}){
    return (
    <div className="provider-tab-container">
        <div className="tab-title">Select your service(s)</div>
        <button className='toggle-btn' onClick={checkboxToggle}>Check/Uncheck All</button>
        <div id='provider-checkboxes-container'>
            {providers.map((provider) => (
                <div key={provider.id}>
                    <input type='checkbox' id={provider.id} name={provider.name} onChange={handleChange} checked={providerCheckboxes[provider.id]}/>
                    <label htmlFor={provider.id}>{provider.name}</label>
                </div>
            ))}
        </div>
    </div>
    )
}