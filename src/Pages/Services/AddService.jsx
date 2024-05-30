import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button ,Container,Row} from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {Logout} from "../../utils/helpers/Logout";
import { AddServices } from "../../store/slices/category";

const AddService = () =>{
    const {id} = useParams();
  const [serviceName, setServiceName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [serviceError, setServiceError] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
const [media, setMedia] = useState("");
const [mediaError, setMediaError] = useState();
const [price, setPrice] = useState("");
const [priceError, setPriceError] = useState();
const[slots,setSlots] = useState("");
const[slotsError,setSlotsError] = useState();
const [gst, setGst] = useState("");
const [gstError, setGstError] = useState();
const [percent, setPercent] = useState("");
const [percentError, setPercentError] = useState();
const [date, setDate] = useState("");
const [dateError, setDateError] = useState();
useEffect(() => {
  // 👇️ scroll to top on page load
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  Logout()
}, []);
const save = (e) => {
    if (serviceName === "") {
      setServiceError("Please enter service name");
    } if (media === "") {
        setMediaError("Please enter media links");
      }
      if (price === "") {
        setPriceError("Please enter price");
      }
      if (gst === "") {
        setGstError("Please enter gst");
      }
      if (percent === "") {
        setPercentError("Please enter platform cost percent");
      }
      if (date === "") {
        setDateError("Please enter date");
      }
      if(slots === ""){
        setSlotsError("Please enter slot limit");
      }
  
        if(!serviceName || !media || !price || !gst || !percent || !slots){
          return
    } 

let item ={
  name:serviceName,
  isActive:true,
  mediaLink:[media],
  categoryId:id,
  pricePerHour:price,
  gstPercent:gst,
  platformCostPercent:percent,
  slotsLimit:slots,

}

dispatch(AddServices(item))
.unwrap()
      .then((data) => {
        console.log(data)
        alert("Services added succesfully");
        navigate(-1);
      })
      .catch(({ message }) => {
        setButtonDisabled(false);
      });
    }
    
    const serviceChange = (value) => {
      setServiceName(value);
      if(value ===""){
        setServiceError("Please enter service name")
      }else{
      setServiceError("");
      }
    };

    const mediaChange =  (val) => {
      setMedia(val);
      if(val ===""){
        setMediaError("Media url is required")
      }else{
      setMediaError("");
      }
    };
    const priceChange =  (price) => {
      setPrice(price);
      if(price ===""){
        setPriceError("Please enter price")
      }else{
      setPriceError("");
    };
  }
    const gstChange =  (gst) => {
      setGst(gst);
      if(gst ===""){
        setGstError("Please enter gst")
      }else{
      setGstError("");
      }
    };
    const percentChange =  (percent) => {
      setPercent(percent);
      if(percent ===""){
        setPercentError("Please enter platform cost percent")
      }else{
      setPercentError("");
      }
    };


    const dateChange = (e) => {
      setDate(e.target.value);
      if(e.target.value ===""){
        setDateError("Please choose date")
      }else{
      setDateError("");
      }
    };
    const slotsChange = (slot) =>{
     setSlots(slot);
     if(slot === ""){
      setSlotsError("Please enter slot limit");
    }else{
     setSlotsError("");
    }
    }

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
                    <Link to="/category">Category</Link>&nbsp;&#8811; <Link onClick={cancelClick}>Service</Link>
                    &nbsp;&#8811;Add Service
                   
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <div class="card-title-wrap bar-success d-flex align-items-center">
                        <h4 class="card-title">Add Service</h4>
                      </div>
                    </div>
                    <div class="card-body collapse show">
                      <div class="card-block card-dashboard table-responsive">
                        <Row>
                      <div
                        style={{ height: "100%" }}
                        className="col-md-5 col-sm-12"
                      >
                        <span className="bread-head1 mt-3">Date</span>

                        <div className="pt-2 pb-2">
                          <input
                            type="date"
                            required="true"
                            name="date"
                            className="form-control "
                            placeholder="Enter date"
                            onChange={(e) => dateChange(e)}
                            value={date}
                          />
                        </div>
                        <p className="alert-message">{dateError}</p>
                      </div>
                        
                          <div
                            style={{ height: "100%" }}
                            className="col-md-5 pt-2 pb-2"
                          >
                            <span className="label">Service Name</span>
                            <input
                              type="text"
                              placeholder="Enter category name"
                              className="form-control"
                              value={serviceName}
                              onChange={(e) => serviceChange(e.target.value)}
                            />
                            <p className="alert-message">{serviceError}</p>
                          </div>
                         
                          <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Media</span>
                      <input
                        type="text"
                        placeholder="Enter Logo url link"
                        className="form-control"
                        value={media}
                        onChange={(e) => mediaChange(e.target.value)}
                         
                      />
                      <p className="alert-message">{mediaError}</p>
                    </div>
                    <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Price</span>
                      <input
                        type="number"
                        placeholder="Enter the price"
                        className="form-control"
                        value={price}
                        onChange={(e) => priceChange(e.target.value)}
                         
                      />
                      <p className="alert-message">{priceError}</p>
                    </div>
                    <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Gst</span>
                      <input
                        type="number"
                        placeholder="Enter the gst"
                        className="form-control"
                        value={gst}
                        onChange={(e) => gstChange(e.target.value)}
                         
                      />
                      <p className="alert-message">{gstError}</p>
                    </div>
                    <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Percent</span>
                      <input
                        type="number"
                        placeholder="Enter the percent"
                        className="form-control"
                        value={percent}
                        onChange={(e) => percentChange(e.target.value)}
                         
                      />
                      <p className="alert-message">{percentError}</p>
                    </div>
                    <div
                      style={{ height: "100%" }}
                      className="col-md-5 pt-2 pb-2"
                    >
                      <span className="label">Slots</span>
                      <input
                        type="number"
                        placeholder="Enter the slot"
                        className="form-control"
                        value={slots}
                        onChange={(e) => slotsChange(e.target.value)}
                         
                      />
                      <p className="alert-message">{slotsError}</p>
                    </div>
                    </Row>

                        <div className="col-md-10 mt-3" align="center">
                          <button
                            className="btn btn-outline-danger"
                            onClick={cancelClick}
                            
                          >
                            Cancel
                          </button>
                          <Button
                            type="submit"
                            color="primary"
                            className="btn font-14 btn-info waves-effect m-2 waves-light w-10"
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
export default AddService;
