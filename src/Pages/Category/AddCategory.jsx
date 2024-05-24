import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Card, CardBody, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AddCategory } from "../../store/slices/category";
import { Logout } from "../../utils/helpers/Logout";

function AddCategoery() {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [categoryError, setCategoryError] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoError, setLogoError] = useState();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    Logout();
  }, []);
  const save = (e) => {
    if (categoryName === "") {
      setCategoryError("Please enter category name");
    }
    if (logo === "") {
      setLogoError("Please enter Logo");
    }

    if (!categoryName || !logo) {
      return;
    } else {
      let item = {
        name: categoryName,
        status: 1,
        logo,
      };
      setButtonDisabled(true)
      dispatch(AddCategory(item))
        .unwrap()
        .then((data) => {
         
          alert("Category added succesfully");
          navigate(-1);
          setButtonDisabled(true)
        })
        .catch(({ message }) => {
          setButtonDisabled(false);
          alert(message);
        });
    }
  };

  const courseChange = (value) => {
    setCategoryName(value);
    if (value === "") {
      setCategoryError("Please enter category name");
    } else {
      setCategoryError("");
    }
  };

  const LogoChange = (val) => {
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
              <Link to="/category">Category</Link>&nbsp;&#8811; Add Category
            </div>
            <div className="card">
              <div class="card-header">
                <div class="card-title-wrap bar-success d-flex align-items-center">
                  <h4 class="card-title">Add Category</h4>
                </div>
              </div>
              <div className="card-body collapse show">
                <div className="card-block card-dashboard table-responsive">
                  <div className="card-body collapse show">
                    <div className="card-block card-dashboard table-responsive">
                      <div className="row">
                        <div className="col-md-5 mt-2 mb-2">
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
                        <div className="col-md-5 mt-2 mb-2">
                          <span className="label">Logo</span>
                          <input
                            type="url"
                            placeholder="Enter Logo url link"
                            className="form-control"
                            value={logo}
                            onChange={(e) => LogoChange(e.target.value)}
                          />
                          <p className="alert-message">{logoError}</p>
                        </div>
                      </div>

                      <div className="col-md-10 mt-3" align="center">
                        <Button
                          className="btn btn-danger ms-2"
                          onClick={cancelClick}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                          disabled={buttonDisabled}
                          onClick={save}
                        >
                          Submit
                        </Button>
                      </div>
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
export default AddCategoery;
