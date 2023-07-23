import { connect } from 'react-redux'
import SearchHeaderForm from '../search/SearchHeaderForm.js'
import mapStateToProps from '../../store/mapStateToProps.js'
import mapDispatchToProps from '../../store/mapDispatchToProps.js'

const SearchHeaderForm_wrap = connect(mapStateToProps("SearchHeaderForm"), mapDispatchToProps("SearchHeaderForm"))(SearchHeaderForm)

export default SearchHeaderForm_wrap