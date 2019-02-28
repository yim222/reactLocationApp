//import React from 'react';

export class LocalStorageServices{

  ///get data
  getData(dataName){

    const dataArr = JSON.parse(localStorage.getItem(dataName));
    return dataArr;


  }
  //save data
  saveData(dataName, dataArr){

    localStorage.setItem(dataName, JSON.stringify(dataArr));

  }


}
