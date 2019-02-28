import React from 'react';
import {Category} from '../category/components/Category'
import {GetDataServices} from './GetDataServices'

export class EntitiesServices extends React.Component{

  constructor(props){
    super()
    //console.log("EntitiesServices");
    this.iDsToCategories = this.iDsToCategories.bind(this);
    this.dao = new GetDataServices();
    this.arr = [];
  }
  //convert id's array into categories components array(assuming the values are updated...)
  iDsToCategories(ids){
    //check if ids is iterable.
    if(ids == null ){
      return "cateroeis id's values are error";
    }

    //console.log("ids to categories");
    const categoriesList = this.dao.getCategories().map;
    let categoriesComponents =[];
    for (let id of ids) {

      if(categoriesList.get(id) != null){
        categoriesComponents.push(<Category key = {id} data = {{name: categoriesList.get(id), id : id }} />  );
      }

    }
    //console.log("categoriesComponents",categoriesComponents[0].props.data.name);
    let sortedList = categoriesComponents.sort(function(a,b){
      let elA = a.props.data.name.toUpperCase();
      let elB = b.props.data.name.toUpperCase();

      if (elA > elB){return 1;}
      else if (elA < elB ){return -1};
      return 0 ;
    });

    //console.log("categoriesComponents", categoriesComponents);
    return sortedList;



  }
}
