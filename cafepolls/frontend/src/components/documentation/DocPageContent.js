import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import DocArticle_wrap from '../wraps/DocArticle_wrap.js'

class DocPageContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			section: {'name':'','articles':[{'name':'','updated_by':{'id':0,'name':''},'illustrations':[{'file':'','description':''}]}]},
		}
		this.loadSection = this.loadSection.bind(this)
		this.scrollToArticle = this.scrollToArticle.bind(this)
	}
	componentDidMount(){
	    this.loadSection(this.props.section_id)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.section_id !== this.props.section_id) {
		    this.loadSection(nextProps.section_id)
		}
	}
	loadSection = (section_id) => {
		axios.get(window.location.origin+'/doc/section/'+section_id).then(data => {
			let section = data.data
			this.setState({
				section: section
			})
		})
	}
	scrollToArticle = (e) => {
	    let article_id = e.target.getAttribute('data-id')
	    let article_y = document.getElementById('article'+article_id).offsetTop-20
	    window.scrollTo(0, article_y)
	}
	render() {
	  return (
    		    <div className="col2">
    		        <h2>{this.state.section.name}</h2>
    		        <ul className="menu">
    		            {this.state.section.articles.map((art, index) => {
					        return (
    		                    <li key={index} data-id={art.id} onClick={this.scrollToArticle}>{art.name}</li>
    		                )
    		            })}
    		        </ul> 
    		        {this.state.section.articles.map((art, index) => {
					    return (
    		                <DocArticle_wrap article={art} key={index} />
    		            )
    		        })}
        		</div>
	  )
	}
}

export default DocPageContent
