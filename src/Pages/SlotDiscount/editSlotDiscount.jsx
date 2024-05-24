import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Logout } from "../../utils/helpers/Logout";
import {
  getService,
  getCategory,
  getSlotddiscountDetails,
  EditSlotsdiscount,
} from "../../store/slices/category";

function EditSlotDiscount() {
  const { id } = useParams();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [serviceId, setserviceId] = useState("");
  const [allservices, setAllServices] = useState([]);
  const [serviceIdError, setserviceIdError] = useState("");
  const [slotsCount, setslotsCount] = useState("");
  const [slotsCountError, setslotsCountError] = useState("");
  const [percentage, setPercentage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [percentageError, setpercentageError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getSlotDiscount();
    Getservices();
    Logout();
  }, []);

  const getSlotDiscount = () => {
    dispatch(getSlotddiscountDetails(id))
      .unwrap()
      .then((data) => {
        setserviceId(data.slot.data[0].serviceId);
        setslotsCount(data.slot.data[0].slotsCount);
        setPercentage(data.slot.data[0].percentage);
      })
      .catch(({ message }) => {
        alert(message);
      });
  };

  const Getservices = () => {
    dispatch(getService())
      .unwrap()
      .then((data) => {
        setAllServices(data.service.data);
        console.log(data);
      })
      .catch(({ message }) => {
        setButtonDisabled(false);
        alert(message);
      });
  };

  const save = (e) => {
    if (serviceId === "") {
      setserviceIdError("Please select serviceid");
      return;
    }
    if (slotsCount === "") {
      setslotsCountError("Please enter slots count");
      return;
    }
    if (percentage === "") {
      setpercentageError("Please enter percentage");
      return;
    }

    let item = {
      serviceId: serviceId,
      slotsCount: slotsCount,
      percentage: percentage,
      id: id,
    };
    dispatch(EditSlotsdiscount(item))
      .unwrap()
      .then((data) => {
        console.log(data);
        alert("Slot discount updated succesfully");
        navigate(-1);
      })
      .catch(({ message }) => {
        setButtonDisabled(false);
        alert(message);
      });
  };

  const serviceIdChange = (e) => {
    setserviceId(e);
    if (e === "") {
      setserviceIdError("Please select service name");
    } else {
      setserviceIdError("");
    }
  };

  const slotsCountChange = (e) => {
    setslotsCount(e);
    if (e === "") {
      setslotsCountError("Please enter slots count");
    } else {
      setslotsCountError("");
    }
  };

  const percentageChange = (e) => {
    setPercentage(e);
    if (e === "") {
      setpercentageError("Please enter percentage");
    } else {
      setpercentageError("");
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
            <div
              class="text-start my-2 ms-1"
              style={{
                fontWeight: "600",
              }}
            >
              <Link to="/dashboard">Home</Link>&nbsp;&#8811;&nbsp;
              <Link to="/slot-discount">Slot discounts</Link>&nbsp;&#8811; Edit
              Slot discount
            </div>
            <div class="card">
              <div class="card-header">
                <div class="card-title-wrap bar-success d-flex align-items-center">
                  <h4 class="card-title">Edit Slot discount</h4>
                </div>
              </div>
              <div class="card-body collapse show">
                <div class="card-block card-dashboard ">
                  <Row>
                    <div
                      style={{ height: "100%" }}
                      className="form-group pt-2 pb-2 col-md-6 col-sm-12"
                    >
                      <span className="bread-head1 mt-3">Service Name</span>

                      <select
                        type="select"
                        placeholder="select serviceid"
                        className="form-control"
                        value={serviceId}
                        onChange={(e) => serviceIdChange(e.target.value)}
                      >
                        <option value="">Select</option>
                        {allservices?.map((el) => (
                          <option value={el?.id}>{el?.name}</option>
                        ))}
                      </select>

                      <p className="alert-message">{serviceIdError}</p>
                    </div>

                    <div
                      style={{ height: "100%" }}
                      className="form-group pt-2 pb-2 col-lg-6 col-sm-12"
                    >
                      <span className="bread-head1 mt-3">Slots Count</span>
                      <input
                        required={true}
                        className="form-control"
                        placeholder="Enter Slots Count"
                        onChange={(e) => slotsCountChange(e.target.value)}
                        value={slotsCount}
                      />
                      <p className="alert-message">{slotsCountError}</p>
                    </div>

                    <div
                      style={{ height: "100%" }}
                      className="form-group pt-2 pb-2 col-lg-6 col-sm-12"
                    >
                      <span className="bread-head1 mt-3">Percentage</span>
                      <input
                        required={true}
                        name="time"
                        className="form-control"
                        placeholder="Enter Percentage"
                        onChange={(e) => percentageChange(e.target.value)}
                        value={percentage}
                      />
                      <p className="alert-message">{percentageError}</p>
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
}
export default EditSlotDiscount;
