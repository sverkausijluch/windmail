import { connect } from 'react-redux';
import AnswerForm from '../forms/AnswerForm.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const AnswerForm_wrap = connect(mapStateToProps("AnswerForm"), mapDispatchToProps("AnswerForm"))(AnswerForm)

export default AnswerForm_wrap