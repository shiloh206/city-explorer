import React from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, ListGroup, Image } from 'react-bootstrap';
 import Weather from './Weather';

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
      errorMessage: ''
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
      //https://us1.locationiq.com/v1/search.php?key=pk.6df6ac4f8f5f176778a8661fe06288b7&q=Seattle&format=json

//https://maps.locationiq.com/v3/staticmap?key=pk.6df6ac4f8f5f176778a8661fe06288b7&center=45.5202471,-122.674194&zoom=12

      let cityDataFromAxios = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`);
     console.log(cityDataFromAxios)
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=12`
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

    let weatherComponent = <></>;
    if (Object.keys(this.state.weatherData).length !== 0) {
      weatherComponent = <Weather weatherData={this.state.weatherData} />
    }

    return (
      <>
        <h1>API Calls</h1>
        <Form onSubmit={this.getCityData}>
          <Form.Group>
            <Form.Label as='form-label'>City Name:</Form.Label>
            <Form.Control type='text' placeholder='City Name' onInput={this.handleInput}></Form.Control>
            <Button type='submit'>Explore!</Button>
          </Form.Group>
        </Form>

        {this.state.error ?
          <Alert variant="warning">{this.state.errorMessage}</Alert>
          :
          <Container>
            <ListGroup as='list-group'>
              <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
              <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
              <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
            </ListGroup>
            <Image src={this.state.cityMap} />
          </Container>
        } 
       
      </>
    );
  }
}

export default App;










// import React from 'react';
// import axios from 'axios';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       city: '',
//       cityName: '',
//       cityData: {},
//       error: false,
//       errorMessage: ''
//     }
//   }

//   eventHandler = async (e) => {
//     e.preventDefault();
//     try {
//       // axios is the library of code that we will use to make our requests
//       let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`
//       // console.log(starWarsCharacters.data.results);
//       //save it in state
//       this.setState({
//         cityData: cityDataFromAxios.data[0],
//         cityMap: cityMap,
//         error: false
//       });
//     } catch (error) {
//       this.setState({
//         error: true,
//         errorMessage: `${error.message}`
//       })
//     }
//   }
//   handleGetWeather = async (lat, lon) => {
//     try {
//       let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
  
//       let weatherDataFromAxios = await axios.get(url);
  
//       this.setState({
//         weatherData: weatherDataFromAxios.data
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   citySubmit = async (e) => {
//     e.preventDefault();
//     // what city are we searching for — the one in state
//     const { cityName } = this.state;
  
//     // get data from the Location IQ API
//     try {
//       let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${cityName}&format=json`);
//       console.log(cityData.data[0]);
//       // save that data in state
//     } catch (error) {
//       console.log(error);
//     }
//   }
  

//   render() {

//     let starWarsListItems = this.state.starWarsData.map((swData, idx) => {
//       // console.log(idx);
//       // console.log(swData);
//       return <li key={idx}>{swData.name}</li>
//     })

//     let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.330062&zoom=12`

//     console.log(this.state.cityName);
//     return (
//        <>
//         <h1>API Calls</h1>
//         <Form onSubmit={this.getCityData}>
//           <Form.Group>
//             <Form.Label as='form-label'>City Name:</Form.Label>
//             <Form.Control type='text' placeholder='City Name' onInput={this.handleInput}></Form.Control>
//             <Button type='submit'>Explore!</Button>
//           </Form.Group>
//         </Form>

//         {
//           this.state.error
//             ? <Alert variant="warning">{this.state.errorMessage}</Alert>
//             : <Container>
//               <ListGroup as='list-group'>
//                 <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
//                 <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
//                 <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
//               </ListGroup>
//               <Image src={this.state.cityMap}></Image>
//             </Container>
//         }
//         <Weather 
//           weatherData={this.state.weatherData}
//         />
//       </>
//     );
//   }
// }

// export default App;