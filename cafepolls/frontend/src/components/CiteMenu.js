import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

function CiteMenu(props) {
	const navigate = useNavigate()
	let nav_to_section = (e) => {
	    let section = e.target.getAttribute('data-section')
	    let this_pathname = window.location.pathname
	    if(this_pathname != '/') {
	        navigate("..")
	        props.set_new_main_section(section)
	    } else {
	        let selectedBlock = document.getElementById(section + '_section')
		    let blockYposition = selectedBlock.offsetTop - 50
        	window.scrollTo(0, blockYposition)
	    }
	}
	return (
    <ul className="cite-menu" id="cite_menu">
    	<li id="rooms_btn" onClick={nav_to_section} data-section="rooms">
    		<span data-section="rooms">Комнаты</span>
			{props.main_section=='rooms'?<div className="line"></div>:''}
		</li>
    	<li id="polls_btn" onClick={nav_to_section} data-section="polls">
    		<span data-section="polls">Опросы</span>
			{props.main_section=='polls'?<div className="line"></div>:''}
    	</li>
    </ul>
    )
}
export default CiteMenu
