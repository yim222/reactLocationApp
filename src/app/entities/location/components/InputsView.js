import React from 'react';
import ChooseCoordsRouter from './ChooseCoords'
//import {GetDataServices} from '../../globalServices/GetDataServices';
//import { Link, Router } from 'react-router-dom'
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'//import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export class InputsView extends React.Component{

  constructor(props){
    super();

    this.state = {

        categoriesIDs :[],
        openDropList: false

      };


    //console.log("categoriesList", categoriesList);

    this.displayCategoriesOptions = this.displayCategoriesOptions.bind(this);


  }

  componentDidMount(){


  }
  componentDidUpdate(){
    //Todo - nice handling to the change of the select so it's won't blink...
  }

  displayCategoriesOptions(categoriesData){

      let sortedList = categoriesData.sort(function(a,b){
        let elA = a[1].toUpperCase();
        let elB = b[1].toUpperCase();

        if (elA > elB){return 1;}
        else if (elA < elB ){return -1};
        return 0 ;
      });
      let view = sortedList.map((item)=>

        <option key = {item[0]} value={item[0]} className = "option1">{item[1]}</option>

    );
    return view;
  }



  render(){


    return(
      <div>

        <label>
          Name: <br/>
          <input type = "text" value = {this.props.initialValue.locationName} onChange = {this.props.handleChange}
          name = "locationName"
          />
        </label>
        <br/>
        <label>
        Address:<br/>
          <input type = "text" value = {this.props.initialValue.locationAddress}
          onChange = {this.props.handleChange}
          name = "locationAddress"
          />
        </label>
        <br/>

          Coordinates:<br/>

          <ChooseCoordsRouter onMapClick = {this.props.onMapClick}
          lat = {this.props.initialValue.locationLat} lng = {this.props.initialValue.locationLng}/>
        <label>
          lat :<br/>
          <input type="number" min ="-99" max = "99" step="0.2"  value = {this.props.initialValue.locationLat}
          onChange = {this.props.handleChange}
          name = "locationLat"
          />
        </label>
        <br/>
        <label>
          lng :<br/>
          <input type="number" min ="-99" max = "99" step="0.2" value = {this.props.initialValue.locationLng}
           onChange = {this.props.handleChange}
          name = "locationLng"
          />
        </label>
          <br/>


        <div className = "selectMenu1">
            <h4 className = "dropListHeader" onClick = {()=> {
              this.setState({
                openDropList: !this.state.openDropList
              })
            }}>
            Select Category (multiple choices)
             <span className = "dropListArrow"> &#9662;</span></h4>
            <SelectBody categoriesIDs = {this.props.initialValue.locationCategoriesIDs}

            handleCategoriesSelect = {(

                 this.props.handleCategoriesSelect

               )
             }
             className = {this.state.openDropList ? "" : "hidden"}
             openDropList = {this.state.openDropList}
             >
            {/*console.log("this.props.initialValue.categoriesIDs",this.props.initialValue.categoriesIDs)*/}


            {this.displayCategoriesOptions(this.props.categoriesData)}
            </SelectBody>

       </div>




      </div>

    )
  }

}

function SelectBody(props){
  return(
    <label>


      <select multiple={true}  value={props.categoriesIDs}
       onChange={props.handleCategoriesSelect} name = "categories1" className = {props.openDropList ? "" : "hidden"}>
       {props.children}

      </select>
    </label>
  )
}
