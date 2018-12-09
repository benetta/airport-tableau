export function dataHasErrored(state = false, action) {
	switch (action.type) {
		case 'DATA_HAS_ERRORED':
			return action.hasErrored;

		default:
			return state;
	}
}

export function dataIsLoading(state = true, action) {
	switch (action.type) {
		case 'DATA_IS_LOADING':
			return action.isLoading;

		default:
			return state;
	}
}

export function flights(state = null, action) {
	switch (action.type) {
		case 'FLIGHTS_FETCH_DATA_SUCCESS':
			return action.flights;

		default:
			return state;
	}
}

export function status(state = 'arrivals', action) {
	switch(action.type) {
		case 'SET_ACTIVE_STATUS':
			return action.str;
		
		default:
			return state;
	}
}

export function searchValue(state = null, action) {
	switch(action.type) {
		case 'SET_SEARCH_VALUE':
			return action.value;

		default:
			return state;
	}
}