import React,{ useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import PiStream from '../PiInfo/PiStream';
import StellarSdk from 'stellar-sdk';
//17324966064164906
const server = new StellarSdk.Server('https://api.mainnet.minepi.com');
let last_cursor
export default function Explorer(){
    useEffect(() => {
        let stream = server.operations()
        .cursor("now")
        .stream({
            onmessage: opHandler
        })
        
    },[]);
    var opHandler = function (opResponse) {
        //console.log(opResponse)
        let time = new Date(opResponse.created_at).toUTCString()
        if(opResponse.transaction_hash==last_cursor){
            updatestream(streamitem=>[{...streamitem[0],operation:[
                ...streamitem[0].operation,opResponse
            ]},...streamitem.slice(1)])
        }else{
            let txdata = {
                success:opResponse.transaction_successful,
                txid:opResponse.transaction_hash,
                source:opResponse.source_account,
                created_at:time,
                operation:[opResponse]
            }
            updatestream(streamitem=>[txdata,...streamitem])
        }
        last_cursor = opResponse.transaction_hash
        
    };
    const [streamitem,updatestream] = useState([])
    return(
        <Container fluid="md" className='fullpage_frame'>
            
            <div className='frame_content rounded'>
                <div className='d-flex' id="tx_title">
                    <Col className="h6">Status</Col>
                    <Col className="h6">Transaction</Col>
                    <Col className="h6">Account</Col>
                    <Col className="h6">Time</Col>                        
                </div>
                <PiStream className='stream' streamdata={streamitem}/>
            </div>
        </Container>
    )
}