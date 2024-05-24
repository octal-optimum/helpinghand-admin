import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { useDispatch } from "react-redux";
import { Logout } from "../../utils/helpers/Logout";
import { GetPartnerDocuments, VerifyPartner } from "../../store/slices/verifypartner";
import DocumentModal from "../../utils/helpers/Modals/DocumentsModal";

function GetpartnersDocuments() {
  const { id } = useParams();
  const [totaldata, setTotaldata] = useState();
  const [partner, setPartners] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const[documentsImg,setDocumentsImg] = useState();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    Logout();
  }, []);

  useEffect(() => {
    getPartnersdocuments();
  }, [dispatch]);

  const getPartnersdocuments = () => {
    const item = {
      userId: id,
    };
    setLoading(true);
    dispatch(GetPartnerDocuments(item))
      .unwrap()
      .then((data) => {
        console.log(data);
        setPartners(data?.partners[0]);
        setTotaldata(data?.partners?.totalDataCount);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {});
  };


  const handleviewDocuments = (img) =>{
    setShowModal(true);
    setDocumentsImg(img);
   }
   

  const VerifyDocuments =()=>{
    const item={
        userId:partner.userId
    }
    dispatch(VerifyPartner(item))
    .unwrap()
    .then((data) => {
        console.log(data)
        console.log(data?.partners?.message)
     alert(data?.partners?.message);
     getPartnersdocuments()
   
    })
    .catch(({ message }) => {

        alert(message)
    });
  }

  return (
    <>
      <DocumentModal  showModal={showModal}
        setShowModal={setShowModal}  image={documentsImg} />
         <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
                  <div
                    className="text-start my-2 ms-1"
                    style={{ fontWeight: "600" }}
                  >
                    <Link to="/">Home</Link>&nbsp;&#8811;
                    <Link to="/partners">Partners</Link>&nbsp;&#8811;Partner
                    Documents
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title-wrap bar-success d-flex align-items-center">
                        <h4 className="card-title">Partner Documents</h4>
                      </div>
                    </div>
                    <div className="card-body collapse show">
                      <div className="card-block card-dashboard table-responsive">
                        <div className="card-body collapse show">
                          <div className="card-block card-dashboard table-responsive">
                            {loading ? (
                              <Col lg={12} xs={12} md={12} align="center">
                                {ShowSkeleton()}
                              </Col>
                            ) : !partner?.id ? (
                              <div className="mt-4 text-center card-body collapse show pb-3">
                                <h5> No Documents were uploaded </h5>
                              </div>
                            ) : (
                              <div>
                                {partner?.isDocumentsVerified ? (
                                  ""
                                ) : (
                                  <div className="d-flex justify-content-end">
                                    <button className="btn saveBtn1 ms-2" onClick={VerifyDocuments}>
                                      Verify Documents
                                    </button>
                                  </div>
                                )}
                                <div className="row mt-2">
                                  <div
                                    style={{ height: "100%" }}
                                    className="col-md-6 col-sm-12 mt-2"
                                  >
                                    <h4 className="label">Adhaar Image</h4>
                                    <img
                                      style={{
                                        width: "80%",
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                      }}
                                      src={partner?.aadharImageUrl}
                                      onClick={()=>handleviewDocuments(partner?.aadharImageUrl)}

                                    />
                                  </div>
                                  <div
                                    style={{ height: "100%" }}
                                    className="col-md-6 col-sm-12 mt-2"
                                  >
                                    {" "}
                                    <h4 className="label">Pancard Image</h4>
                                    <img
                                      style={{
                                        width: "80%",
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                      }}
                                      src={partner?.pancardImageUrl}
                                      onClick={()=>handleviewDocuments(partner?.pancardImageUrl)}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Container>
        </div>
      </React.Fragment>
    </>
  );
}

export default GetpartnersDocuments;
