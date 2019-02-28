import React from 'react';

//Components and etc imports
import MainMenu from './MainMenu'
import MainRouter from '../routing/AppRouter'

export class MainView extends React.Component{

  constructor(props){
    super();

  }

  render(){


    return (
      <div >



<div className = "container-fluid">
  <div className = "row content">
    <div className = "col-sm-8 sidenav mainArea">

      <MainRouter/>
      <footer className = "container-fluid ">
        <MainMenu/>
      </footer>
    </div>



    <div className = "col-sm-4 sideArea">
    <h4>Side Area</h4>
  </div>
  </div>

</div>




      </div>
  );
  }

}
