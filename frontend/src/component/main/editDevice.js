import React from "react";
import AdminLayout from "./AdminLayout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Card, InputGroup, FormControl, ThemeProvider } from "react-bootstrap";
import { fields } from '../../constants/constants'

export default class AddDevice extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      deviceName: '',
      tags: '',
      websiteAddress: '',
      gitWebsiteAddress: '',
      showLocation: '',
      videoAddress: '',
      fieldTypeOne: 2,
      fieldNameOne: '',
      fieldTypeTwo: 2,
      fieldNameTwo: '',
      fieldTypeThree: 2,
      fieldNameThree: '',
      description: '',
      enable: false,
      response: false,
      username: '',
      deviceId: '',
      user: '',
      devicId: ''
    };
  }

  componentWillMount = () => {
    let email = localStorage.getItem('email')
    let deviceId = this.props.match.params.id;
    let key = localStorage.getItem('key')
    if (key) {
      this.setState({ username: email, devicId: deviceId })
    } else {
      alert('You are not logged in')
      this.props.history.push("/")
    }
  }

  componentDidMount = () => {
    this.getFields()
    this.getDeviceSingleData()
  }

  getDeviceSingleData = () => {
    let url = 'http://127.0.0.1:8000/devices/' + this.state.devicId + '/'
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((responseJson) => responseJson.json())
      .then((res) => {
      //  console.log(res)
        this.setState({
          description: res.description,
          deviceName: res.deviceName,
          enable: res.enable,
          fieldNameOne: res.fieldNameOne,
          fieldNameTwo: res.fieldNameTwo,
          fieldNameThree: res.fieldNameThree,
          fieldTypeOne: res.fieldTypeOne,
          fieldTypeTwo: res.fieldTypeTwo,
          fieldTypeThree: res.fieldTypeThree,
          response: res.response,
          user: res.user
        })
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      })
  }

  getFields = () => {
    let url2 = 'http://127.0.0.1:8000/field/  '
    fetch(url2, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        this.setState({ fieldData: response })
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      })
  }

  submit = () => {
    let { username, deviceName, fieldTypeOne, fieldNameOne, fieldTypeTwo, fieldNameTwo, fieldTypeThree, fieldNameThree, description, deviceId, enable, response, devicId } = this.state
    this.setState({ loading: true });
    let url = 'http://127.0.0.1:8000/devices/' + devicId + '/'
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: username,
        deviceName: deviceName,
        fieldTypeOne: fieldTypeOne,
        fieldNameOne: fieldNameOne,
        fieldTypeTwo: fieldTypeTwo,
        fieldNameTwo: fieldNameTwo,
        fieldTypeThree: fieldTypeThree,
        fieldNameThree: fieldNameThree,
        description: description,
        enable: enable,
        response: response
      }),
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        alert("Data Updated successfully");
      }).then(() => {
        this.props.history.push("/homepage");
        this.setState({ loading: false });
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      });
  };

  render() {

    let { deviceName, fieldTypeOne, fieldNameOne, fieldTypeTwo, fieldNameTwo, fieldTypeThree, fieldNameThree, description, enable, response } = this.state

    return (
      <AdminLayout>
        <Row>
          <Col md={{ span: 12 }}>
            <Card>
              <Card.Header>Edit Device</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label>deviceName</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Device Name"
                        value={deviceName}
                        onChange={(e) =>
                          this.setState({ deviceName: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>1. Field Type</Form.Label>
                      <Form.Control as="select" value={fieldTypeOne} onChange={(e) => this.setState({ fieldTypeOne: e.target.value })}>
                        {
                          fields.map((dta) => {
                            return (
                              <option value={dta.value}>{dta.text}</option>
                            )
                          })

                        }
                      </Form.Control>

                    </Form.Group>

                    <Form.Group>
                      <Form.Label>1. Field Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Field Name One"
                        value={fieldNameOne}
                        onChange={(e) =>
                          this.setState({ fieldNameOne: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>2. Field Type</Form.Label>
                      <Form.Control as="select" value={fieldTypeTwo} onChange={(e) => this.setState({ fieldTypeTwo: e.target.value })}>
                        {
                          fields.map((dta) => {
                            return (
                              <option value={dta.value}>{dta.text}</option>
                            )
                          })

                        }</Form.Control>

                    </Form.Group>

                    <Form.Group>
                      <Form.Label>2. Field Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Field Name Two"
                        value={fieldNameTwo}
                        onChange={(e) =>
                          this.setState({ fieldNameTwo: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>3. Field Type</Form.Label>
                      <Form.Control as="select" value={fieldTypeThree} onChange={(e) => this.setState({ fieldTypeThree: e.target.value })}>
                        {
                          fields.map((dta) => {
                            return (
                              <option value={dta.value}>{dta.text}</option>
                            )
                          })

                        }</Form.Control>

                    </Form.Group>

                    <Form.Group>
                      <Form.Label>3. Field Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="Field Name Three"
                        value={fieldNameThree}
                        onChange={(e) =>
                          this.setState({ fieldNameThree: e.target.value })
                        }
                      />
                    </Form.Group>


                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3} value={description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Enable</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          {enable == true ?
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" value={enable} onClick={(e) => this.setState({ enable: e.target.checked })} checked /> : <InputGroup.Checkbox aria-label="Checkbox for following text input" value={enable} onClick={(e) => this.setState({ enable: e.target.checked })} />
                          }
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Response</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Checkbox aria-label="Checkbox for following text input" value={response} onClick={(e) => this.setState({ response: e.target.checked })} />
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Form.Group>


                    <div className="text-right">
                      <Button
                        variant="primary"
                        type="button"
                        className="btn-sm"
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
                        {this.state.loading && (
                          <span> Updating device data...</span>
                        )}
                        {!this.state.loading && <span> Update</span>}
                      </Button>
                    </div>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}
