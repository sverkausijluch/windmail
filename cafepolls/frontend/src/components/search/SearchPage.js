import React from 'react'
import { Link } from "react-router-dom"
import CiteHeader_wrap from "../wraps/CiteHeader_wrap"
import MediaQuery from 'react-responsive'
import SearchHeaderForm_wrap from "../wraps/SearchHeaderForm_wrap"

class SearchPage extends React.Component {
	constructor(props) {
		super(props)
		this.startSearch = this.startSearch.bind(this)
		this.setActivePoll = this.setActivePoll.bind(this)
		this.state = {
			rooms: [{}],
			polls: [{}],
			users: [{}],
		}
	}
	componentDidMount() {
        this.startSearch(this.props.search_str)
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.search_str !== this.props.search_str) {
		    this.startSearch(nextProps.search_str)
		}
	}
	startSearch = (str) => {
	    let data = {search_str: str}
	    let setDataToState = (data) => {
    		this.setState({
    			rooms: data.rooms,
    			polls: data.polls,
    			users: data.users,
    		})
	    }
        $.ajax({
            type: 'post',
            url: '../api/main-search',
            cache: false,
            data: data,
            success: function(data) {
                setDataToState(data)
            },
            error: function(xhr, status, error){
                console.log(JSON.parse(xhr.responseText))
            }
        })   
	}
	setActivePoll = (e) => {
	    let poll_id = e.target.getAttribute('data-poll')
	    this.props.set_poll({'id':poll_id,'options':[]})
	}
	render() {
	  return (
	    <>
		    <CiteHeader_wrap />
		    <div className="settings-main">
			    <MediaQuery maxWidth={800}>
			        <SearchHeaderForm_wrap />
			    </MediaQuery>
        		<h2>? <i className="el-icon-right"></i></h2> 
        		<h3>результат поиска по запросу <span className="search-str" id="search_str">{this.props.search_str}</span></h3>
        		<div className={this.props.search_str=='' ? ('hide') : ('search-result')}>
        		    <ul>
        		       <h3>Комнаты</h3>
        		       {(() => {
        				if (this.state.rooms == '') {
        					return '[ ]'
        				} else {
            		       return (this.state.rooms.map((room, index) => {
        				        return (
            				    <li key={index}>
        							<Link to={"../room/"+room.id}>
        							{room.name}
                    				</Link>
            			        </li>
        			            )
                		   }))
                	    }})()}
        		    </ul>
        		    <ul>
        		       <h3>Опросы</h3>
        		       {(() => {
        				if (this.state.polls == '') {
        					return '[ ]'
        				} else {
            		       return (this.state.polls.map((poll, index) => {
        				        return (
            				    <li key={index}>
        							<Link to={"../"} onClick={this.setActivePoll} data-poll={poll.id} state={{ section: "polls" }}>
        							{poll.question}
                    				</Link>
            			        </li>
        			            )
                		   }))
                	    }})()}
        		    </ul>
        		    <ul>
        		       <h3>Участники</h3>
        		       {(() => {
        				if (this.state.users == '') {
        					return '[ ]'
        				} else {
            		       return (this.state.users.map((user, index) => {
        				        return (
            				    <li key={index}>
        							<Link to={"../profile/"+user.id}>
        							{user.name}
                    				</Link>
            			        </li>
        			            )
                		   }))
                	    }})()}
        		    </ul>
        	    </div>
        	    <span className={this.props.search_str!='' ? ('hide') : ('search-question')}>?</span>
		    </div>
		</>
	  )
	}
}

export default SearchPage
