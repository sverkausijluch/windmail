import React from 'react'
import Carousel from './Carousel'
import List from './List'
import InfoBlock from './InfoBlock'

class MainRooms extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	  return (
			<div>
		        <header className="cite-top container">
				    <Carousel />
				    <InfoBlock />
				</header>
				<List rooms_count="5" />
			</div>
	  )
	}
}

export default MainRooms
