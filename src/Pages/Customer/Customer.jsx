import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button, Col, Container, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { useDispatch } from "react-redux";
import { getpartner } from "../../store/slices/category";
import DeleteModal from "../../utils/helpers/Modals/DeleteModal";
import { Logout } from "../../utils/helpers/Logout";
import {
  GetAllCustomers,
  GetAllPartners,
} from "../../store/slices/verifypartner";

function AllCustomers() {
  const teamHeaders = ["Name", "Image", "gender", "MobileNo", "Role"];
  const { id } = useParams();
  const [totaldata, setTotaldata] = useState();
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [search, setSearch] = useSearchParams();
  const querypage = parseInt(search.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(querypage);
  const [deletecustomerId, setDeletecustomerId] = useState();
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const pagesToShowInitially = 3;
  const navigate = useNavigate();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    Logout();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    getusers();
  }, [dispatch, itemsPerPage, currentPage]);

  const getusers = () => {
    const item = {
      limit: itemsPerPage,
      page: currentPage,
    };

    setLoading(true);
    dispatch(GetAllCustomers(item))
      .unwrap()
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
        setTotaldata(data?.customers?.totalDataCount);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {});
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1 || currentPage;
    setCurrentPage(newPage);
    search.set("page", newPage);
    setSearch(search, { replace: true });
  };
  const handleViewDocuments = (id) => {
    navigate(`/customer-documents/${id}`);
  };

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <div className="text-start my-2 ms-1" style={{ fontWeight: "600" }}>
              <Link to="/">Home</Link>&nbsp;&#8811;Customers
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-wrap bar-success d-flex align-items-center">
                  <h4 className="card-title">Customers </h4>
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
                      ) : !customers?.length ? (
                        <div className="mt-4 text-center card-body collapse show pb-3">
                          <h5> No Customers were found </h5>
                        </div>
                      ) : (
                        <Table responsive hover style={{ overflowX: "scroll" }}>
                          <thead class="responseHeaderStyle">
                            <tr>
                              {teamHeaders.map((header, index) => (
                                <th
                                  className="text-center align-middle"
                                  key={index}
                                >
                                  {capitalizeFirstLetter(header)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {customers.map((customer, index) => (
                              <tr className="text-center" key={index}>
                                <td className="text-center align-middle">
                                  {customer.name}
                                </td>
                                <td className="text-center align-middle">
                                  <img
                                    src={customer.imageUrl}
                                    alt=""
                                    style={{
                                      maxWidth: "80px",
                                      maxHeight: "50px",
                                    }}
                                  />
                                </td>

                                <td className="text-center align-middle">
                                  {customer.gender}
                                </td>
                                <td className="text-center align-middle">
                                  {customer.mobileNo}
                                </td>
                                <td className="text-center align-middle">
                                  {customer.role}
                                </td>
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
                          marginPagesDisplayed={1}
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

export default AllCustomers;
