import { connect } from 'react-redux';
import WalkPage from '../WalkPage.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const WalkPage_wrap = connect(mapStateToProps("WalkPage"), mapDispatchToProps("WalkPage"))(WalkPage)

export default WalkPage_wrap