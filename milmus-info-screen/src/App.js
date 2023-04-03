import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState, useEffect } from 'react';
import PictureSlides from './components/PictureSlides';
import { Button } from '@mui/material';
import { MdDownloading } from 'react-icons/md'
import ImageSlide from './components/ImageSlide';


function App() {
  //state for the tabs
  const [value, setValue] = useState('1'); 

  //state for the image getting process
  const [images, setImages] = useState([]);
  const [imageLoad, setImageLoad] = useState(false);

  //get the images
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
              img.src = 'http://192.168.0.23:8887/image' + i + '.jpg';
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

  //functions for the tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(imageLoad === true){
    return (
      <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Bilder" value="1" />
                <Tab label="Infos" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ImageSlide images={images} ></ImageSlide>
            </TabPanel>
            <TabPanel value="2" 
            /**
             * How should we get here data from  another device maybe over the local network
             * 
             * should we consider to set to create a server and a second app maybe a native app for usage on the phone
             * everyone could sent then information which are displayed here
             * 
             * or we could create with https://reactnavigation.org/docs/getting-started a hidden page where the informations will be shared 
             * over the component properties, the con would be it would only work when the user device in the host network
             * 
             * preffered way a second independent app maybe even a website too.. send informations over a browser
            */>
              Comming soon....
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    );
  } else {
    <div>
        <h1>Loading Images... <MdDownloading/> </h1>
        <Button onClick={ p => console.log(images)}>
            test
        </Button>
      </div>
  }
}

export default App;
