import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../auth/login'
import Registration from '../auth/registration'
import FrontPage from '../common/frontPage'
import Homepage from '../main/homepage'
import CreateDevice from '../main/createDevice'
import DeviceData from '../main/deviceData'
import EditDevice from '../main/editDevice'
import DeviceDetail from '../main/deviceDetail'
import SingleDeviceData from '../main/singleDeviceData'

import ErrorPage from '../common/error'

export default class Routing extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Route exact path='/' component={FrontPage} />
                        <Route path='/login' component={Login} />
                        <Route path='/registration' component={Registration} />
                        <Route path='/homepage' component={Homepage} />
                        <Route path='/createDevice' component={CreateDevice} />
                        <Route path='/deviceData' component={DeviceData} />
                        <Route path='/editDevice/:id' component={EditDevice} />
                        <Route path='/DeviceDetail/:id' component={DeviceDetail} />
                        <Route path='/singleDeviceData/:id' component={SingleDeviceData} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Router>
            </>
        )
    }
}