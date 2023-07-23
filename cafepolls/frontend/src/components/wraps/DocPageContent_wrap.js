import { connect } from 'react-redux';
import DocPageContent from '../documentation/DocPageContent.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const DocPageContent_wrap = connect(mapStateToProps("DocPageContent"), mapDispatchToProps("DocPageContent"))(DocPageContent)

export default DocPageContent_wrap