import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
padding: '20px',
background: '#efefef',
color: '#000000'
}

const divStyle = {
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
backgroundSize: 'cover',
height: '400px'
}

const PictureSlides = (props) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        var bCheckEnabled = true;
        var bFinishCheck = false;
     
        var img;
        var imgArray = new Array();
        var i = 1;
     
        var myInterval = setInterval(loadImage, 1);
     
            function loadImage() {
                if (bFinishCheck) {
                    clearInterval(myInterval);
                    alert('Loaded ' + i + ' image(s)!)');
                    return;
                }
     
                if (bCheckEnabled) {
        
                    bCheckEnabled = false;
                    
                    img = new Image();
                    img.onload = fExists;
                    img.onerror = fDoesntExist;
                    img.src = 'http://127.0.0.1:8887/image' + i + '.jpg';
                }
            }
            
            function fExists() {
                imgArray.push(
                    { url: img.src,
                    caption: "Slide " + i}
                    );
                i++;
                bCheckEnabled = true;
            }
            
            function fDoesntExist() {
                setImages([...imgArray,]);
                console.log('not valid')
                bFinishCheck = true;
            }
    }, [])

    return(
        <div>
            <img 
            src="http://127.0.0.1:8887/image4.jpg"
            alt="new"
            class="responsive"
            />

            <Button onClick={ p => console.log(images)}>
                test
            </Button>
        </div>
    )
}
/*
class PictureSlides extends React.Component {
    /**
     * How to load all pictures from a directory..
     * 
     * what about having a bash script which creates a json list containing the image urls
     * But wouldt it be to hard for people with no knowledge with batch files
     * 
     * ^
     * best possible way
     

    constructor() {
        super();
        this.state = {
            images: []
        }
    }

    onAddItem(value) {
        this.setState(state => {
            const images = state.images.concat(value)

            return {
                images
            }
        })
    }

     componentDidMount() {
        var bCheckEnabled = true;
        var bFinishCheck = false;
     
         var img;
         var imgArray = new Array();
         var i = 1;
     
         var myInterval = setInterval(loadImage, 1);
     
            function loadImage() {
                if (bFinishCheck) {
                    clearInterval(myInterval);
                    alert('Loaded ' + i + ' image(s)!)');
                    return;
                }
     
                if (bCheckEnabled) {
        
                    bCheckEnabled = false;
                    
                    img = new Image();
                    img.onload = fExists;
                    img.onerror = fDoesntExist;
                    img.src = 'http://127.0.0.1:8887/image' + i + '.jpg';
                    
                    this.onAddItem({
                        url: img.src,
                        caption: "Slide " + i
                    });
                }
            }
            
            function fExists() {
                imgArray.push(img);
                console.log(imgArray)
                i++;
                bCheckEnabled = true;
            }
            
            function fDoesntExist() {
                console.log('not valid')
                bFinishCheck = true;
            }
            
            
     }

    render() {
        return <div>
            <img 
            src="http://127.0.0.1:8887/image4.jpg"
            alt="new"
            class="responsive"
      />
      <Button onClick={ p => console.log(this.state.images)}>
        test
      </Button>
        </div>
    }
}
*/
export default PictureSlides;