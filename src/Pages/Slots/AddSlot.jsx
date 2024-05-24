import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Logout } from "../../utils/helpers/Logout";
import { AddSlots } from "../../store/slices/category";

function AddSlot() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [day, setDay] = useState("");
  const [dayError, setDayError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    Logout();
  }, []);

  const save = (e) => {
    if (day === "") {
      setDayError("Please enter day");
    }
    if (startTime === "") {
      setStartTimeError("Please enter start time");
    }
    if (endTime === "") {
      setEndTimeError("Please enter end time");
    }
    if (!day || !startTime || !endTime) {
      return;
    }
    let item = {
      startTime: startTime,
      endTime: endTime,
      day: day,
      isActive: true,
    };
    dispatch(AddSlots(item))
      .unwrap()
      .then((data) => {
        console.log(data);
        alert("Slot added succesfully");
        navigate(-1);
      })
      .catch(({ message }) => {
        setButtonDisabled(false);
        alert(message);
      });
  };

  const dayChange = (e) => {
    setDay(e.target.value);
    if (e.target.value === "") {
      setDayError("Please enter day");
    } else {
      setDayError("");
    }
  };
  const startTimeChange = (e) => {
    setStartTime(e.target.value);
    if (e.target.value === "") {
      setStartTimeError("Please enter start time");
    } else {
      setStartTimeError("");
    }
  };

  const endTimeChange = (e) => {
    setEndTime(e.target.value);
    if (e.target.value === "") {
      setEndTimeError("Please enter end time");
    } else {
      setEndTimeError("");
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
              <Link to="/slots">Slots</Link>&nbsp;&#8811; Add Slot
            </div>
            <div class="card">
              <div class="card-header">
                <div class="card-title-wrap bar-success d-flex align-items-center">
                  <h4 class="card-title">Add Slot</h4>
                </div>
              </div>
              <div class="card-body collapse show">
                <div class="card-block card-dashboard table-responsive">
                  <div
                    style={{ height: "100%" }}
                    className="form-group pt-2 pb-2 col-md-5 col-sm-12"
                  >
                    <span className="bread-head1 mt-3">Day</span>
                    <input
                      type="day"
                      required={true}
                      name="day"
                      className="form-control"
                      placeholder="Enter day"
                      value={day}
                      onChange={(e) => dayChange(e)}
                    />
                    <p className="alert-message">{dayError}</p>
                  </div>
                  <Row>
                    <div
                      style={{ height: "100%" }}
                      className="form-group pt-2 pb-2 col-md-5 col-sm-12"
                    >
                      <span className="bread-head1 mt-3">Start Time</span>
                      <input
                        type="time"
                        required={true}
                        name="time"
                        className="form-control"
                        placeholder="Enter start time"
                        onChange={(e) => startTimeChange(e)}
                        value={startTime}
                      />
                      <p className="alert-message">{startTimeError}</p>
                    </div>

                    <div
                      style={{ height: "100%" }}
                      className="form-group pt-2 pb-2 col-md-5 col-sm-12"
                    >
                      <span className="bread-head1 mt-3">End Time</span>
                      <input
                        type="time"
                        required={true}
                        name="time"
                        className="form-control"
                        placeholder="Enter end time"
                        onChange={(e) => endTimeChange(e)}
                        value={endTime}
                      />
                      <p className="alert-message">{endTimeError}</p>
                    </div>
                  </Row>
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
}
export default AddSlot;