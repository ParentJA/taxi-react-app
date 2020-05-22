import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function DriverDropdown ({ logOut, user }) {
  return (
    <Navbar.Collapse>
      <NavDropdown title={user.first_name}>
        <LinkContainer to='/driver'>
          <NavDropdown.Item>Trips</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => logOut()}>Log out</NavDropdown.Item>
      </NavDropdown>
    </Navbar.Collapse>
  );
}

export default DriverDropdown;