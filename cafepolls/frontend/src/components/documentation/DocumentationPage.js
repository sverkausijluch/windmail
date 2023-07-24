import React from 'react'
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import './documentation.css'
import MediaQuery from 'react-responsive'
import Documentation from './Documentation.js'
import MobileDocumentation from './MobileDocumentation.js'

function DocumentationPage(props) {
	const {item_id} = useParams()
	let id = 0
	if(item_id==undefined){
	    id = props.id
	} else {
	    id = item_id
	}
	//вероятно, переменная active_section в initialState вовсе лишняя
	return (
		<div className="documentation-page">
    		<MediaQuery maxWidth={800}>
    			<MobileDocumentation id={id} />
    	    </MediaQuery>
    		<MediaQuery minWidth={801}>
    			<Documentation id={id} />
    	    </MediaQuery>
		</div>
    )
}

export default DocumentationPage
