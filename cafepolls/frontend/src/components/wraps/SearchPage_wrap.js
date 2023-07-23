import { connect } from 'react-redux';
import SearchPage from '../search/SearchPage.js';
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const SearchPage_wrap = connect(mapStateToProps("SearchPage"), mapDispatchToProps("SearchPage"))(SearchPage)

export default SearchPage_wrap