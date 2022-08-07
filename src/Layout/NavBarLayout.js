
import React, {Component} from 'react'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Globe } from 'react-feather';

class NavBarLayout extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }

    handleSubmit(event) {
        if(this.input.current.value.match(/^G[A-Za-z0-9]{55}/)){
            window.location.href = "./account/"+this.input.current.value
        }
        
        event.preventDefault();
    }

    render(){
        return(
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3'>Pi Explorer</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Form className='w-100' onSubmit={this.handleSubmit}>
                    <Form.Control ref={this.input} className='form-control-dark w-100' type="text" placeholder="PublicKey/Block/Transaction" />
                </Form>                
                <div className="navbar-nav">
                    <Nav.Item className='text-nowrap'>
                        <Nav.Link href="#" className='px-3'>
                            <Globe className='feather me-2'/>
                            <span>Language</span>
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </header>
        );
    }
}
export default NavBarLayout