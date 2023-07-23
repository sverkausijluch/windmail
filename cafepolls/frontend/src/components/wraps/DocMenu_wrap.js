import { connect } from 'react-redux';
import DocMenu from '../documentation/DocMenu.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const DocMenu_wrap = connect(mapStateToProps("DocMenu"), mapDispatchToProps("DocMenu"))(DocMenu)

export default DocMenu_wrap