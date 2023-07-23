import { connect } from 'react-redux';
import MyGroups from '../socialpages/MyGroups.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const MyGroups_wrap = connect(mapStateToProps("MyGroups"), mapDispatchToProps("MyGroups"))(MyGroups)

export default MyGroups_wrap