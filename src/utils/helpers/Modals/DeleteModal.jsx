import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Button } from "reactstrap";
import { useDispatch } from "react-redux";

function DeleteModal({ showModal, setShowModal, handleDelete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState();
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Modal
        // style={{ marginTop: "10%", height: "210px" }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen={true}
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Body>
          <h5 className="mt-3 mb-4">Are you sure to delete?</h5>
          <Button className="cancel_btn" style={{marginRight:"5px"}}  onClick={handleCloseModal} >
            Cancel
          </Button>
          <Button className="apply_btn ms-2" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
