import Nav from 'react-bootstrap/Nav';
import React, {Component} from 'react'
import { BarChart2,Tv,GitHub } from 'react-feather';


class SideBarLayout extends React.Component{
    render(){
        return(
            <nav id="sidebarMenu" className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
                <div className="position-sticky pt-3">
                
                    <Nav className='flex-column' activeKey={window.location.pathname} as="ul">
                    <Nav.Item as="li">
                        <Nav.Link eventKey="/status" href={window.location.protocol + "//" +window.location.host+"/status"}>
                            <BarChart2 className='feather'/>
                            NetworkStatus
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="/explorer" href={window.location.protocol + "//" +window.location.host+"/explorer"}>
                            <Tv className='feather'/>
                            Pi Streaming
                        </Nav.Link>
                    </Nav.Item>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Resource</span>
                    </h6>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="GitHub" href="#">
                            <GitHub className='feather'/>
                            GitHub
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                </div>
            </nav>
        );
    }
}
export default SideBarLayout