export function dataHasErrored(bool) {
	return {
		type: 'DATA_HAS_ERRORED',
		hasErrored: bool
	};
}

export function dataIsLoading(bool) {
	return {
		type: 'DATA_IS_LOADING',
		isLoading: bool
	};
}

export function flightsFetchDataSuccess(flights) {
	return {
		type: 'FLIGHTS_FETCH_DATA_SUCCESS',
		flights
	};
}

export function setActiveStatus(str) {
	return {
		type: 'SET_ACTIVE_STATUS',
		str
	}
}

// FETCHING REQUEST(AUTH, DATA)

export function getData(type = 'arrivals') {
	return(dispatch) => {
		const requestUrl = buildRequest(type);
		dispatch(getToken('https://api.lufthansa.com/v1/oauth/token', requestUrl));
	}
}

function getToken(authUrl, requestUrl) {
	return (dispatch) => {
	fetch(authUrl, {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  body: 'client_id=v8qzec8fcmnp97s88jedqpz5&client_secret=GHqzzu8PJq&grant_type=client_credentials'
	})
	.then((response) => response.json())
	.then((tokenData) => {
	  dispatch(fetchData(requestUrl, tokenData));
	})
	.catch((error) => console.log(error));
	}
}

function buildRequest(subResource) {
  let tzoffset = (-60 * 60000); //Zurich timezone GMT+1
  let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -8);
  let currentDate = (new Date(Date.now())).toJSON().slice(0, 10);
  let urlStart = 'https://api.lufthansa.com/v1/operations/customerflightinformation/';

  if(subResource === 'arrivals' || subResource === 'departures') {
	  return urlStart + subResource + '/ZRH/' + localISOTime;	
  } else {
  	return urlStart + subResource + '/' + currentDate + '?limit=1';
  }

}

function fetchData(url, tokenData) {
	return (dispatch) => {
	  dispatch(dataIsLoading(true));

	  const auth = 'Bearer ' + tokenData.access_token;

	  const myHeaders = new Headers();
	  myHeaders.append('Authorization', auth);
	  myHeaders.append('Accept', 'application/json');

	  const myInit = {
	    method: 'GET',
	    headers: myHeaders,
	    mode: 'cors',
	    cache: 'default'
	  }

	  const requestData = new Request(url, myInit);

	  fetch(requestData)
	    .then((response) => {
	    	
	    	dispatch(dataIsLoading(false));
	      
	      if (response.ok) {
	      	return response; 
	      }

	      throw Error(response.statusText);
	  })
	    .then((response) => response.json())
	    .then((data) => dispatch(flightsFetchDataSuccess(data)))
	    .catch(() => dispatch(dataHasErrored(true)))
	}
}

// SEARCH

export function getFlightNumber(number) {
	return (dispatch) => {
		const requestUrl = buildRequest(number);
		dispatch(getToken('https://api.lufthansa.com/v1/oauth/token', requestUrl));
	}
}

export function setSearchValue(value) {
	return {
		type: 'SET_SEARCH_VALUE',
		value
	}
}