import { combineReducers } from 'redux';
import { flights, dataHasErrored, dataIsLoading, status, searchValue } from './flights';

export default combineReducers({
	flights,
	dataIsLoading,
	dataHasErrored,
	status,
	searchValue
});