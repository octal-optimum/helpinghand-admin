import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Button } from "reactstrap";
import { useDispatch } from "react-redux";

function DocumentModal({ showModal, setShowModal,image }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState();
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Modal
       
        centered
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Body >
          <div style={{height:"80vh",width:"100%",display:"flex",justifyContent:"center"}}>
            <img  style={{height:"80vh",width:"100%",}} src={image} />
          </div>
          <Button className="cancel_btn" style={{marginTop:"25px"}}  onClick={handleCloseModal} >
            Cancel
          </Button>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DocumentModal;
