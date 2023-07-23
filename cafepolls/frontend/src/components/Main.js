import React, { useEffect, useState } from 'react'
import CiteHeader_wrap from './wraps/CiteHeader_wrap.js'
import CreatePoll_wrap from './wraps/CreatePoll_wrap.js'
import CreateRoom_wrap from './wraps/CreateRoom_wrap.js'
import ConfirmWindow_wrap from './wraps/ConfirmWindow_wrap.js'
import RoomsTagFilter_wrap from './wraps/RoomsTagFilter_wrap.js'
import RoomList_wrap from './wraps/RoomList_wrap.js'
import RoomsHeader_wrap from './wraps/RoomsHeader_wrap.js'
import PollsHeader_wrap from './wraps/PollsHeader_wrap.js'
import TagsListWindow_wrap from './wraps/TagsListWindow_wrap.js'
import PollApp from './polls/PollApp.js'
import PollAppMobile_wrap from './wraps/PollAppMobile_wrap.js'
import MainRooms from './rooms/MainRooms.js'
import MobileMainRooms from './rooms/MobileMainRooms.js'
import { useLocation } from 'react-router-dom'
import MediaQuery from 'react-responsive'

function Main(props) {
	const location = useLocation()

    const handleScroll = e => {
	    if(window.location.pathname == '/') {
            let currentScroll = window.pageYOffset
            let roomsSectionStart = 0
            let pollsSectionStart = 0
            roomsSectionStart = document.querySelector('.cite-top').offsetHeight+document.querySelector('.main-rooms').offsetHeight-190
            pollsSectionStart = document.getElementById('rooms_section').offsetHeight+300
            if(currentScroll > roomsSectionStart) {
                if (currentScroll > pollsSectionStart) {
		            props.set_main_section('polls')
		        } else {
		            props.set_main_section('rooms')
		        }
            } else {
		        props.set_main_section('')
            }
	    } else {
            props.set_main_section('')
	    }
    }
	const useMountEffect = () => {
		useEffect(() => {
		    if(props.new_main_section!='') {
		        let selectedBlock = document.getElementById(props.new_main_section + '_section')
		        let blockYposition = 0
		        if(props.new_main_section=='rooms') {
		            blockYposition = selectedBlock.offsetTop - 190
		        } else {
		            blockYposition = selectedBlock.offsetTop - 50
		        }
        	    window.scrollTo(0, blockYposition)
	            props.set_new_main_section('')
		    }
		    window.addEventListener('scroll', handleScroll)
		},[props.new_main_section])
	}
	useMountEffect()
	return (
		<>
			<CiteHeader_wrap />
			{(() => {
				if (props.window === 'createpoll') {
					return <div className="shadow"><CreatePoll_wrap poll="0" /></div>
				} else if (props.window === 'createroom') {
					return <div className="shadow"><CreateRoom_wrap room='0'/></div>
				} else if (props.window === 'pollstagslist') {
					return <div className="shadow"><TagsListWindow_wrap type="polls" /></div>
				} else if (props.window === 'roomstagslist') {
					return <div className="shadow"><TagsListWindow_wrap type="rooms" /></div>
				} else if (props.window === 'editpoll') {
    					return <div className="shadow"><CreatePoll_wrap poll={props.active_poll} /></div>
    			} else if (props.window === 'no') {
					return (
						''
					)
				}
			})()}
			{(() => {
			    if (props.confirm_window === 'polldeleteconfirm') {
					return <ConfirmWindow_wrap operation="delete_poll" />
				} else {
					return ('')
				}
			})()}
			<main>
			    <MediaQuery minWidth={801}>
			        <MainRooms />
			    </MediaQuery>
			    <MediaQuery maxWidth={800}>
			        <MobileMainRooms />
			    </MediaQuery>
				<div className="rooms container" id="rooms_section">
					<RoomsHeader_wrap/>
    				<div className="all-rooms">
        			    <MediaQuery minWidth={801}>
    				        <RoomsTagFilter_wrap/>
        			    </MediaQuery>
						<RoomList_wrap/>
					</div>
				</div>
				<div className="opros container" id="polls_section">
					<PollsHeader_wrap />
        			<MediaQuery minWidth={800}>
					    <PollApp />
        			</MediaQuery>
        			<MediaQuery maxWidth={801}>
					    <PollAppMobile_wrap />
        			</MediaQuery>
				</div>
			</main>
		</>
	)
}

export default Main