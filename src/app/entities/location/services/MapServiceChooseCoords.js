import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapServiceChooseCoords extends React.Component {
  constructor(props){
    super()
    this.state = {
      selectedPlace:{
        name: "My Place"
      },
      latLng: {
        lat: 0,
        lng:0
      }
    }
  }
  onMapClick = (mapProps, map, ev)=> {
    //alert(ev.latLng)
    this.setState( {
      latLng : ev.latLng
    })
  this.props.onMapClick(ev);
}
  render() {

    const mapStyle = {
      width: "70%",
      height: "500px",
      position:"absolute"

    }
    const center1 = {lat:0, lng: 0};
      return (
        <div >
          <p>Todo  : make the map note initializing each click(in child component it's seems to be problem ) </p>
        <Map google={this.props.google} zoom={3} style = {mapStyle}
        onClick={this.onMapClick}
      initialCenter = {this.props.center}
      center = {this.props.center}

        >
          <Marker position = {this.props.center}/>


        </Map>
        </div>
      );
    }
  }
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBuvVXZUkXAxUZCfhCApoFF2uEcyR7r430")
})(MapServiceChooseCoords)
