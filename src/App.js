import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getData } from './actions';

import Controls from './components/Controls';
import FlightsTable from './components/FlightsTable';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { flights, isLoading, hasErrored, status } = this.props;
    let flightsRender; 

    if(isLoading) {
      flightsRender = <Col>Загружаем...</Col>;
    } else if (hasErrored) {
      const errMessage = status === 'search' ? 'К сожалению, мы не можем найти заданный рейс.' : 'Произошла ошибка при запросе рейсов.'
      flightsRender = <Col>{errMessage}</Col>
    } else if (flights) {
      flightsRender = <FlightsTable flights={flights.FlightInformation.Flights.Flight}></FlightsTable>;
    }

      return (
        <Container>
          <Controls></Controls>
          <Row>
            {flightsRender}
          </Row>
        </Container>  
      );
  }
}

const mapStateToProps = (state) => {
  return {
    flights: state.flights,
    hasErrored: state.dataHasErrored,
    isLoading: state.dataIsLoading,
    status: state.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
