import React, { useEffect } from "react";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, CardBody, Form, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/slices/auth";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = (props) => {
  document.title = "Login | Upzet - React Admin & Dashboard Template";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '' || '',
      password: '' || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(login(values))
        .unwrap()
        .then((res) => {
          if (res?.user?.accessToken) {
            localStorage.setItem("token", res?.user?.accessToken);
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
        })
        .catch((message) => {
          console.log(message)
          alert(message.message);
        });
    },
  });

  return (
    <React.Fragment>
      <div className="bg-overlay"></div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card>
                <CardBody className="p-4">
                  <div>
                    <div className="text-center">
                      <Link to="/">
                        <img
                          src={logodark}
                          alt=""
                          height="24"
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="24"
                          className="auth-logo logo-light mx-auto"
                        />
                      </Link>
                    </div>
                    <h4 className="font-size-18 text-muted mt-2 text-center">
                      Welcome Back!
                    </h4>
                    <p className="mb-5 text-center">
                      Sign in to continue to Upzet.
                    </p>
                    <Form className="form-horizontal" onSubmit={validation.handleSubmit}>
                      <Row>
                        <Col md={12}>
                          <div className="mb-4">
                            <label className="form-label" htmlFor="username">
                              Username
                            </label>
                            <Input
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Enter username"
                              value={validation.values.username}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={validation.touched.username && !!validation.errors.username}
                            />
                            {validation.touched.username && validation.errors.username ? (
                              <div className="text-danger">{validation.errors.username}</div>
                            ) : null}
                          </div>
                          <div className="mb-4">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <Input
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Enter password"
                              value={validation.values.password}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={validation.touched.password && !!validation.errors.password}
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <div className="text-danger">{validation.errors.password}</div>
                            ) : null}
                          </div>

                          <Row>
                            <Col>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                />
                                <label
                                  className="form-label form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </label>
                              </div>
                            </Col>
                            <Col className="col-7">
                              <div className="text-md-end mt-3 mt-md-0">
                                <Link to="/auth-recoverpw" className="text-muted">
                                  <i className="mdi mdi-lock"></i> Forgot your password?
                                </Link>
                              </div>
                            </Col>
                          </Row>
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p className="text-white-50">
                  Don't have an account?{" "}
                  <Link to="/auth-register" className="fw-medium text-primary">
                    Register
                  </Link>{" "}
                </p>
                <p className="text-white-50">
                  © {new Date().getFullYear()} Upzet. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesdesign
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
