import { connect } from 'react-redux'
import PollOptions from '../polls/PollOptions.js'
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const PollOptions_wrap = connect(mapStateToProps("PollOptions"), mapDispatchToProps("PollOptions"))(PollOptions)

export default PollOptions_wrap