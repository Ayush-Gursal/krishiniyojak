// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import Message from "../components/message";
// import UserContext from "../context/userContext";
// import FormContainer from "../components/formContainer";
// import './styless.css';

// function LoginPage(props) {
//   const [email, setEmail] = useState(""); // Change 'username' to 'email'
//   const [password, setPassword] = useState("");
//   const { userInfo, login, error } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [searchParams,setSearchParams] = useSearchParams()
//   const redirect = searchParams.get('redirect')
//     ? "/" + searchParams.get('redirect')
//     : "/";

//   useEffect(() => {
//     if (userInfo && userInfo.username) navigate(redirect);
//   },  [navigate, redirect, userInfo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const status = await login(email, password); // Pass 'email' instead of 'username'
//     if (status) navigate(redirect);
//   };

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {error.login && error.login.detail && (
//         <Message variant="danger">
//           <h4>{error.login.detail}</h4>
//         </Message>
//       )}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="email" className=" og my-2"> {/* Change 'username' to 'email' */}
//           <Form.Label>Email</Form.Label> {/* Change 'Username' to 'Email' */}
//           <Form.Control
//             type="email" // Change type to 'email'
//             placeholder="Enter Email" // Change placeholder text
//             value={email}
//             onChange={(e) => {
//               setEmail(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Form.Text>
//             {error.login && error.login.email && (
//               <Message variant="danger">{error.login.email}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Form.Group controlId="password" className=" password my-2">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.currentTarget.value);
//             }}
//           ></Form.Control>
//           <Form.Text>
//             {error.login && error.login.password && (
//               <Message variant="danger">{error.login.password}</Message>
//             )}
//           </Form.Text>
//         </Form.Group>
//         <Button type="submit" variant="primary" className="signin my-2">
//           Sign In
//         </Button>
//       </Form>
//       <Row className="newcustomer py-3">
//         <Col>
//           New Customer?
//           <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// }

// export default LoginPage;







// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import Message from "../components/message";
// import UserContext from "../context/userContext";
// import FormContainer from "../components/formContainer";
// import './styless.css';

// function LoginPage(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { userInfo, error } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const redirect = searchParams.get('redirect') ? "/" + searchParams.get('redirect') : "/";

//   useEffect(() => {
//     if (userInfo && userInfo.username) navigate(redirect);
//   }, [navigate, redirect, userInfo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/login", {
//         email,
//         password
//       });
//       console.log("Login successful:", response.data);
//       navigate(redirect);
//     } catch (error) {
//       console.error("Login error:", error.response.data);
//       // Handle login error
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {error.login && error.login.detail && (
//         <Message variant="danger">
//           <h4>{error.login.detail}</h4>
//         </Message>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group my-2">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {error.login && error.login.email && (
//             <Message variant="danger">{error.login.email}</Message>
//           )}
//         </div>
//         <div className="form-group my-2">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error.login && error.login.password && (
//             <Message variant="danger">{error.login.password}</Message>
//           )}
//         </div>
//         <button type="submit" className="signin my-2">
//           Sign In
//         </button>
//       </form>
//       <div className="newcustomer py-3">
//         <p>
//           New Customer?{" "}
//           <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
//             Register
//           </Link>
//         </p>
//       </div>
//     </FormContainer>
//   );
// }

// export default LoginPage;



import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Message from "../components/message";
import UserContext from "../context/userContext";
import FormContainer from "../components/formContainer";
import './styless.css';

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo, login, error } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
    ? "/" + searchParams.get('redirect')
    : "/";

  useEffect(() => {
    if (userInfo && userInfo.username) navigate(redirect);
  },  [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await login(email, password);
    if (status) navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error.login && error.login.detail && (
        <Message variant="danger">
          <h4>{error.login.detail}</h4>
        </Message>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <div className="error-message">
            {error.login && error.login.email && (
              <Message variant="danger">{error.login.email}</Message>
            )}
          </div>
        </div>
        <div className="form-group password my-2">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <div className="error-message">
            {error.login && error.login.password && (
              <Message variant="danger">{error.login.password}</Message>
            )}
          </div>
        </div>
        <button type="submit" className="signin my-2">
          Sign In
        </button>
      </form>
      <div className="py-3 newcustomer">
        <p>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/home"}>
            Register
          </Link>
        </p>
      </div>
    </FormContainer>
  );
}

export default LoginPage;
