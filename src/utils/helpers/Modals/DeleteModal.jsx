import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, ModalBody, Button } from "reactstrap";
import { useDispatch } from "react-redux";

function DeleteModal({ showModal, setShowModal, handleDelete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState();
  const handleCloseModal = () => setShowModal(false);

  console.log(showModal);
  return (
    <Modal
      isOpen={showModal}
      toggle={handleCloseModal}
      centered
    >
      <ModalBody className="d-flex flex-column justify-content-center align-items-center" style={{ height: "200px" }}>
        <h5 className="mt-3 mb-4">Are you sure to delete?</h5>
        <div className="d-flex">
        <button  color="primary"
         className="btn font-14 btn-outline-info waves-effect m-2 waves-light" style={{ marginRight: "5px" }} onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="btn font-14 btn-danger waves-effect m-2 waves-light" onClick={handleDelete}>
          Delete
        </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default DeleteModal;
