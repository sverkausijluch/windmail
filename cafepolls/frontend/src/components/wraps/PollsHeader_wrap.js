import { connect } from 'react-redux';
import PollsHeader from '../polls/PollsHeader.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const PollsHeader_wrap = connect(mapStateToProps("PollsHeader"), mapDispatchToProps("PollsHeader"))(PollsHeader)

export default PollsHeader_wrap