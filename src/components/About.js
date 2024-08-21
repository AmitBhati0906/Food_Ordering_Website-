import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";
class About extends React.Component{
  constructor(props){
    super(props); 
   // console.log("Parent Constructor");
  }
  componentDidMount(){
   // console.log("Parent ComponentDidMount Call")
  }
  render(){
   // console.log("parent Render");
    return (
      <div>
        <h1>About class</h1>
        <div>
          <UserContext.Consumer>
            {({loggedInUser}) => <h1 className="text-xl font-bold">{loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <h2>This is About Section</h2>
        <UserClass name={"AMIT BHATI "}/>
      </div>
    );
  };
  }
  

export default About;