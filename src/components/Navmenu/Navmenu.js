import React from "react";
import { Dropdown, Nav, Navbar, Icon } from "rsuite";
import "./Navmenu.styles.css";

const Navmenu = ({ user, photo, logout }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <p className="navbar-brand logo">
          LOGO
        </p>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
        </Nav>
        <Nav pullRight>
          <Dropdown title={
              <div>
                  <span style={{marginRight: "5px"}}>{user}</span>
                  <img style={{borderRadius: "50px"}} width="25" src={photo} alt="" />
              </div>
          }>
            <Dropdown.Item>
                
                <span onClick={() => logout()}><Icon icon='sign-out' /> Logout</span>
            </Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default Navmenu;
