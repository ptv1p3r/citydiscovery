import Routes from "../../services/routes";
import React, { useState, Suspense, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from "../../services/context";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

import {useTranslation} from "react-i18next";

import flag_pt from "../../assets/icons/pt_32_32.png";
import flag_en from "../../assets/icons/uk_32_32.png";

function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const {t, i18n} = useTranslation('users');
    const history = useHistory();
    const today = new Date();
    const year = today.getFullYear();

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            alert("onload:" + isAuthenticated);
            // await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        setIsAuthenticating(false);
    }

    function handleLogout() {
        // await Auth.signOut();
        userHasAuthenticated(false);
        history.push("/login");
    }

  return (
      !isAuthenticating && (
        <Suspense fallback="loading">
          <div className="App container-fluid noPadding">
              <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                  <LinkContainer to="/">
                      <Navbar.Brand className="font-weight-bold text-muted">
                          City Discovery
                      </Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                      <Nav activeKey={window.location.pathname}>
                          {isAuthenticated ? (
                              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                          ) : (
                              <>
                                  <LinkContainer to="/signup">
                                      <Nav.Link>Signup</Nav.Link>
                                  </LinkContainer>
                                  {/*<LinkContainer to="/login">*/}
                                  {/*    <Nav.Link>Login</Nav.Link>*/}
                                  {/*</LinkContainer>*/}
                              </>
                          )}
                      </Nav>
                      <Nav className='btn'>
                          <img src={flag_pt} onClick={() => i18n.changeLanguage('pt')}></img>
                          <img src={flag_en} onClick={() => i18n.changeLanguage('en')}></img>
                      </Nav>
                  </Navbar.Collapse>
              </Navbar>
              {/*add session to context and pass it trough routes */}
              <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Routes />
              </AppContext.Provider>
              <div className='footer'>
                  <Navbar fixed="bottom" />
                    @Copyright {year} City Discovery
                  <Navbar />
              </div>
          </div>
      </Suspense>
      )
  );
}

export default App;
