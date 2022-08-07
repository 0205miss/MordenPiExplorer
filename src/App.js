import { Routes, Route} from "react-router-dom";
import React, {Component} from 'react'
import './App.css';
import NavBarLayout from "./Layout/NavBarLayout";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SideBarLayout from "./Layout/SideBarLayout";
import Explorer from "./Layout/ExplorerStream";
import NotFound from './Layout/404'

function App () {
  return (
    <div className="App">
      <NavBarLayout/>
      <Container fluid>
        <Row>
          <SideBarLayout/>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="/status" element={<></>} />
                <Route path="/explorer" element={<Explorer/>} />
                <Route path="/account/:address" element={<></>} />
                <Route path="/transaction/:txid" element={<></>} />
                <Route path="/block/:sequence" element={<></>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default App;