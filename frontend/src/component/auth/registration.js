import React from "react";
import { Link, withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

 class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2:'',
      registerStatus:false
    };
  }

  submit = () => {
    this.setState({ loading: true });
    
    let {email, name, password, password2} = this.state
    console.log(email)
    console.log(password)
    console.log(name)
    console.log(password2)

    let formData = new FormData();
    formData.append('username', email)
    formData.append('email',email)
    formData.append('password', password)
    formData.append('password2',password2)

    console.log(formData)
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    
    let url = 'http://127.0.0.1:8000/register'
    fetch(url, {
      method: "POST",
      
      body:formData 
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        alert(response.message)
        if(response.status == 'true'){
          this.setState({registerStatus:true})
        }
      })
      .then(() => {
        if(this.state.registerStatus){
          this.props.history.push("/login")
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      });
  };

  render() {
    return (
      <Container className="my-sm-5 my-2">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Header as="h1">
                Register
                <Card.Title className="text-muted mt-1">
                  IOT Dashboard
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter email"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter email"
                      value={this.state.password2}
                      onChange={(e) =>
                        this.setState({ password2: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    block
                    onClick={this.submit}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.state.loading && <span> Creating Account</span>}
                    {!this.state.loading && <span> CREATE ACCOUNT</span>}
                  </Button>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                <Row>
                  <Col>
                    <Link to="/">Home</Link>
                  </Col>
                  <Col className="text-sm-right" sm={{ span: 8 }}>
                    Already registered?
                    <Link to="/login" id="custom-link">
                      {" "}
                      Login
                    </Link>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default withRouter(Registration)