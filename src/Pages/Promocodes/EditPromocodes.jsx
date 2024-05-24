import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Logout } from "../../utils/helpers/Logout";
import { AddServices } from "../../store/slices/category";
import { AddPromocodes, EditPromocodes, GetPromocodes } from "../../store/slices/booking";

const EditPromoCodes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState("");
  const [maxLimit, setMaxLimit] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [Errors, setErrors] = useState({});

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    Logout();
  }, []);

  let item = {
    id: id,
  };
  useEffect(() => {
    dispatch(GetPromocodes(item))
      .unwrap()
      .then((data) => {
        setPromocode(data?.promocodes?.data[0]?.promoCode);
        setDiscount(data?.promocodes?.data[0]?.discount);
        setMaxLimit(data?.promocodes?.data[0]?.maxLimit);
        setStartDate(data?.promocodes?.data[0]?.startDate.split("T")[0]);
        setEndDate(data?.promocodes?.data[0]?.endDate.split("T")[0]);
      })
      .catch(({ message }) => {
        alert(message);
      });
  }, []);

  const save = (e) => {
    const validationErrors = {};
    if (promocode === "") {
      validationErrors.promocode = "Please enter promocode";
    } else if (promocode.length < 6 || promocode.length > 6) {
      validationErrors.promocode = "Promocode should be 6 digits";
    }

    if (discount === "") {
      validationErrors.discount = "Please enter discount";
    }
    if (maxLimit === "") {
      validationErrors.maxLimit = "Please enter maxLimit";
    }

    if (startDate === "") {
      validationErrors.startDate = "Please enter startdate";
    }
    if (endDate === "") {
      validationErrors.endDate = "Please enter enddate";
    } else if (endDate < startDate) {
      validationErrors.endDate = "End date should be greater than start date";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      let item = {
        id:id,
        promocode: promocode,
        discount: discount,
        maxLimit: maxLimit,
        startDate: startDate,
        endDate: endDate,
      };
      setButtonDisabled(true);
      dispatch(EditPromocodes(item))
        .unwrap()
        .then((data) => {
          alert("Promocode added succesfully");
          navigate(-1);
        })
        .catch(({ message }) => {
          setButtonDisabled(false);
        });
    }
  };
  const promocodeChange = (value) => {
    const validationErrors = { ...Errors };
    setPromocode(value);
    if (value === "") {
      validationErrors.promocode = "Please enter promo code";
    } else if (value.length < 6 || value.length > 6) {
      validationErrors.promocode = "Promocode should be 6 digits";
    } else {
      validationErrors.promocode = "";
    }
    setErrors(validationErrors);
  };
  const discountChange = (val) => {
    const validationErrors = { ...Errors };
    setDiscount(val);
    if (val === "") {
      validationErrors.discount = "Please enter discount";
    } else {
      validationErrors.discount = "";
    }
    setErrors(validationErrors);
  };
  const maxLimitChange = (maxLimit) => {
    const validationErrors = { ...Errors };
    setMaxLimit(maxLimit);
    if (maxLimit === "") {
      validationErrors.maxLimit = "Please enter max limit";
    } else {
      validationErrors.maxLimit = "";
    }
    setErrors(validationErrors);
  };

  const endDateChange = (e) => {
    const validationErrors = { ...Errors };
    setEndDate(e.target.value);
    if (e.target.value === "") {
      validationErrors.endDate = "Please choose start date";
    } else if (e.target.value < startDate) {
      validationErrors.endDate = "End date should be greater than start date";
    } else {
      validationErrors.endDate = "";
    }
    setErrors(validationErrors);
  };
  const startDateChange = (val) => {
    const validationErrors = { ...Errors };
    setStartDate(val);
    if (val === "") {
      validationErrors.endDate = "Please choose end date";
    } else {
      validationErrors.startDate = "";
    }
    setErrors(validationErrors);
  };
  const cancelClick = () => {
    navigate(-1);
  };

  return (
    <>
       <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
                  <div
                    class="text-start my-2 ms-1"
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    <Link to="/dashboard">Home</Link>&nbsp;&#8811;&nbsp;
                    <Link to="/promo-codes">Promo Code</Link>&nbsp;&#8811;
                    &nbsp;&#8811;Add Promo Code
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <div class="card-title-wrap bar-success d-flex align-items-center">
                        <h4 class="card-title">Add Promo Code</h4>
                      </div>
                    </div>
                    <div class="card-body collapse show">
                      <div class="card-block card-dashboard table-responsive">
                        <Row>
                          <div
                            style={{ height: "100%" }}
                            className="col-md-5 pt-2 pb-2"
                          >
                            <span className="label">Promo Code</span>
                            <input
                              type="text"
                              name="promocode"
                              placeholder="Enter promocode"
                              className="form-control"
                              value={promocode}
                              onChange={(e) => promocodeChange(e.target.value)}
                            />
                            <p className="alert-message">{Errors.promocode}</p>
                          </div>

                          <div
                            style={{ height: "100%" }}
                            className="col-md-5 pt-2 pb-2"
                          >
                            <span className="label">Discount</span>
                            <input
                              type="number"
                              placeholder="Enter discount amount"
                              className="form-control"
                              name="discount"
                              value={discount}
                              onChange={(e) => discountChange(e.target.value)}
                            />
                            <p className="alert-message">{Errors.discount}</p>
                          </div>
                          <div
                            style={{ height: "100%" }}
                            className="col-md-5 pt-2 pb-2"
                          >
                            <span className="label">Max Limit</span>
                            <input
                              type="number"
                              placeholder="Enter the maxLimit"
                              className="form-control"
                              name="maxLimit"
                              value={maxLimit}
                              onChange={(e) => maxLimitChange(e.target.value)}
                            />
                            <p className="alert-message">{Errors.maxLimit}</p>
                          </div>

                          <div
                            style={{ height: "100%" }}
                            className="col-md-5 pt-2 pb-2"
                          >
                            <span className="label">Start Date</span>
                            <input
                              type="date"
                              name="startDate"
                              placeholder="Select the start date"
                              className="form-control"
                              value={startDate}
                              onChange={(e) => startDateChange(e.target.value)}
                            />
                            <p className="alert-message">{Errors.startDate}</p>
                          </div>
                          <div
                            style={{ height: "100%" }}
                            className="col-md-5 col-sm-12"
                          >
                            <span className="bread-head1 mt-3">End Date</span>

                            <div className="pt-2 pb-2">
                              <input
                                type="date"
                                required="true"
                                name="endDate"
                                className="form-control "
                                placeholder="Select end date"
                                onChange={(e) => endDateChange(e)}
                                value={endDate}
                              />
                            </div>
                            <p className="alert-message">{Errors.endDate}</p>
                          </div>
                        </Row>

                        <div className="col-md-10 mt-3" align="center">
                          <Button className="btn btn-danger" onClick={cancelClick}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            color="primary"
                            className="btn font-14 btn-primary waves-effect m-2 waves-light w-10"
                                   onClick={save}
                            disabled={buttonDisabled}
                          >
                            Submit
                          </Button>
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
export default EditPromoCodes;
