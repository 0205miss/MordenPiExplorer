import React,{ useState } from 'react'
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { CheckCircle,XCircle } from 'react-feather';
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {en} from '../language/time'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactJson from 'react-json-view'

const formatter = buildFormatter(en)
const PiStream = (props) => {   
    
    const streamitem = props.streamdata
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [opdata, setopData] = useState({
        _links:{
            self:{
                href:""
            }
        }
    });
    
    function handleModal(data){
        delete data['self']
        delete data['transaction']
        delete data['effects']
        delete data['succeeds']
        delete data['precedes']
        setFullscreen(true);
        setShow(true);
        setopData(data)
    }

    return (
        <Accordion>
                {streamitem.map((data)=>
                    <Accordion.Item eventKey={data.txid} key={data.txid}>
                        
                        <Accordion.Header >
                            <Col className='text-truncate text-center'>{data.success ? <CheckCircle color='green'/>: <XCircle color='red'/>}</Col>
                            <Col className='text-center'>{data.txid.substring(0,4)+"..."+data.txid.substring(60)}</Col>
                            <Col className='text-center'>{data.source.substring(0,4)+"..."+data.source.substring(52)}</Col>
                            <Col className='text-truncate text-center'><TimeAgo date={data.created_at} formatter={formatter} /></Col>
                        </Accordion.Header>
                        
                        
                        <Accordion.Body>
                        {data.operation.map((op)=>{
                            
                            switch(op.type_i){
                                case 1:
                                    return(
                                        <p key={op.id}>
                                            <Button className="me-2 mb-2" onClick={() => handleModal(op)}>
                                                {op.id.substring(0,4)+"..."+op.id.substring(52)}
                                            </Button>

                                            <Link to={'/account/'+op.from}>
                                            {op.from.substring(0,4)+"..."+op.from.substring(52)}
                                            </Link>&ensp;
                                            Pay {op.amount} Pi to&ensp;
                                            <Link to={'/account/'+op.to}>
                                                {op.to.substring(0,4)+"..."+op.to.substring(52)}
                                            </Link>
                                            
                                        </p>
                                    )
                                case 15:
                                    return(
                                        <p key={op.id}></p>
                                    )
                                default:
                                    return(
                                        <p key={op.id}></p>
                                    )
                            }
                        }                        
                        )}
                        </Accordion.Body>
                    </Accordion.Item>
                )}
                <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        <a className='text-decoration-none text-warning' href={opdata._links.self.href}>
                            {opdata.id}
                        </a>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactJson name={false} style={{overflowWrap:"anywhere"}} src={opdata} theme="summerfruit" displayObjectSize={false} displayDataTypes={false} />
                    </Modal.Body>
                </Modal>
        </Accordion>
  )
}

export default PiStream