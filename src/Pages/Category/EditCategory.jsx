import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Button, Row, Card, CardBody, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCategoryDetails, editCategory } from "../../store/slices/category";

function EditCategoery() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [categoryError, setCategoryError] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoError, setLogoError] = useState();

  const save = (e) => {
    if (categoryName === "") {
      setCategoryError("Please enter category name");
    }
    if (logo === "") {
      setLogoError("Please enter icon");
    }

    if (!categoryName || !logo) {
      return;
    }

    let item = {
      name: categoryName,
      status: 1,
      id: id,
      logo: logo,
    };
    setButtonDisabled(true)
    dispatch(editCategory(item))
      .unwrap()
      .then(() => {
        alert("Category updated successfully");
        navigate(-1);
        setButtonDisabled(false)
      }).catch(({ message }) => {
        setButtonDisabled(false);
        alert(message);
      });
  };

  useEffect(() => {
    dispatch(getCategoryDetails(id))
      .unwrap()
      .then((data) => {
        console.log(data);
        setCategoryName(data?.category?.data[0]?.name);
        setLogo(data?.category?.data[0]?.logo);
      })
      .catch(({ message }) => {});
  }, [dispatch]);

  const courseChange = (value) => {
    setCategoryName(value);
    if (value === "") {
      setCategoryError("Please enter category name");
    } else {
      setCategoryError("");
    }
  };

  const logoChange = (val) => {
    setLogo(val);
    if (val === "") {
      setLogoError("Logo is a required ");
    } else {
      setLogoError("");
    }
  };

  const cancelClick = () => {
    navigate(-1);
  };

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <div className="text-start " style={{ fontWeight: "600" }}>
              <Link to="/dashboard">Home</Link>&nbsp;&#8811;&nbsp;
              <Link to="/category">Category</Link>&nbsp;&#8811; Edit Category
            </div>
            <div class="card">
              <div class="card-header">
                <div class="card-title-wrap bar-success d-flex align-items-center">
                  <h4 class="card-title">Edit Category</h4>
                </div>
              </div>
              <div class="card-body collapse show">
                <div class="card-block card-dashboard table-responsive">
                  <div className="row">
                    <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Category Name</span>
                      <input
                        type="text"
                        placeholder="Enter category name"
                        className="form-control"
                        value={categoryName}
                        onChange={(e) => courseChange(e.target.value)}
                      />
                      <p className="alert-message">{categoryError}</p>
                    </div>
                    <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Logo</span>
                      <input
                        type="text"
                        placeholder="Enter icon url link"
                        className="form-control"
                        value={logo}
                        onChange={(e) => logoChange(e.target.value)}
                      />
                      <p className="alert-message">{logoError}</p>
                    </div>
                  </div>

                  <div className="col-md-10 mt-3" align="center">
                  <button
                          className="btn  btn-outline-danger waves-light"
                      onClick={cancelClick}
                    >
                      Cancel
                    </button>
                    <button
                    disabled={buttonDisabled}
                      type="submit"
                      color="primary"
                      className="btn font-14 btn-info waves-effect m-2 waves-light w-10"
                      onClick={save}
                    >
                      Submit
                    </button>
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
export default EditCategoery;
