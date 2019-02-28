import React from 'react';
//import { Link, Router } from 'react-router-dom'


export class Category extends React.Component{

  constructor(props){
    super();


  }

  render(){
    return(
      <div onClick = {(this.props.onClick1 ==null ? (e)=> e.preventDefault() :()=> this.props.onClick1(this.props.data.id))} >

             <span>Category - {this.props.data.name} </span>
      </div>

    )
  }

}
