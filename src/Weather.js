import React from "react";
import { ListGroup } from "react-bootstrap";


class Weather extends React.Component{
    render(){
        return(
            <>
        {this.props.weatherData.map((day, index) => {
          return <ListGroup.Item key={index}>{day.date}, {day.description}</ListGroup.Item>
        })
        };
      </>
        )
    }
}

export default Weather;