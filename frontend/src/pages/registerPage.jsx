
// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import Message from "../components/message";
// import UserContext from "../context/userContext";
// import FormContainer from "../components/formContainer";
// import './styless.css';

// function RegisterPage(props) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { userInfo, register, error } = useContext(UserContext);
//   const navigate = useNavigate();
//   let redirect = window.location.search
//   ? window.location.search.split("=")[1]
//   : "/";

//   if (redirect[0] !== "/") redirect = `/${redirect}`;

//   useEffect(() => {
//     if (userInfo && userInfo.username) navigate(redirect);
//   }, [navigate, redirect, userInfo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       // Handle password mismatch
//       return;
//     }
//     const status = await register(username, email, firstName, lastName, password);
//     if (status) navigate(redirect);
//   };

//   return (
//     <FormContainer>
//       <h1>Register</h1>
//       {error.register && error.register.detail && (
//         <Message variant="danger">
//           <h4>{error.register.detail}</h4>
//         </Message>
//       )}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="username" className="my-2">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Form.Text>
//             {error.register && error.register.username && (
//               <Message variant="danger">{error.register.username}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="email" className="my-2">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             required
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Form.Text>
//             {error.register && error.register.email && (
//               <Message variant="danger">{error.register.email}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="firstName" className="my-2">
//           <Form.Label>First Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter First Name"
//             value={firstName}
//             onChange={(e) => {
//               setFirstName(e.currentTarget.value);
//             }}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="lastName" className="my-2">
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter Last Name"
//             value={lastName}
//             onChange={(e) => {
//               setLastName(e.currentTarget.value);
//             }}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="password" className="my-2">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             required
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Form.Text>
//             {error.register && error.register.password && (
//               <Message variant="danger">{error.register.password}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="confirmPassword" className="my-2">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             required
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => {
//               setConfirmPassword(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           {password !== confirmPassword && (
//             <Form.Text>
//               <Message variant="danger">Passwords do not match</Message>
//             </Form.Text>
//           )}
//         </Form.Group>
//         <Button type="submit" variant="primary" className="my-2">
//           Register
//         </Button>
//       </Form>
//       <Row className="py-3">
//         <Col>
//           Already Registered?
//           <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//             Login
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// }

// export default RegisterPage;


// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import Message from "../components/message";
// import UserContext from "../context/userContext";
// import FormContainer from "../components/formContainer";
// import './styless.css';

// function RegisterPage(props) {
//   // const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { userInfo, register, error } = useContext(UserContext);
//   const navigate = useNavigate();
//   let redirect = window.location.search
//   ? window.location.search.split("=")[1]
//   : "/";

//   if (redirect[0] !== "/") redirect = `/${redirect}`;

//   // useEffect(() => {
//   //   if (userInfo && userInfo.username) navigate(redirect);
//   // }, [navigate, redirect, userInfo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       // Handle password mismatch
//       return;
//     }
//     const status = await register( email, firstName, lastName, password);
//     if (status) navigate(redirect);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <FormContainer> 
//      <h1 className="heading-center">Register</h1>
     
//       {error.register && error.register.detail && (
//         <Message variant="danger">
//           <h4>{error.register.detail}</h4>
//         </Message>
//       )}
//       <Form onSubmit={handleSubmit}>
    
//         <Form.Group controlId="email" className="my-2">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             required
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Form.Text>
//             {error.register && error.register.email && (
//               <Message variant="danger">{error.register.email}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="firstName" className="my-2">
//           <Form.Label>First Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter First Name"
//             value={firstName}
//             onChange={(e) => {
//               setFirstName(e.currentTarget.value);
//             }}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="lastName" className="my-2">
//           <Form.Label>Last Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter Last Name"
//             value={lastName}
//             onChange={(e) => {
//               setLastName(e.currentTarget.value);
//             }}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="password" className="my-2">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             required
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Button onClick={togglePasswordVisibility} variant="outline-secondary" size="sm">
//             {showPassword ? "Hide" : "Show"}
//           </Button>
//           <Form.Text>
//             {error.register && error.register.password && (
//               <Message variant="danger">{error.register.password}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="confirmPassword" className="my-2">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             required
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => {
//               setConfirmPassword(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Button onClick={toggleConfirmPasswordVisibility} variant="outline-secondary" size="sm">
//             {showConfirmPassword ? "Hide" : "Show"}
//           </Button>
//           {password !== confirmPassword && (
//             <Form.Text>
//               <Message variant="danger">Passwords do not match</Message>
//             </Form.Text>
//           )}
//         </Form.Group>
//         <Button type="submit" variant="primary" className="my-2">
//           Register
//         </Button>
//       </Form>
//       <Row className="py-3">
//         <Col>
//           Already Registered?
//           <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//             Login
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// }

// export default RegisterPage;


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "../components/message";
import UserContext from "../context/userContext";
import FormContainer from "../components/formContainer";
import "./styless.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, error } = useContext(UserContext);
  const navigate = useNavigate();
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/register/", {
        email,
        first_name:firstName,
        last_name:lastName,
        password,
        password2:password
      });
      console.log("Registration successful:", response.data);
      navigate(redirect);
    } catch (error) {
      console.error("Registration error:", error.response.data);
      // Handle registration error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <FormContainer>
      <h1 className="heading-center">Register</h1>

      {error.register && error.register.detail && (
        <Message variant="danger">
          <h4>{error.register.detail}</h4>
        </Message>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.register && error.register.email && (
            <Message variant="danger">{error.register.email}</Message>
          )}
        </div>
        <div className="form-group my-2">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            type="text"
            id="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {error.register && error.register.password && (
            <Message variant="danger">{error.register.password}</Message>
          )}
        </div>
        <div className="form-group my-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="password-toggle"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
          {password !== confirmPassword && (
            <Message variant="danger">Passwords do not match</Message>
          )}
        </div>
        <button type="submit" className="btn-primary my-2">
          Register
        </button>
      </form>
      <div className="py-3">
        <p>
          Already Registered?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </p>
      </div>
    </FormContainer>
  );
}

export default RegisterPage;



