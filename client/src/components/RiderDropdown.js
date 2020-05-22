import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function RiderDropdown ({ logOut, user }) {
  return (
    <Navbar.Collapse>
      <NavDropdown title={user.first_name}>
        <LinkContainer to='/rider/request'>
          <NavDropdown.Item>Request a trip</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/rider'>
          <NavDropdown.Item>Trips</NavDropdown.Item>
        </LinkContainer>
        {/* <LinkContainer to='/rider/settings'>
          <NavDropdown.Item>Settings</NavDropdown.Item>
        </LinkContainer> */}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => logOut()}>Log out</NavDropdown.Item>
      </NavDropdown>
    </Navbar.Collapse>
  );
}

export default RiderDropdown;