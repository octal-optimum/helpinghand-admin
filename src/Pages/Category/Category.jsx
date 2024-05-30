import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Col, Button, Row, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import ReactPaginate from "react-paginate";
import ShowSkeleton from "../../utils/helpers/Skeleton";
import { useDispatch } from "react-redux";
import { getCategory } from "../../store/slices/category";
import DeleteModal from "../../utils/helpers/Modals/DeleteModal";
import { deleteCategory } from "../../store/slices/category";

const Category = (props) => {
  const teamHeaders = ["Name", "Icon", "Services", "Action"];
  const [totaldata, setTotaldata] = useState();
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [search, setSearch] = useSearchParams();
  const querypage = parseInt(search.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(querypage);
  const [deleteCategoryId, setDeleteCategoryId] = useState();
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const pagesToShowInitially = 3;
  const navigate = useNavigate();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
    getCategories();
  }, [itemsPerPage, currentPage]);

  const getCategories = () => {
    setLoading(true);
    dispatch(getCategory(item))
      .unwrap()
      .then((data) => {
        setCategory(data?.category?.data);
        setTotaldata(data?.category?.totalDataCount);
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
      id: deleteCategoryId,
    };

    dispatch(deleteCategory(item))
      .unwrap()
      .then((data) => {
        alert(data?.category?.message);
        setShowModal(false);
        getCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        // Handle the error appropriately, such as showing an error message to the user
      });
  };

  const handleDeleteCategoryClick = (id) => {
    setShowModal(true);
    setDeleteCategoryId(id);
  };


  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1 || currentPage;
    setCurrentPage(newPage);
    search.set("page", newPage);
    setSearch(search, { replace: true });
  };
  const handleViewServiceClick = (id) => {
    navigate(`/service/${id}`);
  };
  const handleAddCategoryClick = () => {
    navigate("/addcategory");
  };
  const handleEditCategoryClick = (id) => {
    navigate(`/editcategory/${id}`);
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
              <Link to="/">Home</Link>&nbsp;&#8811; Category
            </div>
            <div className="card mt-1">
              <div className="card-header">
                <div className="card-title-wrap bar-success d-flex align-items-center">
                  <h5 className="card-title">Category </h5>
                  <Button
                    color="primary"
                    className="btn btn-primary btn-sm waves-effect waves-light m-2"
                    onClick={handleAddCategoryClick}
                  >
                    Add Category
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
                      ) : !category?.length ? (
                        <div className="mt-4 text-center card-body collapse show pb-3">
                          <h5> No Categories were added yet. </h5>
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
                            {category.map((category, index) => (
                              <tr className="text-center" key={index}>
                                <td className="text-center align-middle">
                                  {category.name}
                                </td>
                                <td className="text-center align-middle">
                                  <img
                                    src={category.logo}
                                    alt=""
                                    style={{
                                      maxWidth: "80px",
                                      maxHeight: "50px",
                                    }}
                                  />
                                </td>
                                <td className="text-center align-middle">
                                  <button
                                    onClick={() =>
                                      handleViewServiceClick(category._id)
                                    }
                                    color="primary"
                                    size="sm"
                                    className="btn btn-outline-primary btn-sm waves-effect waves-light"
                                  >
                                    View Service
                                  </button>
                                </td>
                                <td className="text-center align-middle">
                                <button
                      type="button"
                      className="btn btn-outline-info btn-sm waves-effect waves-light"
                                    style={{ marginRight: "10px" }}
                                    onClick={() =>
                                      handleEditCategoryClick(category._id)
                                    }
                                  >
                                    Edit
                                  </button>

                                  <button
                                   type="button"
                                   className="btn btn-outline-danger btn-sm waves-effect waves-light"
                                    onClick={() =>
                                      handleDeleteCategoryClick(category._id)
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
};

export default Category;
