import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
//import { Viewer, Worker } from '@react-pdf-viewer/core';

//import '@react-pdf-viewer/core/lib/styles/index.css';

const ShowCurrentRoster = (props) => {
    const isWin10 = false;
    
    if(isWin10){
        /*
        return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '950px',
                }}
            >
                <Viewer fileUrl="http://192.168.0.120:8000/dp.pdf" defaultScale={1.6}/>
            </div>
        </Worker>
    );*/
    } else {
        return (
            <div>
                <img src={"http://192.168.0.120:8000/dp.png"}
                alt='picture of roster'
                style={{maxWidth: "100%", maxHeight: "100%"}}
                /> 
            </div>
        )
    }
}

export default ShowCurrentRoster;