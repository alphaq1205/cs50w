import React from "react";
import { Link,withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
 class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "", //test1@test.com
      password: "", //123456
      token: "",
      loading: false,
      loginStatus: false
    };
  }


  submit = () => {

    this.setState({ loading: true });
    let {username, password} = this.state

    let formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)

    let url = 'http://127.0.0.1:8000/login'
    fetch(url, {
      method: "POST",
      body:formData 
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        alert(response.message)
        if(response.status == 'true'){
          this.setState({loginStatus:true})
        }
      })
      .then(() => {
        let key = Math.random()
        if(this.state.loginStatus){
          
          localStorage.setItem('key',key)
          localStorage.setItem('email',this.state.username)
          this.props.history.push("/homepage")
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
                Login
                <Card.Title className="text-muted mt-1">
                   IOT Dashboard
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
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
                    {this.state.loading && <span>Signing In</span>}
                    {!this.state.loading && <span>Sign In</span>}
                  </Button>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                <Row>
                  <Col>
                    <Link to="/">Home</Link>
                  </Col>
                  <Col className="text-sm-right" sm={{ span: 8 }}>
                    No account?
                    <Link to="/registration" id="custom-link">
                      {" "}
                      Register
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

export default withRouter(Login)
