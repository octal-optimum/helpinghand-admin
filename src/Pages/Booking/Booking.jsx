import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Col ,Container,Table} from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { GetAllBookings } from "../../store/slices/booking";

function Booking() {
  const teamHeaders = [
    "UerId",
    "ServiceId",
    "Price",
    "PaymentStatus",
    "Get partners",
  ];
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
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
    setLoading(true);
    const item = {
      limit: itemsPerPage,
      page: currentPage,
    };
    dispatch(GetAllBookings(item))
      .unwrap()
      .then((data) => {
        setBookings(data?.bookings);
        setTotaldata(data?.bookings?.totalDataCount);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {});
  };

  const handleGetPartners = (id) => {
    navigate(`/get-relevant-providers/${id}`);
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
                    <Link to="/dashboard">Home</Link>&nbsp;&#8811; Bookings
                  </div>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title-wrap bar-success d-flex align-items-center">
                        <h5 className="card-title">Bookings</h5>
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
                            ) : !bookings?.length ? (
                              <div className="mt-4 text-center card-body collapse show pb-3">
                                <h5>No Bookings were found.</h5>
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
                                  {bookings?.map((item, index) => (
                                    <tr key={index}>
                                      <td className="text-center align-middle">
                                        {item.userId}
                                      </td>
                                      <td className="text-center align-middle">
                                        {item.serviceId}
                                      </td>
                                      <td className="text-center align-middle">
                                        {item.finalPrice}
                                      </td>
                                      <td className="text-center align-middle">
                                        {item.paymentStatus === 1
                                          ? "Compleated"
                                          : "Pending"}
                                      </td>
                                      <td className="text-center align-middle">
                                        <Button
                                        color="primary"
                                        className="btn font-14 btn-primary btn-sm waves-effect m-2 waves-light w-10"
                                          onClick={() =>
                                            handleGetPartners(item._id)
                                          }
                                        >
                                          Get Sevice Providers
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
                          {totaldata / itemsPerPage > 1 && (
                            <div className="mt-5 d-flex justify-content-end align-right">
                              <ReactPaginate
                                key={currentPage}
                                previousLabel="<"
                                nextLabel=">"
                                breakLabel="..."
                                breakLinkClassName={"page-link"}
                                pageCount={Math.ceil(totaldata / itemsPerPage)}
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

export default Booking;
