import { connect } from 'react-redux';
import DocArticle from '../documentation/DocArticle.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const DocArticle_wrap = connect(mapStateToProps("DocArticle"), mapDispatchToProps("DocArticle"))(DocArticle)

export default DocArticle_wrap