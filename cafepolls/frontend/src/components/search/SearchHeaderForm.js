import React from 'react'
import { useNavigate } from "react-router-dom"

function SearchHeaderForm(props){
    const navigate = useNavigate()
    let setSearchStr = (e) => {
        let str = e.target.value
        props.set_main_search_str(str)
    }
    let startSearch = (e) => {
        e.preventDefault()
        navigate("/search")
        
    }
	return (
    				<form className="search-block" onSubmit={startSearch}>
    					<div className="input">
    						<input className="search" placeholder="Искать очень замечательного котика" value={props.search_str} onChange={setSearchStr} />
    						<i className="el-icon-search"></i>
    					</div>
    				</form>
	 )
}

export default SearchHeaderForm
