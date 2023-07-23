import React from 'react'

class HeaderColorLine extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			color_class: '',
		}
	}
	componentDidMount(){
	    let MyDate = new Date
        let MyHours = MyDate.getHours()
        let color_class = ''
        switch (true){
        	case (MyHours >= 3) && (MyHours < 6):color_class = 'early-morning-color'
        	break
        	case (MyHours >= 6) && (MyHours < 10):color_class = 'morning-color'
        	break
        	case (MyHours >= 10) && (MyHours < 17):color_class = 'day-color'
        	break
        	case (MyHours >= 17) && (MyHours < 22):color_class = 'evening-color'
        	break
        	default:color_class = 'night-color'
        	break
        }
		this.setState({
			color_class: color_class
		})
	}
	render() {
	  return (
    	<header className={"first-header "+this.state.color_class}>
    	</header>
	  )
	}
}

export default HeaderColorLine
