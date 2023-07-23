import { connect } from 'react-redux';
import PagesAccess from '../PagesAccess.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const PagesAccess_wrap = connect(mapStateToProps("PagesAccess"), mapDispatchToProps("PagesAccess"))(PagesAccess)

export default PagesAccess_wrap