import React, { Component } from 'react';
import { Navbar as BSNavbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './css/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Navbar extends Component {
 
  render() { 
    return (<>
      <BSNavbar expand='lg' className='navbar' fixed='top'>
        <Container fluid className='navbar-container'>
          <Button className='setting-btn'>
            <FontAwesomeIcon icon="fa-solid fa-gear" style={{color: '#515151', fontSize: '1.4em'}} />
          </Button>
          
        </Container>
      </BSNavbar>
    </>);
  }
}

export default Navbar;