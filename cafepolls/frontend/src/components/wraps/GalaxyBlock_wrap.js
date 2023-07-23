import { connect } from 'react-redux';
import GalaxyBlock from '../socialpages/GalaxyBlock.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const GalaxyBlock_wrap = connect(mapStateToProps("GalaxyBlock"), mapDispatchToProps("GalaxyBlock"))(GalaxyBlock)

export default GalaxyBlock_wrap