import React from 'react'
//import { Link } from 'react-router-dom'



export class CategoryHeader extends React.Component{

  constructor(props){
    super()
    this.state = {
      choosed: ""


    }
    this.openView = this.openView.bind(this);


  }
  openView(choosed){
    this.props.onChoose(choosed);
  }
  render(){
    let lightChoosed = ((thisEl)=>{

      if (this.state.choosed === thisEl){

        return  {backgroundColor:'#9C0C1E',color: 'blue'}
      }

      return  {backgroundColor:'initial'}
    });



    return (

          <ul className="nav navbar-nav">
            <li
            style =  {lightChoosed("create")}
            onClick = {()=>((
              this.setState({
                choosed: "create"
              }),
              this.openView("create") ))}
              ><a href="#">Create New</a></li>

            <li
             onClick = {()=>((
              this.setState({
                choosed: "update"
              }),this.openView("update")
              ))
          }
          style = {lightChoosed("update")}

          ><a href="#">Update </a></li>


          <li
           onClick = {()=>((
            this.setState({
              choosed: "delete"
            }),this.openView("delete")
            ))
        }
        style = {lightChoosed("delete")}

        ><a href="#">
            Delete</a></li>
            <li
             onClick = {()=>((
              this.setState({
                choosed: "displayItem"
              }),this.openView("display")
              ))
          }
          style = {lightChoosed("displayItem")}

          >
              <a href="#">View</a></li>

          </ul>

    )
  }

}
