import React from 'react'
import CiteHeader_wrap from '../wraps/CiteHeader_wrap.js'
import RoomHeader_wrap from "../wraps/RoomHeader_wrap"
import RoomAnswers_wrap from "../wraps/RoomAnswers_wrap"
import RoomForm_wrap from "../wraps/RoomForm_wrap"
import {useParams} from "react-router-dom"

function Room(props) {
    const {room_id} = useParams()
	window.scrollTo(0, 0)
  	return (
			<>
				<CiteHeader_wrap />
				<main className="small-container">
					<RoomHeader_wrap id={room_id} />
					<RoomAnswers_wrap id={room_id} />
					<RoomForm_wrap room_id={room_id} />
				</main>
			</>
  	)
}
export default Room