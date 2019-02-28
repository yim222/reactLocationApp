//import React from 'react'
import {CATEGORIES_MOCK} from '../category/Mocks.js'
import {LOCATIONS_MOCK} from '../location/Mocks.js'
import {DBServices} from './DBServices'
import {LocationServices} from '../location/services/LocationServices'
export class GetDataServices {
  constructor(){
    this.dbServices = new DBServices();
    this.locationServices = new LocationServices();

    this.getCategories = () =>{
      //Array that contain all data of categories
      let categoriesData = {};
      let dataName = "categories";

      //DB Service Object
      let dbService = new DBServices();

      //if storgae null - getting initial data
      if (dbService.getData(dataName) == null){
        console.log("Categoreis Storgae Empty - set an initial Data ");

        categoriesData = Array.from(CATEGORIES_MOCK);
        this.dbServices.saveData(dataName,categoriesData );

      }

      //get data from the storgae
      else{
        console.log("Categoreis Storgae Not null");

        //convert Array to Map object before getting from the localStorage
        //(alot implementation here is by Map functions...)

      }

      const categoriesDataArr = dbService.getData(dataName);
      //Adding deleted/default Category
      categoriesDataArr.push([this.locationServices.defaultId,"Default/Deleted Category"]);

      const categoriesDataMap = new Map(categoriesDataArr);
      return {arr : categoriesDataArr, map: categoriesDataMap};



    }

    //Get location and filter it well
    this.getLocations = () =>{
      //Array that contain all data of categories
      let locationsDataArr = {};
      let dataName = "locations";
      //get the data of current categories for comparing the location assigned categories.
      const categoriesData = this.getCategories();


      //DB Service Object
      let dbService = new DBServices();

      //if storgae null - getting initial data
      if (dbService.getData(dataName) == null){
        console.log("Locations Storgae Empty - set an initial Data ");

        locationsDataArr = Array.from(LOCATIONS_MOCK);
        this.dbServices.saveData(dataName,locationsDataArr );

      }

      //get data from the storgae
      else{
        console.log("Locations Storgae Not null");

      }

      //get the updated data
      locationsDataArr = dbService.getData(dataName);

      //Filter the null catergories ID's (for case the cateory has removed)
      locationsDataArr = this.locationServices.cleanNullCategories(categoriesData.map, locationsDataArr);

      //Save the filtered data
      this.dbServices.saveData(dataName,locationsDataArr );

      //create map from the array
      const locationsDataMap = new Map(locationsDataArr);

      //return them both for the prefared using.
      return {arr : locationsDataArr, map: locationsDataMap};



    }

  }


}
