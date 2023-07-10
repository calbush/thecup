export default function ProviderCheckboxes({providers, handleChange, providerCheckboxes}){
    return (
        <div id='provider-checkboxes-container'>
        Streaming Services:
        {providers.map((provider) => (
            <div key={provider.id}>
                <input type='checkbox' id={provider.id} name={provider.name} onChange={handleChange} checked={providerCheckboxes[provider.id]}/>
                <label htmlFor={provider.id}>{provider.name}</label>
            </div>
        ))}
    </div>
    )
}