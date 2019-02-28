import React from 'react';
import {Category} from '../category/components/Category'
export const LOCATIONS_MOCK = new Map ( [
  ["1", {
      name:"usa (Initial data )",
      address: "America",
      coordinates: {
        lat: 37.090240,
        lng: -55.712891
      },
      categoriesIDs : ["1","3"]
    }
  ],
  ["2", {
      name:"London (Initial data )",
      address: "England",
      coordinates: {
        lat: 32,
        lng: -9
      },
      categoriesIDs : ["2","3"]

    }
  ],
  ["3", {
      name:"Western Wall (Initial data )",
      address: "Jerusalem",
      coordinates: {
        lat: 66,
        lng: 15
      },
      categoriesIDs : ["1"]

    }
  ]
]);
export const LOCATIONS_MOCK_2 = new Map ( [
  ["1", "usa (Initial data )"],
  ["2", "Europe (Initial data )"],
  ["3", "Middle Easy (Initial data )"]

]);
export const testData =  {
  name: "Izhar",
  address:" ok ",
  coordinates:{
    lat:3,
    lng:4
  },
  categories: <Category data = {{name:"innerCategory"}}/>
};
