import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Modal} from 'react-bootstrap';
import { ImageAssets } from '../utils/ImageUtils';
import { useState } from 'react';

function Header({signOut}) {
  const [openModal, setModalStatus] = useState(false);
  const toggleModalStatus = () => setModalStatus(!openModal);
  const onSignOut = () => {
    toggleModalStatus();
    signOut();
  }
  return (
    <Navbar bg="dark" expand="md">
      <div className='container d-flex align-items-center justify-content-between w-100'>
        <Link to="/">
          <img src={ImageAssets.LOGO} className='nav-logo' alt='nav-logo' />
        </Link>
        <Nav className="mx-auto">
          <Link to="/" className='nav-menu me-3'>Home</Link>
          <Link to="/jobs" className='nav-menu'>Jobs</Link>
        </Nav>
        <Button onClick={toggleModalStatus}>Logout</Button>
      </div>
      {/* Confirmation Pop-up */}
      <Modal show={openModal} onHide={toggleModalStatus} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to signout ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModalStatus}>
            No
          </Button>
          <Button variant="primary" onClick={onSignOut}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;