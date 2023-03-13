import axios from 'axios';
import React from 'react';
import { Form, Button, Container, ListGroup, Image } from 'react-bootstrap';
//  import Weather from './Weather';
import "./index.css";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityName: '',
      cityData: {},
      cityMap: '',
      weatherData: {},
      error: false,
      errorMessage: '',
      allData: []
    }
  }


  handleInput = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  getCityData = async (e) => {
    e.preventDefault();
    try {
      let cityDataFromAxios = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`);
     
      let cityMapArray = [];
      cityDataFromAxios.data.map(element => {
        let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${element.lat},${element.lon}&zoom=12`
        console.log("TESS", cityMap)
        cityMapArray.push(cityMap); 
        return element;
      });
      this.setState({ allData: cityMapArray }); 

       let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=12`
     console.log(cityMap)
      this.setState({
        cityData: cityDataFromAxios.data,
       cityMap: cityMap,
        error: false
      });
   //   this.handleGetWeather(cityDataFromAxios.data[0].lat, cityDataFromAxios.data[0].lon);
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }
  }

  handleGetWeather = async (lat, lon) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
      let weatherDataFromAxios = await axios.get(url);
      this.setState({
        weatherData: weatherDataFromAxios.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  
  render() {

    // let weatherComponent = <></>;
    // if (Object.keys(this.state.weatherData).length !== 0) {
    //   weatherComponent = <Weather weatherData={this.state.weatherData} />
    // }

    console.log(this.state.allData)

    return (
      <>
        <h1>City Explore</h1>
        <Form onSubmit={this.getCityData}>
          <Form.Group>
            <Form.Label as='form-label'>City Name:</Form.Label>
            <Form.Control type='text' placeholder='City Name' onInput={this.handleInput}></Form.Control>
            <Button type='submit'>Explore!</Button>
          </Form.Group>
        </Form>

        {this.state.error ?
          <div className='ERRORS'>
          <h1>Something went wrong. Error of {this.state.errorMessage}</h1>
          <p>Please try again later. Or enter a valid City Name</p>
        </div>
          :
          <Container>
            <ListGroup as='list-group'>
              <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
              <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
              <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
            </ListGroup>
            {this.state.allData.map(element => {
             
              return (<Image src={element} />)
            })}
          </Container>
        } 
       
      </>
    );
  }
}

export default App;

