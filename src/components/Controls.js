import React from 'react';
import { Row, Col, Jumbotron, Button, Container, InputGroup, InputGroupAddon } from 'reactstrap';
import { connect } from 'react-redux';
import { getData, getFlightNumber, setActiveStatus } from '../actions';

class Controls extends React.Component {
	constructor() {
		super();

		this.searchRef = React.createRef();
	}

	onSearchBtnClick = (e) => {
		let flightNum = this.searchRef.current.value;
		this.props.setActiveStatus('search');
		this.props.getFlightNumber(flightNum);
		this.searchRef.current.value = null;
	}

	onSearchBtnKeyDown = (e) => {
		if(e.keyCode === 13) {
			this.onSearchBtnClick();
		}
	}

	clearSearchValue() {
		this.searchRef.current.value = null;
	}

	render() {
		const { getData, setActiveStatus, status } = this.props;
		return (
			<React.Fragment>
				<Jumbotron fluid>
					<Container fluid>
					<h1>Цюрих</h1>
					<Row>
						<Button 
							color='link' 
							className={ status === 'departures' ? 'text-success' : 'text-dark' } 
							onClick={function(e) {
								setActiveStatus('departures');
								getData('departures');
							}}>Вылет</Button>
						<Button 
							color='link' 
							className={ status === 'arrivals' ? 'text-success' : 'text-dark' } 
							onClick={function(e) {
								setActiveStatus('arrivals');
								getData('arrivals');
							}}>Прилет</Button>
					</Row>
					</Container>
				</Jumbotron>
				<Row>
					<Col>
						<InputGroup>
						  <input 
						  	onKeyDown={this.onSearchBtnKeyDown} 
						  	className="form-control" 
						  	ref={this.searchRef} 
						  	type="text" 
						  	placeholder="Введите код оператора и номер рейса, напр.: LH400" />
						  <InputGroupAddon  addonType="append">
						    <Button
						    	onClick={this.onSearchBtnClick} 
						    	color="primary">Искать</Button>
						  </InputGroupAddon>
						</InputGroup>
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    status: state.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (type) => dispatch(getData(type)),
    getFlightNumber: (number) => dispatch(getFlightNumber(number)),
    setActiveStatus: (str) => dispatch(setActiveStatus(str))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);