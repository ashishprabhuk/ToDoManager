import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import NavLink from "react-bootstrap/NavLink";
import { useNavigate ,Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {

    const history = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: "",
        date: "",
        password: "",
    });

    const [data, setData] = useState([]);
    console.log(input);

    const getData = (e) => {
        // console.log(e.target.value);
        const { value, name } = e.target;
        setInput(() => {
            return { ...input, [name]: value };
        });
    };

    const addData = (e) => {
        e.preventDefault();

        const { name, email, date, password } = input;

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

        if (!name) {
            showErrorToast("Name field is required!");
        } else if (!email) {
            showErrorToast("Email field is required");
        } else if (!isEmailValid()) {
            showErrorToast("Please enter a valid email address");
        } else if (!date) {
            showErrorToast("Date field is required");
        } else if (!password) {
            showErrorToast("Password field is required");
        } else if (!isPasswordValid()) {
            showErrorToast(passwordMsg);
        } else {
            console.log("Data added successfully");
            localStorage.setItem("user", JSON.stringify([...data, input]));
            history("/login");
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className="d-flex justify-content-center">
                    <div className="left_data mt-3 p-3 col-lg-6">
                        <h3 className="text-center mb-3">Sign Up</h3>
                        <Form>
                            <Form.Group
                                controlId="formBasicName"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    onChange={getData}
                                />
                            </Form.Group>
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
                                controlId="formBasicDate"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="date"
                                    name="date"
                                    style={{ color: "#000000" }}
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
                            Already have an account?{" "}
                            <span>
                                <Link to="/login">Login</Link>
                            </span>
                        </p>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    );
};

export default SignUp;
