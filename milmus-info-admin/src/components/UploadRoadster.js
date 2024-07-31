import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../firebase_setup/firebase';
import { Button } from '@mui/material';
import React, {useState} from 'react';

const UploadRoadster = (props) => {

  const [pdfFile, setPdfFile] = useState(null);
  const [uploadPdfProgress, setUploadPdfProgress] = useState(0);


  const handleUploadEvent = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]

    console.log(e)
    if(!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadPdfProgress(progress)
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPdfFile(downloadURL)
          console.log('ready to pass url')
          props.uploadUrl(downloadURL)

        })
      }
    )
  }


   return(
    <div>
      <form onSubmit={handleUploadEvent} className='form'>
        <input type='file' />
        <Button variant='outlined' type='submit'>Upload</Button>
      </form>
      {
        !pdfFile &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${uploadPdfProgress}%` }}>{uploadPdfProgress}%</div>
        </div>
      }
      {
        /*
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      
      */  }
    </div>
  )
}

export default UploadRoadster;