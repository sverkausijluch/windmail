import { connect } from 'react-redux';
import TagsListWindow from '../windows/TagsListWindow.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const TagsListWindow_wrap = connect(mapStateToProps("TagsListWindow"), mapDispatchToProps("TagsListWindow"))(TagsListWindow)

export default TagsListWindow_wrap