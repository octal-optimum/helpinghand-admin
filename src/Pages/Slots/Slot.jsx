import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Col, Container, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { useDispatch } from "react-redux";
import DeleteModal from "../../utils/helpers/Modals/DeleteModal";
import { Logout } from "../../utils/helpers/Logout";
import { getSlots, deleteSlot } from "../../store/slices/category";

function Slot() {
  const teamHeaders = ["Start Time", "End Time", "Day", "Action"];
  const [totaldata, setTotaldata] = useState();
  const [slot, setSlot] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useSearchParams();
  const querypage = parseInt(search.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(querypage);
  const [deleteSlotId, setDeleteSlotId] = useState();
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
  };

  useEffect(() => {
    getSlot();
  }, [itemsPerPage, currentPage]);

  const getSlot = () => {
    setLoading(true);
    dispatch(getSlots(item))
      .unwrap()
      .then((data) => {
        setSlot(data.slot.data);
        setTotaldata(data?.slot?.totalDataCount);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(({ message }) => {
        alert(message);
      });
  };

  const handleDelete = () => {
    const item = {
      id: deleteSlotId,
    };

    dispatch(deleteSlot(item))
      .unwrap()
      .then((data) => {
        alert(data?.slot?.message);
        setShowModal(false);
        getSlot();
      })
      .catch((error) => {
        console.error("Error deleting slot:", error);
      });
  };

  const handleDeleteSlotClick = (id) => {
    setShowModal(true);
    setDeleteSlotId(id);
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1 || currentPage;
    setCurrentPage(newPage);
    search.set("page", newPage);
    setSearch(search, { replace: true });
  };

  const handleAddSlotClick = () => {
    navigate("/addslot");
  };
  const handleEditSlotClick = (id) => {
    navigate(`/editslot/${id}`);
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
              <Link to="/">Home</Link>&nbsp;&#8811;Slot
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title-wrap bar-success d-flex align-items-center">
                  <h5 className="card-title">Slot </h5>
                  <Button
                        color="primary"
                        className="btn font-14 btn-sm btn-primary waves-effect m-2 waves-light w-10"
                    onClick={handleAddSlotClick}
                  >
                    Add Slot
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
                      ) : !slot?.length ? (
                        <div className="mt-4 text-center card-body collapse show pb-3">
                          <h5> No Slots were added yet. </h5>
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
                            {slot.map((slot, index) => (
                              <tr className="text-center" key={index}>
                                <td className="text-center align-middle">
                                  {slot.startTime}
                                </td>
                                <td className="text-center align-middle">
                                  {slot.endTime}
                                </td>
                                <td className="text-center align-middle">
                                  {slot.day}
                                </td>

                                <td className="text-center align-middle">
                                  <button
                                    color="primary"
                                    className="btn font-14 btn-outline-info btn-sm waves-effect m-2 waves-light w-10"
                                    onClick={() =>
                                      handleEditSlotClick(slot._id)
                                    }
                                  >
                                    Edit
                                  </button>

                                  <button
                                    className="btn btn-outline-danger btn-sm ms-2"
                                    onClick={() =>
                                      handleDeleteSlotClick(slot._id)
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

export default Slot;
