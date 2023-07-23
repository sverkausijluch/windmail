import { connect } from 'react-redux';
import ConfirmWindow from '../windows/ConfirmWindow.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const ConfirmWindow_wrap = connect(mapStateToProps("ConfirmWindow"), mapDispatchToProps("ConfirmWindow"))(ConfirmWindow)

export default ConfirmWindow_wrap