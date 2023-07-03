export default function captureFormData(){
    const newParams = {
        'genreIds': [],
        'providerIds': [],
        'popularityMin': 0,
        'popularityMax': 10000,
    }
    const genreCheckboxesContainer = document.getElementById('genre-checkboxes-container')
    const genreCheckboxesNodeList = genreCheckboxesContainer.querySelectorAll('input')
    genreCheckboxesNodeList.forEach((checkbox)=> {
        if (checkbox.checked){
        newParams.genreIds.push(checkbox.id)
        }
    })
    const providerCheckboxesContainer = document.getElementById('provider-checkboxes-container')
    const providerCheckboxesNodeList = providerCheckboxesContainer.querySelectorAll('input')
    providerCheckboxesNodeList.forEach((checkbox)=> {
        if (checkbox.checked){
        newParams.providerIds.push(checkbox.id)
        }
    })
    const popularity = document.getElementById('popularity-dropdown').value
    if (popularity === 'very-popular'){
        newParams.popularityMin = 5001
    } else if (popularity === 'popular'){
        newParams.popularityMin = 501
        newParams.poplarityMax = 5000
    } else if (popularity === 'less-popular'){
        newParams.popularityMin = 51
        newParams.popularityMax = 500
    } else if (popularity === 'obscure'){
        newParams.popularityMax = 50
    }
    return newParams
}