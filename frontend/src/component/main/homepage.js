import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import Header from "../common/header";
import { Table, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: "",
      loading: false,
      stillLogin: false,
      username: '',
      loading: ''
    };
  }

  componentWillMount = () => {

    let email = localStorage.getItem('email')
    let key = localStorage.getItem('key')
    if (key) {
      this.setState({ username: email })
    } else {
      alert('You are not logged in')
      this.props.history.push("/")
    }
  }

  componentDidMount = () => {
    this.getDeviceData()
  }

  getDeviceData = () => {
    let url = "http://127.0.0.1:8000/devices/"
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
        console.log(error)
        alert("Something went wrong please try again");
      })
  }

  deleteDeviceData = (id) => {
    this.setState({ loading: true })
    let url = 'http://127.0.0.1:8000/devices/' + id + '/'
    fetch(url, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((res) => {
        alert('Data deleted successfully')
        window.location.reload()
        this.setState({ loading: false });
      })
      .catch((error) => {
        alert('Something went wrong please try again')
        window.location.reload()
        this.setState({ loading: false });
      })
  }

  notEnabled = () => {
    alert('Please enable the device')
  }

  render() {

    let { data } = this.state
    
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
                  <th scope="col" className="text-center">Device Detail</th>
                  <th scope="col" className="text-center">Device Data</th>
                  <th scope="col" className="text-center">Is Enable</th>
                  <th scope="col" className="text-center">Edit</th>
                  <th scope="col" className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {

                  data.reverse().map((dta) => {
                    
                    return (
                      <tr>
                        <td>{dta.id}</td>
                        <td className="text-center">
                        { dta.enable ?
                          <Link className="btn btn-info btn-sm mr-1" to={`DeviceDetail/${dta.id}`}>
                          Detail
                        </Link>:
                        <Link className="btn btn-info btn-sm mr-1" onClick={this.notEnabled}>
                        Detail
                      </Link>
                  }
                        
                        </td>
                        <td className="text-center">
                          { dta.enable ?
                          <Link className="btn btn-info btn-sm mr-1" to={`singleDeviceData/${dta.id}`}>
                          Data
                        </Link>:
                        <Link className="btn btn-info btn-sm mr-1" onClick={this.notEnabled}>
                        Data
                      </Link>
                        }
                        </td>
                        <td className="text-center">{dta.enable == true ? <Spinner animation="grow" variant="success" /> : <Spinner animation="grow" variant="danger" />}</td>
                        <td className="text-center" className="text-center">
                          <Link className="btn btn-info btn-sm mr-1" to={`editDevice/${dta.id}`}>
                            Edit
                          </Link>
                        </td>
                        <td className="text-center">
                          <Link className="btn btn-info btn-sm mr-1" onClick={() => this.deleteDeviceData(dta.id)}>
                            {this.state.loading && (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            {this.state.loading && (
                              <span> Processing... </span>
                            )}
                            {!this.state.loading && <span> Delete</span>}

                          </Link>
                        </td>
                      </tr>
                    )
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