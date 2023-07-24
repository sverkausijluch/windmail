import React from 'react'
import SecondHeader_wrap from "../wraps/SecondHeader_wrap"
import HeaderColorLine from "../HeaderColorLine"
import MobileSecondHeader_wrap from "../wraps/MobileSecondHeader_wrap"
import MediaQuery from 'react-responsive'

class CiteHeader extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
        return (
    		  <>
    			<HeaderColorLine />
    		    <MediaQuery maxWidth={800}>
    			    <MobileSecondHeader_wrap />
    			</MediaQuery>
    		    <MediaQuery minWidth={801}>
    			    <SecondHeader_wrap />
    			</MediaQuery>
    		  </>
    	  )
	}
}

export default CiteHeader
