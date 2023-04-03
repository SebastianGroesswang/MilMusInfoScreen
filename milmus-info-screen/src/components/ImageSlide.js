import { Button } from '@mui/material';
import { width } from '@mui/system';
import React, { useState, useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const PictureSlides = (props) => {

    const [current, setCurrent] = useState(0);
    const length = props.images.length;
    

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('now');
            nextSlide();
        }, 15000)
      
        return () => clearInterval(interval);
    })

    const nextSlide = () => {
        console.log('changed slide')
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current -1);
    }

    if(!Array.isArray(props.images) || props.images.length <= 0){
        return null;
    }

    return(
        <div>
            <section className='slider'>
                <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
                <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>

                {props.images.map((img, index) => {
                    return (
                        <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                        >

                            {index === current && (
                                <img src={img.url}
                                alt='picture of Military Band Upper Austria'
                                className='image'/> 
                            )}
                        </div>
                    );
                })}
            </section>
        </div>
    )
}

export default PictureSlides;