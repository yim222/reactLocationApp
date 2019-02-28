import React from 'react'
import {BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import MapServiceChooseCoords from '../services/MapServiceChooseCoords'

 class ChooseCoords extends React.Component{

  render(){

    return(

      <div>


        <h3 style = {
          {border: "3px solid black",
          backgroundColor: "white",
          padding: "5px"}
        }>Choose coordinates from the Map. Lattitude : {this.props.lat} , Longitude : {this.props.lng} </h3>
        <MapServiceChooseCoords onMapClick = {this.props.onMapClick}
        center = {
          {lat:this.props.lat, lng: this.props.lng} }/>

      </div>

    );
  }
}

 export default class ChooseCoordsRouter extends React.Component{

  render(){

    const CompRouter = () => (
      <div>

        <Router>
          <div>

            <li>
              <Link to="/mapView">Choose Coordinates from Map view </Link>
            </li>
            <li>
              <Link to="/">close Map view</Link>
            </li>

            <Route path="/mapView" component={()=> <ChooseCoords onMapClick = {this.props.onMapClick}
            lat  = {this.props.lat} lng = {this.props.lng}/>} />
          </div>

        </Router>

      </div>

    )


    return(
      <div>
        <CompRouter/>
      </div>
    )
  }
}
