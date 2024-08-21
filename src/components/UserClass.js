import React from "react"

class UserClass extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy Data",
        location: "Default",
      }
    };
    //console.log(this.props.name + "Child Constructor")
  }
  async componentDidMount(){
    //console.log(this.props.name + "Child ComponentDidMount Call")
    //API Call
    const data = await fetch("https://api.github.com/users/AmitBhati0906");
    const json = await data.json();
    console.log(json);

    this.setState({
      userInfo: json,
    });
  }

render(){
 // console.log(this.props.name + "child Render")
  const {name, location, avatar_url} = this.state.userInfo;
  return ( <div className="user-card"> 
  <img src={avatar_url}></img>
  <h2>Name: {name}</h2>
  <h3>Location: {location}</h3>
  <h4>Contact: 800998978775</h4>
  </div>
  );
}
}
export default UserClass;