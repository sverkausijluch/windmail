import { connect } from 'react-redux';
import CiteMenu from '../CiteMenu.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const CiteMenu_wrap = connect(mapStateToProps("CiteMenu"), mapDispatchToProps("CiteMenu"))(CiteMenu)

export default CiteMenu_wrap