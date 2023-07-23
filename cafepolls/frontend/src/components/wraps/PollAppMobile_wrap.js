import { connect } from 'react-redux';
import PollAppMobile from '../polls/PollAppMobile.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const PollAppMobile_wrap = connect(mapStateToProps("PollAppMobile"), mapDispatchToProps("PollAppMobile"))(PollAppMobile)

export default PollAppMobile_wrap