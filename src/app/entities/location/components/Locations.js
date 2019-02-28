import React from 'react';
//import { Link, Router } from 'react-router-dom'

import {Location} from './Location';
import {Category} from '../../category/components/Category'
import {InputsView} from './InputsView';
import {LOCATIONS_MOCK, testData} from '../Mocks';
import {DBServices} from '../../globalServices/DBServices';
import {LocationHeader} from '../LocationHeader';
import {GetDataServices} from '../../globalServices/GetDataServices';
import {LocationServices} from '../services/LocationServices'


export class Locations extends React.Component{

  constructor(props){
    super();
    console.log("Locations Component Has Created");



    this.state = {
      currentId : -1,
      locationName: "",
      locationAddress:"",
      locationLng: null,
      locationLat: null,
      actionView: '',
      locationCategoriesIDs: [],
      filterByGroups: false


    }
    this.locationServices = new LocationServices();
    const dao = new GetDataServices();

    //Get the categories data for using in the cateories choice
    const categoriesData = dao.getCategories();

    //for use it as parameter. TODO - change all the local categoriesData to this.
    this.categoriesData = categoriesData;

    //data name - for using with the get/save db services
    this.dataName = "locations";

    //Getting Locations Data:
    const locationsData = dao.getLocations();
    //console.log("check", categoriesData);

    //Different settings style:
    this.styles = {

      choosed1: {backgroundColor: "black"}

    };

    //Id's generator for assign the general using
    this.idGenerator = require("uuid/v1");

    //Inner CRUD Views
    //Update view
    this.updateView = (()=>{
      return(
      <div>

      <label>
      <h4>Update Location:</h4>
        <InputsView categoriesData = {this.categoriesData.arr} handleChange = {this.handleChange} initialValue = {this.state}
        handleCategoriesSelect = {this.handleCategoriesSelect}
        onMapClick = {this.onMapClick} />

      </label>
      <br/>
      <button type="button" onClick = {() => this.updateLocation()}>Save</button>
      </div>)
    });

    //Just for testing
    this.deleteView = (()=>{
      return(
      <div>
      <h1>deleteView to remove at the end</h1>

      <button onClick = {() => this.deleteLocation()}>Delete</button>
      </div>)
    });

    //Create view
    this.createView = (()=>{

      return(
      <div>

        <InputsView handleChange = {this.handleChange} initialValue = {this.state} categoriesData = {this.categoriesData.arr}
        handleCategoriesSelect = {this.handleCategoriesSelect}
        onMapClick = {this.onMapClick}
        />
        <button onClick = {() => this.createLocation()}>Create New</button>
      </div>)
    });

    //for testing
    this.test1 = "testMe;"

    //Array that contain all data of locations
    this.locationsData = {};

    //DB Service Object
    this.dbService = new DBServices();

    //if storgae null - getting initial data
    if (this.dbService.getData(this.dataName) == null){
      console.log("Storgae Empty - set an initial Data ");
      this.locationsData = LOCATIONS_MOCK;
      const locationsData = Array.from(LOCATIONS_MOCK);
      this.dbService.saveData(this.dataName,locationsData );

    }

    //get data from the storgae
    else{
      console.log("Storgae Not null");

      //Getting the updated data
      const locationsData = dao.getLocations();

      //We'll use Map object on data changing and etc.
      this.locationsData = locationsData.map;
    }

    //Bind functions:
    this.displayLocations = this.displayLocations.bind(this);
    this.onLocationClick = this.onLocationClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.createLocation = this.createLocation.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
    this.displayActionView = this.displayActionView.bind(this);
    this.inputNotEmpty = this.inputNotEmpty.bind(this);
    this.validLngLat = this.validLngLat.bind(this);
    this.validInputs = this.validInputs.bind(this);
    this.handleCategoriesSelect = this.handleCategoriesSelect.bind(this);
    this.onMapClick = this.onMapClick.bind(this);


  }//End Of constructor






  componentDidMount(){


  }

  //Display all locations
  displayLocations(){
    //Convert the Map data object into array for running it Array.map iterate functions
    let arr = Array.from(this.locationsData); // change from


    //Sorting the array by alphabetically order. I keep the original array as is, for future possible using.
    let sortedList  = this.locationServices.sortListAlphabetically(arr);
    //Trying -
    //this.locationServices.filterAndGenerateList(true,sortedList );
    //sortedList
    /*trying carefully
    let view = sortedList.map((item)=>

      <div key = {item[0]} className = "itemStyle1"
        style  = {this.state.currentId === item[0] ?  this.styles.choosed1: null}>

        <div  >
          <Location data = {item[1]} id = {item[0]}
          onClick1 = {this.onLocationClick}

          />


        </div>
      </div>
    );
    */
    let x = {

    }
    console.log("this", this);
    let view = this.locationServices.filterAndGenerateList(this, sortedList, this.state.filterByGroups);

    return view;
  }

  //What's happen when Location clicked
  onLocationClick(id){

    //Assign to state the Location data from the local data Map
    var locationData = this.locationsData.get(id);

    this.setState({

      currentId: id,
      locationName: locationData.name,
      locationAddress: locationData.address,
      locationLat: locationData.coordinates.lat,
      locationLng: locationData.coordinates.lng,
      locationCategory: locationData.categories,
      locationCategoriesIDs: locationData.categoriesIDs,

      toRender: true,
    });
  }

  //CRUD ACTIONS
  //update
  updateLocation(){

    //Do inputs validation
    if(!this.validInputs()){
      return;
    }


    let newLocationData = Object.assign(
      {
        currentId: "",
        locationName:"",
        locationAddress:"",
        locationLat:"",
        locationLng:"",
        locationCategoriesIDs:[]
      }, this.state);


    let passData = {
      id: newLocationData.currentId,
      name: newLocationData.locationName,
      address: newLocationData.locationAddress,
      coordinates:{
        lat: newLocationData.locationLat,
        lng: newLocationData.locationLng
      },
      categoriesIDs: newLocationData.locationCategoriesIDs



    }
    //console.log("newLocationData",newLocationData);
    this.locationsData.set(newLocationData.currentId, passData);
      this.setState({
        toRender: true

    });


    //Save data to storage
    const locationsData = Array.from(this.locationsData);
    this.dbService.saveData(this.dataName,locationsData );


    }

    //Delete
    deleteLocation(){
      this.locationsData.delete(this.state.currentId);
      this.setState({
        toRender: true
      });
      //Save data to storage
      const locationsData = Array.from(this.locationsData);
      this.dbService.saveData(this.dataName,locationsData );

    }

  //Create New
  createLocation(){

    //Do inputs validation
    if(!this.validInputs()){
      return;
    }

    //Generates new Id for new component
    const id = this.idGenerator();
    this.setState({
      currentId : id
    });
    let newLocationData = Object.assign(
      {locationName:"",
      locationAddress:"",
      locationLat:null,
      locationLng:null,
      locationCategoriesIDs:[]
    }, this.state);

    let passData = {
      name: newLocationData.locationName,
      address: newLocationData.locationAddress,
      coordinates:{
        lat: newLocationData.locationLat,
        lng: newLocationData.locationLng
      },
      categoriesIDs: newLocationData.locationCategoriesIDs
    }


    //console.log("newLocationData",newLocationData);

    this.locationsData.set(id, passData);
      this.setState({//reset the data
        locationName:"",
        locationAddress:"",
        locationLat:"",
        locationLng:"",
        locationCategoriesIDs:[],
        toRender: true

    });

    //Save data to storage
    const locationsData = Array.from(this.locationsData);
    this.dbService.saveData(this.dataName,locationsData );

  }

  //What's happen when one of the CRUD options clicked
  chooseOption = (thisEl)=>{
    this.setState({
      actionView: thisEl
    });
    if (thisEl === "create"){

      this.setState({
        currentId: "",
        locationName: "",
        locationAddress: "",
        locationLat: "",
        locationLng: "",
        locationCategory: "",
        locationCategoriesIDs:[]
      });
    }
    else if(thisEl === "delete"){
       this.deleteLocation();
    }
    else if (thisEl === "display"){
      //Nothing to do, because the view sets in "displayActionView()"
    }
  }

  //Handle input changes - in each input u just need to make its "name" attribute corrsespond to the
  //state property u want to change.
  handleChange(ev){

    let name = ev.target.name;
    this.setState({
      [name]:ev.target.value
    });
  }

  //Displays the CRUD action view, when needed.
  displayActionView =()=>{
    let view ={};
    let choosed = this.state.actionView;
    if(choosed === 'create'){
      view = this.createView();
    }
    else if(choosed === 'update'){
      view = this.updateView();
    }
    else if(choosed === 'display'){
      //alert(this.state.currentId);
      if(!this.state.currentId > 0 ){
        alert("First choose location");
        return;
      }
      const data =  this.locationsData.get(this.state.currentId);
      view = <h4><Location data = {data}/></h4>
      //this.setState();

    }

    else if (choosed === 'delete'){
      view = (
      <div>
      <h4>Location has deleted</h4>

    </div>)
      ;
    }

    else{
      view = (
      <div>
      <h4>Get Start -</h4>
      <p> You can choose Location from the list, and manage it, or create new.
      </p>
    </div>)
      ;
    }

    return view;
  };

  //inputs validation()
  inputNotEmpty(){
    const values = this.state;
    const testedInputs = [values.locationName, values.locationAddress,
    values.locationLat.toString(), values.locationLng.toString()]

    //console.log(testedInputs);

    for(let str of testedInputs){

      if(!(str && str.trim().length > 0)
       ||  !(values.locationCategoriesIDs.length > 0 )//valid categories choice
      ){
        alert("All inputs must be filled");
        return false;
      }
    }
    return true ;//All inputs are filled
  }

  //Lng and Lat validation
  validLngLat(){

    const lng = this.state.locationLng;
    const lat = this.state.locationLat;
    let valid = true;
    if ((lng > 180 || lng < -180)|| (lat > 90 || lat < -90)){
      alert("Lng/Lat values not valid - \n"
    +"Lng range = -180 to +180\n"
    +"Lat range = -90 to +90");
    return false;

    }
    return true;


  }

  validInputs(){

    return (this.validLngLat() && this.inputNotEmpty());
  }



  handleCategoriesSelect(ev ){
    ev.preventDefault();
    var newElement = ev.target.value;
    let dataArr = this.state.locationCategoriesIDs.slice();//assign the state

    //if include remove it
    //console.log("dataArr", dataArr);
    if(dataArr.includes(newElement)){
      dataArr = dataArr.filter(e => e !== newElement);
      console.log("const dataArr",  dataArr);

    }
    else{
      dataArr.push(newElement);
    }

    //set state with function because it's on array
    this.setState(prevState => (
      {locationCategoriesIDs: dataArr}
    ));

  }

  onMapClick(ev){
    console.log(ev.latLng.lat(), "Lat");
    const latLng = ev.latLng;
    this.setState({
      locationLat: latLng.lat(),
      locationLng: latLng.lng()
    });
  }


  render(){


    return(
      <div >

        <div className = "topBarArea">
        {/*Navigation Top Bar */}
            <nav className ="navbar navbar-default header1">
              <div className ="container-fluid">
                <div className ="navbar-header">
                  <a className ="navbar-brand" href="#">Locations List</a>
                </div>

                <LocationHeader onChoose = {this.chooseOption}/>
                <button onClick ={()=>{

                  this.setState({
                    filterByGroups: !this.state.filterByGroups
                  });



                }}>Switch Filter by groups</button>

              </div>
            </nav>
          </div>

          <div style = {{paddingBottom: "100px"}}></div>

          <div className = "mainEntityArea">
              {/*The CRUD action view */}
              <div className = "crudView1" >


                {this.displayActionView()}

              </div>


              {/*<h1>Locations List</h1>
                Here all started :)
                */}
              <br/>

              <div >{this.displayLocations()}</div>
          </div>
</div>
    )
  }

}
