import { connect } from 'react-redux';
import MobileSecondHeader from '../MobileSecondHeader.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const MobileSecondHeader_wrap = connect(mapStateToProps("MobileSecondHeader"), mapDispatchToProps("MobileSecondHeader"))(MobileSecondHeader)

export default MobileSecondHeader_wrap