import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

class Carousel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected_room: 0,
			rooms: [{'room':{'id':0,'name':''},'cover':''}],
		}
		this.changeSelectedRoom = this.changeSelectedRoom.bind(this)
	}
	componentDidMount() {
		axios.get(window.location.origin+'/api/mainrooms').then(rooms => {
			rooms = rooms.data
			if(rooms.length<3){
			    for(let i=0;i<3;i++){
			        if(rooms[i]==undefined) {
			            rooms[i] = {'room':{'id':0,'name':'Не найдено'},'cover':''}
			        }       
			    }
			}
    		this.setState({
    			rooms: rooms
    		})
		})
	}
	changeSelectedRoom = (e) => {
	    let index = e.target.getAttribute('data-index')
	    document.getElementById('toggles').querySelector('.active').classList.remove('active')
	    e.target.classList.add('active')
		this.setState({
			selected_room: index
		})
	}
	render() {
	  return (
			<div className="col1 carousel" id="carousel">
				<div className="mainroomslide">
			        <Link to={"./room/"+this.state.rooms[this.state.selected_room].room.id}>
    					<div className="header-text">
    						<h1>{this.state.rooms[this.state.selected_room].room.name}</h1>
    					</div>
				    </Link>
					<img src={this.state.rooms[this.state.selected_room].cover} className="banner" />
				</div>
				<div className="toggles" id="toggles">
					<div className="toggle active" onClick={this.changeSelectedRoom} data-index="0"></div>
					<div className="toggle" onClick={this.changeSelectedRoom} data-index="1"></div>
					<div className="toggle" onClick={this.changeSelectedRoom} data-index="2"></div>
				</div>
			</div>
	  )
	}
}

export default Carousel
