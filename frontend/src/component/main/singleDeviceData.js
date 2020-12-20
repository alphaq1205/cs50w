import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import Header from "../common/header";
import { Table, DropdownButton, Dropdown, DropdownType } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";

//import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      loading: false,
      stillLogin: false,
      username: '',
      deviceId: 12,
      DeviceData: [],
    }
  }




  componentWillMount = () => {
    let email = localStorage.getItem('email')
    let key = localStorage.getItem('key')
    let device_id = this.props.match.params.id;
    if (key) {
      this.setState({ username: email, deviceId: device_id })
    } else {
      alert('You are not logged in')
      this.props.history.push("/")
    }
  }

  componentDidMount = () => {
    this.getDeviceDetial()
    setInterval(()=>{
      this.getDeviceData()
    },1000)
  }

  getDeviceData = () => {
    let url = 'http://127.0.0.1:8000/deviceData/'
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        this.setState({ DeviceData: response })
      })
      .catch((error) => {
        alert("Something went wrong please try again");
      })
  }

  getDeviceDetial = () => {
    let url = 'http://127.0.0.1:8000/devices/'
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((responseJson) => responseJson.json())
      .then((response) => {
        this.setState({ data: response })
      })
      .catch((error) => {
       // console.log(error)
        alert("Something went wrong please try again");
      })
  }

  render() {
    let { data, DeviceData, username, deviceId } = this.state
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
                  <th scope="col">ID</th>
                  <th scope="col">Device ID</th>
                  {/* <th scope="col">Device</th> */}
                  <th scope="col">Field 1</th>
                  <th scope="col">Field 2</th>
                  <th scope="col">Field 3</th>
                  <th scope="col">Date</th>
                  <th scope="col">Remote IP</th>
                </tr>
              </thead>
              <tbody>
                {DeviceData.reverse().map((dat) => {
                  if (dat.username == username && dat.deviceID == deviceId) {
                    return (
                      <tr >
                        <td>{dat.id}</td>
                        <td>{dat.deviceID}</td>
                        {/* <td>{dat.deviceID}</td> */}
                        <td>{dat.fieldDataOne}</td>
                        <td>{dat.fieldDataTwo}</td>
                        <td>{dat.fieldDataThree}</td>
                        <td>{dat.date}</td>
                        <td>{dat.remoteIP}</td>
                      </tr>
                    )
                  }

                })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}

export default withRouter(Homepage)