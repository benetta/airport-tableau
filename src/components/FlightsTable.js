import React from 'react';
import { Table } from 'reactstrap';
import airports from 'airport-codes';

class FlightsTable extends React.Component {
	getCity(code) {
		const findAirport = airports.findWhere({iata: code});

		if (findAirport) {
			return findAirport.get('city');
		}

		return code;
	}
	
	render() {
		let flights;

		if ( !Array.isArray(this.props.flights) ) {
			flights = [this.props.flights];
		} else {
			flights = this.props.flights;
		}

		const flightsTable = flights.map( (item) => {
			const time = item.Arrival.Actual.Time;
			
			const departureCity = this.getCity(item.Departure.AirportCode);
			const arrivalCity = this.getCity(item.Arrival.AirportCode);

			const number = item.OperatingCarrier.AirlineID + item.OperatingCarrier.FlightNumber;
			const status = item.Status.Description;

			const isDelayed = status === 'Flight Delayed' ? true : false;
			
			return (
				<tr key={number} className={isDelayed ? "text-danger": null}>
						<th scope="row">{time}</th>
						<td>{departureCity}</td>
						<td>{arrivalCity}</td>
						<td>{number}</td>
						<td>{status}</td>
					</tr>
			)
		});
		
		return (
			<Table hover>
				<thead>
					<tr>
						<th>Время</th>
						<th>Город вылета</th>
						<th>Город прибытия</th>
						<th>Рейс</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{flightsTable}
				</tbody>
			</Table>
		)
	}
}

export default FlightsTable;