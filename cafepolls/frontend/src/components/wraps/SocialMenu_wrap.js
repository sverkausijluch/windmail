import { connect } from 'react-redux';
import SocialMenu from '../socialpages/SocialMenu.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const SocialMenu_wrap = connect(mapStateToProps("SocialMenu"), mapDispatchToProps("SocialMenu"))(SocialMenu)

export default SocialMenu_wrap