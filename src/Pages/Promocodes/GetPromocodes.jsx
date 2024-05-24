import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Button, Col, Container, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { useDispatch } from "react-redux";
import DeleteModal from "../../utils/helpers/Modals/DeleteModal";
import { Logout } from "../../utils/helpers/Logout";
import { DeletePromocodes, GetPromocodes } from "../../store/slices/booking";

function Promocodes() {
  const teamHeaders = [
    "Promo Code",
    "Discount",
    "Max limit",
    "Start Date",
    "End Date",
    "Action",
  ];
  const { id } = useParams();
  const [totaldata, setTotaldata] = useState();
  const [promocodes, setPromocodes] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [search, setSearch] = useSearchParams();
  const querypage = parseInt(search.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(querypage);
  const [deletepromocodeId, setDeletePromocodeId] = useState();
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
    getPromocodes();
  }, [dispatch, itemsPerPage, currentPage]);

  const getPromocodes = () => {
    setLoading(true);
    dispatch(GetPromocodes(item))
      .unwrap()
      .then((data) => {
        setPromocodes(data.promocodes);
        setTotaldata(data?.promocodes?.totalDataCount);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {});
  };

  const handleDelete = () => {
    const item = {
      id: deletepromocodeId,
    };

    dispatch(DeletePromocodes(item))
      .unwrap()
      .then((data) => {
        alert(data?.promocodes?.message);
        setShowModal(false);
        getPromocodes();
      })
      .catch((error) => {
        alert(error);
        // Handle the error appropriately, such as showing an error message to the user
      });
  };

  const handleDeletePromocodesClick = (id) => {
    setShowModal(true);
    setDeletePromocodeId(id);
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1 || currentPage;
    setCurrentPage(newPage);
    search.set("page", newPage);
    setSearch(search, { replace: true });
  };
  const handleAddServiceClick = () => {
    navigate(`/add-promocodes`);
  };
  const handleEditPromocodesClick = (id) => {
    navigate(`/edit-promocodes/${id}`);
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
              <Link to="/">Home</Link>
              &nbsp;&#8811; Promocodes
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-wrap bar-success d-flex align-items-center">
                  <h4 className="card-title">Promocodes </h4>
                  <Button
                    color="primary"
                    className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                    onClick={handleAddServiceClick}
                  >
                    Add Promocodes
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
                      ) : !promocodes?.length ? (
                        <div className="mt-4 text-center card-body collapse show pb-3">
                          <h5> No Promocodes were added yet. </h5>
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
                            {promocodes?.map((promocodes, index) => (
                              <tr className="text-center" key={index}>
                                <td className="text-center align-middle">
                                  {promocodes.promoCode}
                                </td>
                                <td className="text-center align-middle">
                                  {promocodes.discount}
                                </td>
                                <td className="text-center align-middle">
                                  {promocodes.maxLimit}
                                </td>
                                <td className="text-center align-middle">
                                  {promocodes.startDate.split("T")[0]}
                                </td>
                                <td className="text-center align-middle">
                                  {promocodes.endDate.split("T")[0]}
                                </td>

                                <td className="text-center align-middle">
                                  <Button
                                    color="primary"
                                    className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                                    style={{ marginRight: "10px" }}
                                    onClick={() =>
                                      handleEditPromocodesClick(promocodes._id)
                                    }
                                  >
                                    Edit
                                  </Button>

                                  <button
                                    className="btn btn-danger ms-2"
                                    onClick={() =>
                                      handleDeletePromocodesClick(
                                        promocodes._id
                                      )
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

export default Promocodes;
