import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import MediaQuery from 'react-responsive'
import parse from "html-react-parser"

class DocArticle extends React.Component {
	constructor(props) {
		super(props)
		this.checkType = this.checkType.bind(this)
	}
	checkType = () => {
	    return this.props.user_groups.filter(x=>[3,4,5].indexOf(x)!=-1)!=0
	}
	render() {
	  return (
	    <article className="doc-article" id={"article"+this.props.article.id}>
    		<MediaQuery minWidth={801}>
            	<div className="illustrations">
            	    {this.props.article.illustrations.map((illustration, index) => {
    				    return (
        		            <div className="illustration" key={index}>
        		                <Link to={"../../illustration/"+illustration.id}><img src={illustration.file} /></Link>
        		                <p>{illustration.description}</p>
        		            </div>
        		        )
        		    })}
        		 </div>
    	    </MediaQuery>
    	    <h3>{this.props.article.name}</h3>
    		<p>{typeof this.props.article.text == 'string'?parse(this.props.article.text):""}</p>
    		<MediaQuery maxWidth={800}>
            	<div className="illustrations">
            	    {this.props.article.illustrations.map((illustration, index) => {
    				    return (
        		            <div className="illustration" key={index}>
        		                <Link to={"../../illustration/"+illustration.id}><img src={illustration.file} /></Link>
        		                <p>{illustration.description}</p>
        		            </div>
        		        )
        		    })}
        		 </div>
    	    </MediaQuery>
    		 <p className="page-info">Обновлено {this.props.article.updated_at} ({this.props.article.updated_by.name})</p>
        	 <a href={"../../admin/docbook/article/"+this.props.article.id+"/change/"}>	{(this.checkType())?(<button className="add-btn">Редактировать</button>):""}</a>
		</article>
	  )
	}
}

export default DocArticle
