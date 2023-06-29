import { useEffect, useRef } from "react"
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export default function PopularitySlider(){
    return (
        <div class='slider-container'>
            <input type='range' min='0' max='20' class='slider' id='popularity-slider'/>
        </div>
    )
}