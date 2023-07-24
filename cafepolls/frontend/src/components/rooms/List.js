import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

class List extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rooms: [],
		}
	}
	componentDidMount() {
		axios.get(window.location.origin+'/api/smallmainrooms/'+this.props.rooms_count).then(rooms => {
			rooms = rooms.data
			this.setState({
				rooms: rooms
			})
		})

	}
	render() {
	  return (
			<div className="main-rooms">
				{this.state.rooms.map((room, index) => {
					return (
        				<div className="room" key={index}>
							<Link to={"./room/"+room.room.id}>
                				<img src={room.cover} />
                				<div className="room-info">
                					<h4>{room.room.name}</h4> 
                				</div>
                				<div className="shadow-blur"></div>
            				</Link>
			            </div>
        				)
        			})}
			</div>
	  )
	}
}

export default List
