//import React from 'react';
import {LocalStorageServices} from './LocalStorageServices';

export class DBServices {

  constructor(){
    const dbService = new  LocalStorageServices();
    //If you want to change the service type (to an actual DB -  for example - just change here ...)

    this.getData = (dataName)=>{

      return dbService.getData(dataName);

    };

    this.saveData = (dataName, dataArr)=>{

      dbService.saveData(dataName, dataArr);
    }
  }

}
