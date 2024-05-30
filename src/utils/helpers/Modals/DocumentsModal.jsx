import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";

function DocumentModal({ showModal, setShowModal, image }) {
  const handleCloseModal = () => setShowModal(false);

  return (
    <Modal
      isOpen={showModal}
      toggle={handleCloseModal}
      centered
    >
      <ModalBody  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center" }}>
          <img style={{ height: "80vh", width: "100%" }} src={image} alt="Document" />
        </div>
        <button className="d-flex align-outline-center btn btn-danger" style={{ marginTop: "25px" }} onClick={handleCloseModal}>
          Cancel
        </button>
      </ModalBody>
    </Modal>
  );
}

export default DocumentModal;
