import { Button } from '@mui/material';
import { width } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
padding: '20px',
background: '#efefef',
color: '#000000'
}

/*
const divStyle = {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
 
}
*/

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '900px',
    //maxHeight: '100%',
    maxWidth: '100%',
    marginLeft: '30px',
    marginRight: '30px',
    fitObject: 'contain'
  }


const mainStyle = {
  position:'absolute',
  top:'60px',
  right:'0px',
  bottom:'0px',
  left:'0px',
  backgroundColor: 'red',
    }
const PictureSlides = (props) => {

    
    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);

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
                    //alert('Loaded ' + i + ' image(s)!)');
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
                console.log("loaded")
                bCheckEnabled = true;
            }
            
            function fDoesntExist() {
                setImages([...imgArray,]);
                setImageLoad(true);
                console.log('not valid')
                bFinishCheck = true;
            }
    }, [])

    /***
     * 
     * <img 
                src="http://127.0.0.1:8887/image4.jpg"
                alt="new"
                class="responsive"
                />
     */

                
    if(imageLoad === true){
        return(
            <div style={{...mainStyle}}>
                <Slide duration={"20000"} transitionDuration={"2000"} height={900}>
                    {images.map((slideImage, index) => (

                        <div key={index}>
                            <div style={{...divStyle, 'backgroundImage' : `url(${slideImage.url})` }}>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>
        )
    } else {
        return(
        <div>
            <Button onClick={ p => console.log(images)}>
                test
            </Button>
        </div>
    )
    }

    
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