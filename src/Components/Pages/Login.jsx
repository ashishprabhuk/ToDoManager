import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import NavLink from "react-bootstrap/NavLink";
import { Link ,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const history = useNavigate();


    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    // const [data, setData] = useState([]);
    console.log(input);

    const getData = (e) => {
        // console.log(e.target.value);

        const { value, name } = e.target;
        // console.log(value,name);

        setInput(() => {
            return {
                ...input,
                [name]: value,
            };
        });
    };

    const addData = (e) => {
        e.preventDefault();

        const getUser = localStorage.getItem("user");
        console.log(getUser);

        if (!getUser || getUser.length === 0) {
            // alert("Please sign up first");
            toast.error("Please sign up first", {
                position: "top-center",
            });
            return;
        }

        const { email, password } = input;

        const showErrorToast = (message) => {
            toast.error(message, {
                position: "top-center",
            });
        };

        const containsLowerCase = (str) => /[a-z]/.test(str);
        const containsUpperCase = (str) => /[A-Z]/.test(str);
        const containsSpecialCharacter = (str) =>
            /[!@#$%^&*(),.?":{}|<>]/.test(str);

        const passwordMsg = (
            <div>
                <p>Password should be:</p>
                <ul>
                    <li>at least 4 characters long</li>
                    <li>at least 1 lowercase letter</li>
                    <li>at least 1 uppercase letter</li>
                    <li>at least 1 special character</li>
                </ul>
            </div>
        );

        const isEmailValid = () => email.includes("@") && email.includes(".");
        const isPasswordValid = () =>
            password.length >= 4 &&
            containsLowerCase(password) &&
            containsUpperCase(password) &&
            containsSpecialCharacter(password);

        if (!email) {
            showErrorToast("Email field is required");
        } else if (!isEmailValid()) {
            showErrorToast("Please enter a valid email address");
        } else if (!password) {
            showErrorToast("Password field is required");
        } else if (!isPasswordValid()) {
            showErrorToast(passwordMsg);
        } else {
            if (getUser && getUser.length) {
                const userData = JSON.parse(getUser);
                const userLogin = userData.filter((user) => {
                    return user.email === email && user.password === password;
                });

                if (userLogin.length === 0) {
                    showErrorToast("invalid details");
                } else {
                    console.log("user login successfully");
                    toast.success("user login successfully", {
                        position: "top-center",
                    });
                    localStorage.setItem(
                        "user_login",
                        JSON.stringify(userLogin)
                    );
                    history("/todo");
                }
            }
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className="d-flex justify-content-center">
                    <div className="left_data mt-3 p-3 col-lg-6">
                        <h3 className="text-center mb-3">Login</h3>
                        <Form>
                            <Form.Group
                                controlId="formBasicEmail"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={getData}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formBasicPassword"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={getData}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="col-lg-12 center"
                                style={{ background: "#000000" }}
                                type="submit"
                                onClick={addData}
                            >
                                Submit
                            </Button>
                        </Form>
                        <p className="mt-3">
                            Dont have an account?{" "}
                            <span>
                            <Link to="/">Sign Up</Link>
                            </span>
                        </p>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
