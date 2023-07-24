import React from 'react'
import Carousel from './Carousel'
import List from './List'
import InfoBlock from './InfoBlock'

class MobileMainRooms extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			section: 'rooms',
		}
		this.changeSection = this.changeSection.bind(this)
	}
	changeSection = () => {
	    if(this.state.section=="rooms") {
    		this.setState({
    			section: 'info'
    		})
	    } else {
	        this.setState({
    			section: 'rooms'
    		})
	    }
	}
	render() {
	  return (
			<div>
		        <header className="cite-top container">
		            {this.state.section=='rooms'?(<Carousel />):(<InfoBlock />)}
		            <div className="sections-btn" onClick={this.changeSection}><i className="el-icon-arrow-right"></i></div>
				</header>
				<List rooms_count="3" />
			</div>
	  )
	}
}

export default MobileMainRooms
