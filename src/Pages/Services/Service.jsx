import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button, Col, Container, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { useDispatch } from "react-redux";
import { getService } from "../../store/slices/category";
import DeleteModal from "../../utils/helpers/Modals/DeleteModal";
import { Logout } from "../../utils/helpers/Logout";
import { deleteService } from "../../store/slices/category";

function Service() {
  const teamHeaders = [
    "Name",
    "Media",
    "Price",
    "GST",
    "Date",
    "Percent",
    "Slots",
    "Action",
  ];
  const { id } = useParams();
  const [totaldata, setTotaldata] = useState();
  const [service, setService] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [search, setSearch] = useSearchParams();
  const querypage = parseInt(search.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(querypage);
  const [deleteServiceId, setDeleteServiceId] = useState();
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

  const item = {
    limit: itemsPerPage,
    page: currentPage,
    categoryId: id,
  };

  useEffect(() => {
    getServices();
  }, [dispatch, itemsPerPage, currentPage]);

  const getServices = () => {
    setLoading(true);
    dispatch(getService(item))
      .unwrap()
      .then((data) => {
        console.log(data);
        setService(data.service);
        setTotaldata(data?.service?.totalDataCount);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {});
  };

  const handleDelete = () => {
    const item = {
      id: deleteServiceId,
    };

    dispatch(deleteService(item))
      .unwrap()
      .then((data) => {
        alert(data?.service?.message);
        setShowModal(false);
        getServices();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        // Handle the error appropriately, such as showing an error message to the user
      });
  };

  const handleDeleteServiceClick = (id) => {
    setShowModal(true);
    setDeleteServiceId(id);
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1 || currentPage;
    setCurrentPage(newPage);
    search.set("page", newPage);
    setSearch(search, { replace: true });
  };
  const handleAddServiceClick = () => {
    navigate(`/addservice/${id}`);
  };
  const handleEditServiceClick = (id1) => {
    navigate(`/editservice/${id}/${id1}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
      />
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <div className="text-start my-2 ms-1" style={{ fontWeight: "600" }}>
              <Link to="/">Home</Link>&nbsp;&#8811;{" "}
              <Link to="/category">Category</Link>
              &nbsp;&#8811; Service
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-wrap bar-success d-flex align-items-center">
                  <h4 className="card-title">Service </h4>
                  <Button
                    color="primary"
                    className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                    onClick={handleAddServiceClick}
                  >
                    Add Service
                  </Button>
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
                      ) : !service?.length ? (
                        <div className="mt-4 text-center card-body collapse show pb-3">
                          <h5> No Services were added yet. </h5>
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
                            {service.map((service, index) => (
                              <tr className="text-center" key={index}>
                                <td className="text-center align-middle">
                                  {service.name}
                                </td>
                                <td className="text-center align-middle">
                                  <img
                                    src={service.mediaLink}
                                    alt=""
                                    style={{
                                      maxWidth: "80px",
                                      maxHeight: "50px",
                                    }}
                                  />
                                </td>

                                <td className="text-center align-middle">
                                  {service.pricePerHour}
                                </td>
                                <td className="text-center align-middle">
                                  {service.gstPercent}
                                </td>
                                <td className="text-center align-middle">
                                  {formatDate(service.createdAt)}
                                </td>
                                <td className="text-center align-middle">
                                  {service.platformCostPercent}
                                </td>
                                <td className="text-center align-middle">
                                  {service.slotsLimit}
                                </td>

                                <td className="text-center align-middle">
                                  <Button
                                    color="primary"
                                    className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                                    style={{ marginRight: "10px" }}
                                    onClick={() =>
                                      handleEditServiceClick(service._id)
                                    }
                                  >
                                    Edit
                                  </Button>

                                  <button
                                    className="btn btn-danger ms-2"
                                    onClick={() =>
                                      handleDeleteServiceClick(service._id)
                                    }
                                  >
                                    Delete
                                  </button>
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

export default Service;
