import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import '../css/toast.css';

export default function NotifToast(props) {
  const { msg, canShow, setShow } = props;
  return(<>
    <ToastContainer position="top-center" className="p-3">
      <Toast className='notif-toast' onClose={() => setShow(false)} show={canShow} delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>
          <strong>{msg}</strong> 
        </Toast.Body>
      </Toast>
    </ToastContainer>

  </>);
}