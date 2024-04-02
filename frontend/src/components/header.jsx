import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../context/userContext";
import LogoImage from "./Treelogo.png"; // Import the image
import './styles.css';


// import SearchBox from "./searchBox";

function Header({keyword,setKeyword}) {
  const { userInfo } = useContext(UserContext);

  return (
    <header >
      {/* bg="" variant="" */}
      <Navbar    expand="lg" collapseOnSelect style={{ paddingTop: '0.4rem', paddingBottom: '0.4rem',  backgroundColor: ' rgb(137, 150, 78)'  }}>
        <Container className="mainhead">
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* Add the image as logo */}
              <img
                src={LogoImage}
                alt="Logo"
                style={{ height: 'auto', maxHeight: '90px' }} // Adjust height as needed
                
              />
              <span style={{ marginLeft: '10px', fontSize: '24px', marginTop: '10px' }}>कृषि नियोजक</span>
            </Navbar.Brand>
          </LinkContainer>
          {/* <SearchBox keyword={keyword} setKeyword={setKeyword}/> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" caetnames ms-auto "  >
            
             <LinkContainer to="/home" style={{color: "black"}}>                   
                <Nav.Link>
                  <i className="fa-solid fa-farm dark-icon" />Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/prediction" style={{color: "black"}}>                   
                <Nav.Link>
                  <i className="fa-solid fa-farm dark-icon" />Prediction
                </Nav.Link>
              </LinkContainer>
              
              {/* weather Updates */}
              <LinkContainer to="/Marketplace" style={{color: "black"}}>                   
                <Nav.Link>
                  <i className="fa-solid fa-farm dark-icon" />Market Place
                </Nav.Link>
              </LinkContainer>
              {/* Analytics */}
              <LinkContainer to="/analytics" style={{color: "black"}}>
                <Nav.Link>
                  <i className="fa-solid fa-farm dark-icon" />Analysis
                </Nav.Link>
              </LinkContainer>  
              <LinkContainer to="/chat" style={{color: "black"}}>
                <Nav.Link>
                  <i className="fa-solid fa-farm dark-icon" />Chat Bot
                </Nav.Link>
              </LinkContainer>  
              {userInfo && (
                <NavDropdown   title={userInfo.username} id="username " >
                  <LinkContainer to="/profile" style={{color: "black"}}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {!userInfo && (
                <LinkContainer to="/login" style={{color: "black"}}>
                  <Nav.Link>
                    <i className=" username fas fa-user" /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
