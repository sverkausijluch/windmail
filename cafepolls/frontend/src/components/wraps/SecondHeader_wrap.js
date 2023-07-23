import { connect } from 'react-redux';
import SecondHeader from '../SecondHeader.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const SecondHeader_wrap = connect(mapStateToProps("SecondHeader"), mapDispatchToProps("SecondHeader"))(SecondHeader)

export default SecondHeader_wrap