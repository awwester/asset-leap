import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFrog } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

class HomeNav extends React.Component {
  state = { isOpen: false }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <Navbar className="landing-navbar" expand="md" fixed="top">
        <NavbarBrand>
          <FontAwesomeIcon icon={faFrog} size="2x" className="home-icon" />
          <h1 className="ml-5" children="Asset Leap" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle}>
          <FontAwesomeIcon icon={faBars} />
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button
                color="link"
                onClick={() => this.props.history.push('/auth/login')}
                children="Login"
              />
            </NavItem>
            <NavItem className="ml-4">
              <Button
                color="primary"
                outline
                onClick={() => this.props.history.push('/auth/register')}
                children="Get started"
              />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}


export default withRouter(HomeNav);
