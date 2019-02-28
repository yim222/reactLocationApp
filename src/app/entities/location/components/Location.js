import React from 'react';
import {EntitiesServices} from '../../globalServices/EntitiesServices'



export class Location extends React.Component{

  constructor(props){
    super();
    this.service = new EntitiesServices();



  }

  render(){
    return(
      <div onClick = {(this.props.onClick1 ==null ? (e)=> e.preventDefault() :()=> this.props.onClick1(this.props.id))} >

             <span className = "label1">Location :</span><span className = "value1">{this.props.data.name} </span><br/>
             <span className = "label1">Addres :</span><span className = "value1">{this.props.data.address} </span><br/>
             <span  className = "label1">Coordinates: </span><br/>
             <span><span  className = "label1">Latitude : </span><span className = "value1">{this.props.data.coordinates.lat} </span></span>
             &
             <span><span  className = "label1"> Longitude : </span><span className = "value1">{this.props.data.coordinates.lng} </span></span>
             <br/>
             <span  className = "label1">
              Categories:</span>
              <br/>
              <span className = "littleItem1">{this.service.iDsToCategories(  this.props.data.categoriesIDs  ) }</span>

      </div>

    )
  }

}
