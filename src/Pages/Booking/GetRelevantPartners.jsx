import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button, Col,Container,Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import {
  AllotPartner,
  CancelBooking,
  GetAllBookings,
  GetReleventPartners,
} from "../../store/slices/booking";

function GetReleventpartners() {
  const { id } = useParams();
  const teamHeaders = ["Name", "Mobile", "Geder", "distance", "Allot to user"];
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [relevantPartners, setRelevantPartners] = useState();
  const [totaldata, setTotaldata] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useSearchParams();
  const querypage = parseInt(search.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(querypage);
  const itemsPerPage = 10;
  const pagesToShowInitially = 3;
  const navigate = useNavigate();

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1 || currentPage;
    setCurrentPage(newPage);
    search.set("page", newPage);
    setSearch(search, { replace: true });
  };

  useEffect(() => {
    getBookings();
  }, [dispatch, itemsPerPage, currentPage]);

  const getBookings = () => {
    let item = {
      id: id,
    };
    dispatch(GetAllBookings(item))
      .unwrap()
      .then((data) => {
        setBookings(data?.bookings?.data[0]);
        GetParteners(data?.bookings?.data[0]);
      })
      .catch(({ message }) => {});
  };

  const GetParteners = (val) => {
    let item = {
      slots: val.slots,
      latitude: val.location.coordinates[0],
      longitude: val.location.coordinates[1],
    };
    setLoading(true);
    dispatch(GetReleventPartners(item))
      .unwrap()
      .then((data) => {
        setRelevantPartners(data?.partners);
        setTotaldata(data?.partners?.totalDataCount);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {});
  };

  const Cancelbooking = () => {
    const item = {
      bookingId: id,
    };
    dispatch(CancelBooking(item))
      .unwrap()
      .then((data) => {
        alert(data.bookings.message);
      })
      .catch(({ message }) => {});
  };

  const AllotoUser = (id2) => {
    const item = {
      partnerId: id2,
      bookingId: id,
    };
    dispatch(AllotPartner(item))
      .unwrap()
      .then((data) => {
        alert(data.partners.message);
        navigate("/bookings");
      })
      .catch(({ message }) => {});
  };

  return (
    <>
        <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
                  <div
                    className="text-start my-2 ms-1"
                    style={{ fontWeight: "600" }}
                  >
                    <Link to="/dashboard">Home</Link>&nbsp;&#8811;
                    <Link to="/bookings">Bookings</Link>&nbsp;&#8811; Relevant
                    Partners
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title-wrap bar-success d-flex align-items-center">
                        <h4 className="card-title">Relevant Partners</h4>
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
                            ) : !relevantPartners?.length ? (
                              <div>
                                <div className="d-flex justify-content-end">
                                  <Button
                                    className=" saveBtn ms-2"
                                    onClick={Cancelbooking}
                                  >
                                    Cancel Booking
                                  </Button>
                                </div>
                                <div className="mt-4 text-center card-body collapse show pb-3">
                                  <h5>No Matching Partners were found.</h5>
                                </div>
                              </div>
                            ) : (
                              <Table
                                responsive
                                hover
                                style={{ overflowX: "scroll" }}
                              >
                                <thead>
                                  <tr>
                                    {teamHeaders.map((header) => (
                                      <th
                                        className="text-center align-middle"
                                        key={header}
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {relevantPartners?.map((item, index) => (
                                    <tr key={index}>
                                      <td className="text-center align-middle">
                                        {item.name}
                                      </td>
                                      <td className="text-center align-middle">
                                        {item.mobileNo}
                                      </td>
                                      <td className="text-center align-middle">
                                        {item.gender}
                                      </td>
                                      <td className="text-center align-middle">
                                        {item.distance}
                                      </td>
                                      <td className="text-center align-middle">
                                        <Button
                                          color="primary"
                                          className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                                          onClick={() => AllotoUser(item._id)}
                                        >
                                          Allot to user
                                        </Button>
                                      </td>
                                      <td></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            )}
                          </div>
                        </div>
                        <div>
                          {relevantPartners?.length / itemsPerPage > 1 && (
                            <div className="mt-5 d-flex justify-content-end align-right">
                              <ReactPaginate
                                key={currentPage}
                                previousLabel="<"
                                nextLabel=">"
                                breakLabel="..."
                                breakLinkClassName={"page-link"}
                                pageCount={Math.ceil(
                                  relevantPartners?.length / itemsPerPage
                                )}
                                marginPagesDisplayed={0}
                                pageRangeDisplayed={pagesToShowInitially}
                                onPageChange={handlePageChange}
                                containerClassName="pagination"
                                activeClassName="active"
                                pageLinkClassName="page-link"
                                previousLinkClassName="page-link"
                                nextLinkClassName="page-link"
                                disabledClassName="disabled"
                                initialPage={currentPage - 1}
                              />
                            </div>
                          )}
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

export default GetReleventpartners;
