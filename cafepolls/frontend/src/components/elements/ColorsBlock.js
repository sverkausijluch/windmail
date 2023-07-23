import React from 'react'
import {colors} from '../../dictionaries/colors'

const ColorsBlock = (props) => {
    return (
        <ul>
            {colors.map((color, index) => {
                return (
                    <li key={index} onClick={props.selectColor}>
                        <div className={`color-el ${color.name}`} data-colorname={color.name} data-colorcode={color.code}></div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ColorsBlock