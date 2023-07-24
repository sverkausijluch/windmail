import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import { Link } from "react-router-dom"

function DocImage() {
	const {id} = useParams()
	const [image, setImage] = useState({})
	const useMountEffect = () => {
		useEffect(() => {
			axios.get('http://'+window.location.host+'/doc/get-image/' + id).then(res => {
			    res = res.data
				setImage({file: res.file, description: res.description, section_id: res.article.section.id, article_name: res.article.name})
			})
		},[])
	}
	useMountEffect()
	return (
		<div className="illustration-page">
		    <div className="col1">
		        <Link to={"../../documentation/"+image.section_id}><i className="el-icon-back"></i></Link>
		        <h3 className="article-name">{image.article_name}</h3>
		    </div>
		    <div className="col2">
		        <p className="description">{image.description}</p>
		        <img src={image.file} className="illustration" />
		    </div>
		</div>
	)
}

export default DocImage
