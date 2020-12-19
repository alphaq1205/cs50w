import React, { Component } from "react";
import {
	ProSidebar,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
	Menu,
	MenuItem,
	SubMenu,
} from "react-pro-sidebar";

import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
//import img from "./../../img/sidebar-bg.jpg";
 class Sidebar extends Component {

	logout = () => {
		localStorage.clear();
		alert('You have been successfully logged out')
		this.props.history.push("/")
	};

	render() {
		return (
			<>
				<ProSidebar
					breakPoint="md"
					//image={img}
					id="sidebar-wrapper"
					className={`${this.props.open ? 'sidebar-opened' : 'sidebar-closed'}`}
				>
					<SidebarHeader>
						<div className="p-3">Welcome Admin!</div>
					</SidebarHeader>

					<SidebarContent>
						<Menu iconShape="square">
							<MenuItem>
								Dashboard
								<Link to="/homepage" />
							</MenuItem>
							<SubMenu title="Device">
								<MenuItem>
									Device Data
									<Link to="/deviceData" />
								</MenuItem>
								<MenuItem>
									Add New Device
									<Link to="/createDevice" />
								</MenuItem>
							</SubMenu>

							{/* <SubMenu title="MQTT">
								<MenuItem>
									Create MQTT
									<Link to="/homepage" />
								</MenuItem>
								<MenuItem>
									MQTT List
									<Link to="/homepage" />
								</MenuItem>
							</SubMenu> */}
						</Menu>
						<Button
							block
							variant="danger"
							type="button"
							className="my-2"
							onClick={this.logout}
						>
							Logout
						</Button>
					</SidebarContent>

					<SidebarFooter>

					</SidebarFooter>
				</ProSidebar>
			</>
		);
	}
}

export default withRouter(Sidebar)