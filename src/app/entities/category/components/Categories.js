import React from 'react';
//import { Link, Router } from 'react-router-dom'

import {Category} from './Category';
import {CATEGORIES_MOCK} from '../Mocks';
import {DBServices} from '../../globalServices/DBServices';
import {CategoryHeader} from '../CategoryHeader'

export class Categories extends React.Component{

  constructor(props){
    super();
    console.log("Categories Component Has Created");
    //States:
    this.state = {
      currentId : -1,
      categoryName: "",
      actionView: ''



    }


    //data name - for using with the get/save db services
    this.dataName = "categories";
    //Different settings style:
    this.styles = {

      choosed1: {backgroundColor: "black"}

    };

    //Id's generator for assign the general using
    this.idGenerator = require("uuid/v1");

    //Inner CRUD Views
    this.updateView = (()=>{
      return(
      <div>

      <label>
      <h4>Update Category:</h4>
        Name:<br/>
        <input type = "text" value = {this.state.categoryName} onChange = {this.handleChange}
        name = "categoryName"
        />

      </label>
      <br/>
      <button onClick = {() => this.updateCategory()}>Save</button>
      </div>)
    });

    this.deleteView = (()=>{
      return(
      <div>
      <h1>deleteView to remove at the end</h1>

      <button onClick = {() => this.deleteCategory()}>Delete</button>
      </div>)
    });

    //Inner CRUD Views
    this.createView = (()=>{
      return(
      <div>

      <label>
      <h4>Create New Category</h4>
        Name: <br/>
        <input type = "text" value = {this.state.categoryName} onChange = {this.handleChange}
        name = "categoryName"
        />
      </label>
      <br/>
      <button onClick = {() => this.createCategory()}>Create New</button>
      </div>)
    });


    this.test1 = "testMe;"

    //Array that contain all data of categories
    this.categoriesData = {};

    //DB Service Object
    this.dbService = new DBServices();

    //if storgae null - getting initial data
    if (this.dbService.getData(this.dataName) == null){
      console.log("Storgae Empty - set an initial Data ");
      this.categoriesData = CATEGORIES_MOCK;
      const categoriesData = Array.from(CATEGORIES_MOCK);
      this.dbService.saveData(this.dataName,categoriesData );

    }

    //get data from the storgae
    else{
      console.log("Storgae Not null");

      //convert Array to Map object before getting from the localStorage
      //(alot implementation here is by Map functions...)
      const categoriesData = this.dbService.getData(this.dataName);
      this.categoriesData = new Map(categoriesData);
    }

    //Bind functions:
    this.displayCategories = this.displayCategories.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
    this.displayActionView = this.displayActionView.bind(this);
    this.inputNotEmpty = this.inputNotEmpty.bind(this);

  }//End Of constructor






  componentDidMount(){


  }

  //Display all categories
  displayCategories(){
    //Convert the Map data object into array for running it Array.map iterate functions
    let arr = Array.from(this.categoriesData);
    //console.log("arr");
    //console.log(arr);

    //Sorting the array by alphabetically order. I keep the original array as is, for future possible using.
    let sortedList  = arr.slice(0);
    //console.log(sortedList);

    //sort the data alphabetically
    sortedList.sort(function(a, b){

      let elA = a[1].toUpperCase();
      let elB = b[1].toUpperCase();

      if (elA > elB){return 1;}
      else if (elA < elB ){return -1};
      return 0 ;
    });

     //sortedList
    let view = sortedList.map((item)=>

      <div key = {item[0]} className = "itemStyle1"
        style  = {this.state.currentId === item[0] ?  this.styles.choosed1: null}>

        <div  >
          <Category data = {
            {name: item[1],id: item[0]}
          }

          onClick1 = {this.onCategoryClick}
          />
        </div>
      </div>
    );

    return view;
  }

  //What's happen when category clicked
  onCategoryClick(id){

    //Assign to state the category data from the local data Map
    var categoryName = this.categoriesData.get(id);

    this.setState({

      currentId: id,
      categoryName: categoryName,
      toRender: true,
    });
  }

  //CRUD ACTIONS
  //update
  updateCategory(){
    if(!this.inputNotEmpty()){
      console.log("error - action didn't accomplished")
      return;
    }
    this.categoriesData.set(this.state.currentId, this.state.categoryName);
    this.setState({
      toRender: true
    });

    //Save data to storage
    const categoriesData = Array.from(this.categoriesData);
    this.dbService.saveData(this.dataName,categoriesData );


  }

  //Delete
  deleteCategory(){
    this.categoriesData.delete(this.state.currentId);
    this.setState({
      toRender: true
    });
    //Save data to storage
    const categoriesData = Array.from(this.categoriesData);
    this.dbService.saveData(this.dataName,categoriesData );

  }

  //Create New
  createCategory(){

  if(!this.inputNotEmpty()){
    console.log("error - action didn't accomplished")
    return;
  }

  //Generates new Id for new component
  const id = this.idGenerator();
  this.setState({
    currentId : id
  });

  this.categoriesData.set(id, this.state.categoryName);
    this.setState({
      toRender: true,
      categoryName: ""//reset the category data
  });

    //Save data to storage
    const categoriesData = Array.from(this.categoriesData);
    this.dbService.saveData(this.dataName,categoriesData );

  }

  //What's happen when one of the CRUD options clicked
  chooseOption = (thisEl)=>{
    this.setState({
      actionView: thisEl
    });
    if (thisEl === "create"){

      this.setState({
        categoryName: ""
      });
    }
    else if(thisEl === "delete"){
       this.deleteCategory();
    }
    else if (thisEl === "display"){
      //Nothing to do, because the view sets in "displayActionView()"
    }
  }

  //Handle input changes - in each input u just need to make its name attribute corrsespond to the
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

      const data =  {name: this.state.categoryName , id:this.state.currentId};
      view = <h4><Category data = {data}/></h4>
      //this.setState();

    }

    else if (choosed === 'delete'){
      view = (
      <div>
      <h4>Category has deleted</h4>

    </div>)
      ;
    }

    else{
      view = (
      <div>
      <h4>Get Start -</h4>
      <p> You can choose category from the list, and manage it, or create new.
      pay attnetion that when you delete categroy, if it's assigned to location, now it
      will categorized as no - category </p>
    </div>)
      ;
    }

    return view;
  };

  //inputs validation()
  inputNotEmpty(){
    const values = this.state;
    const testedInputs = [values.categoryName];
    //var text = "   ";
    //text.trim().length == 0;
    for(let str of testedInputs){

      if(!(str && str.trim().length > 0)){
        alert("All inputs must be filled");
        return false;
      }
    }
    return true ;//All inputs are filled
  }

  //U here
  render(){

    return(
      <div >
      {/*Navigation Top Bar */}
        <div className = "topBarArea">
            <nav className="navbar navbar-default header1">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Categories List</a>
                </div>

                <CategoryHeader onChoose = {this.chooseOption}/>
              </div>
            </nav>
          </div>

          <div style = {{paddingBottom: "100px"}}></div>
          <div className ="mainEntityArea">
            {/*The CRUD action view */}
            <div className = "crudView1" >


              {this.displayActionView()}

            </div>


            {/*<h1>Categories List</h1>
              Here all started :)
              */}
            <br/>

            <div >{this.displayCategories()}</div>

         </div>
</div>
    )
  }

}
