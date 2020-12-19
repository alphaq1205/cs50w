import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import Header from "../common/header";
import { Table, DropdownButton, Dropdown, DropdownType } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";
import { fields } from '../../constants/constants'

//import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      fieldData: null,
      token: "",
      loading: false,
      stillLogin: false,
      username: '',
      devicId: '',
      fieldNameOne: '',
      fieldNameTwo: '',
      fieldNameThree: '',
      getDeviceDataId: ''
    }
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
    this.getDeviceSingleData()
    this.getDeviceSingleDetail()
    this.getFieldData()
  }

  getDeviceSingleData = () => {
    let url = "http://127.0.0.1:8000/deviceData/"
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        response.map((data) => {
          if (data.deviceID == this.state.devicId) {
            this.setState({ getDeviceDataId: data.id })
          }
        })
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      })
  }

  getDeviceSingleDetail = () => {
    let url = 'http://127.0.0.1:8000/devices/' + this.state.devicId + '/'
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        this.setState({ data: response })
        fields.find((element) => {
          
          if (element.value == response.fieldTypeOne) {
            this.setState({ fieldNameOne: element.text })
          } 
          if (element.value == response.fieldTypeTwo) {
            this.setState({ fieldNameTwo: element.text })
          } 
          if (element.value == response.fieldTypeThree) {
            this.setState({ fieldNameThree: element.text })
          }
        })

      })
      .catch((error) => {
        console.log(error)
        alert("Something went wrong please try again");

      })
  }

  getFieldData = () => {
    let url2 = 'http://127.0.0.1:8000/field/'
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
        console.log(error)
        alert("Something went wrong please try again");

      })
  }





  render() {
    let { data, fieldData, fieldNameOne, fieldNameTwo, fieldNameThree, devicId, username, getDeviceDataId } = this.state

    return (
      <AdminLayout>
        <Row>
          <Col md={{ span: 2 }}>
            <h2>Dashboards</h2>

          </Col>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm" responsive="sm" id="table-to-xls">
              <thead>
                <tr>
                  <th scope="col">Device ID</th>
                  <th scope="col">Device Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Device ID</td>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <td>Device Name</td>
                  <td>{data.deviceName}</td>
                </tr>
                <tr>
                  <td>Read Device Data</td>
                  <td><a href={"http://127.0.0.1:8000/deviceData/" + username + "/" + devicId}>{"http://127.0.0.1:8000/deviceData/" + username + "/" + devicId}</a></td>
                </tr>
                <tr>
                  <td>Write Device Data</td>
                  <td><a href={"http://127.0.0.1:8000/deviceData/" + username + "/" + devicId}>{"http://127.0.0.1:8000/deviceData/" + username + "/" + devicId}</a></td>
                </tr>
                <tr>
                  <td>Field Type One</td>
                  <td>{fieldNameOne}</td>
                </tr>
                <tr>
                  <td>Field Name One</td>
                  <td>{data.fieldNameOne}</td>
                </tr>

                <tr>
                  <td>Field Type Two</td>
                  <td>{fieldNameTwo}</td>
                </tr>

                <tr>
                  <td>Field Name Two</td>
                  <td>{data.fieldNameTwo}</td>
                </tr>

                <tr>
                  <td>Field Type Three</td>
                  <td>{fieldNameThree}</td>
                </tr>

                <tr>
                  <td>Field Name Three</td>
                  <td>{data.fieldNameThree}</td>
                </tr>



                <tr>
                  <td>Description</td>
                  <td>{data.description}</td>
                </tr>

                <tr>
                  <td>Remote IP</td>
                  <td>remoteIP...</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}

export default withRouter(Homepage)