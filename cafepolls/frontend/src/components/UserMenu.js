import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UserMenu() {
    const navigate = useNavigate()
    function openPage(e) {
        let link = e.target.getAttribute('data-link')
        navigate(link)
    }
	return (
	    <ul>
    		<li onClick={openPage} data-link="/settings">
    		    <i className="el-icon-setting"></i> Настройки
    		</li>
    		<li>
    		    <a href="/logout/"><i className="el-icon-mobile"></i> Выход</a>
    		</li>
    	</ul>
	)
}

export default UserMenu
