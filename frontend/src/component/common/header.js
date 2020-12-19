import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {Container, NavDropdown, Navbar, Nav, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

 class Header extends Component {
  
  constructor(){
    super()
    this.state={
      email:'',
      key:''
    }
  }
  componentWillMount=()=>{
    let email = localStorage.getItem('email')
    let key = localStorage.getItem('key')
    if(email){
      this.setState({username:email})
    }else{
      console.log('something went wrong please try again')
    }
  }

  logout = () => {
       localStorage.clear();
       alert('You are not logged in')
      this.props.history.push("/")
     };

  render() {
    return (
      <Container fluid className="my-2">
        <Navbar>
  
  <Navbar.Collapse className="justify-content-end">
  
    <Navbar.Text>
    <Col xs={6} md={4}>
      <Image src="../../images/testpicture.jpg" roundedCircle />
    </Col><br/>
    <a href="#">{this.state.username}</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
      </Container>
    );
  }
}


export default withRouter(Header)
