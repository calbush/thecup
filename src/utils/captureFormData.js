import { isEqual } from "lodash";

export const captureFormData = () => {
    let newQueryParams = 
    {
    'watchRegion': 'US',
    'providerIds': [],
    'genreIds': [],
    }

  const genreDiv = document.getElementById('genre-checkboxes-div')
  const genreCheckboxes = genreDiv.querySelectorAll('input')
  genreCheckboxes.forEach(genreCheckbox => {
    if(genreCheckbox.checked){
      newQueryParams.genreIds.push(genreCheckbox.id)
    }
  })
  const providerDiv = document.getElementById('provider-checkboxes-div')
  const providerCheckboxes = providerDiv.querySelectorAll('input')
  providerCheckboxes.forEach(providerCheckbox => {
    if(providerCheckbox.checked){
      newQueryParams.providerIds.push(providerCheckbox.id)
    }
  })
  return newQueryParams
}

export const compareParamsHelper = (newParams, oldParams) => {
    if (isEqual(newParams, oldParams)){
        console.log('They\'re the same!')
        return true
    } else {
        oldParams = {...newParams}
        console.log('They\'re different!')
        return false
  }
}