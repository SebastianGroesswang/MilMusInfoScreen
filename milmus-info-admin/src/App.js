import logo from './logo.svg';
import './App.css';
import { Button, Input, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormGroup, FormControlLabel, Grid } from '@mui/material';
import { db } from "./firebase_setup/firebase";
import { onValue, ref, set, remove } from "firebase/database";
import React, { useEffect, useState } from 'react';
import {uid} from 'uid'
import { AiFillDelete, AiOutlineSave ,AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from "react-icons/fa";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UploadRoadster from "./components/UploadRoadster";

const getTextDecoration = (value) => {
  return dayjs().isAfter(dayjs(value.date, "MM-DD-YYYY")) && dayjs().date() != dayjs(value.date, "MM-DD-YYYY").date() ? "line-through" : "none"
}

function App() {
  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)


  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([])
  const [kindOfConcert, setKindOfConcert] = useState('')
  const [programmOfConcert, setProgrammOfConcert] = useState('')
  const [clothesOfConcert, setClothesOfConcert] = useState('')
  const [additionalThingsForConcert, setAdditionalThingsForConcert] = useState('')
  const [standingConcert, setStandingConcert] = useState(false)
  const [militaryReception, setMilitaryReception] = useState(true)
  const [listOfProgramm, setListOfProgramm] = useState([]);
  const [whiteBelt, setWhiteBelt] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [editMode, setEditMode] = useState(false);
  const [recentUid, setRecentUid] = useState("");
  
  const writeMessage = (isUpdate) => {
    console.log('test')

    const createduid = uid();
    var uuid
    if(isUpdate){
      uuid = recentUid;
    } else {
      uuid = createduid
    }

    switch(kindOfConcert){
      case 'Konzert':
        set(ref(db, `/infos/${uuid}`), {
          title,
          date : date.format("MM-DD-YYYY"),
          kindOfConcert,
          standingConcert,
          listOfProgramm,
          clothesOfConcert,
          additionalThingsForConcert,
          message,
          whiteBelt,
          postedOn : Date.now(),
          uuid
        });
        return
      case 'Militärische Ausrückung':
        set(ref(db, `/infos/${uuid}`), {
          title,
          date : date.format("MM-DD-YYYY"),
          kindOfConcert,
          militaryReception,
          listOfProgramm,
          clothesOfConcert,
          message,
          whiteBelt,
          postedOn : Date.now(),
          uuid
        });
        return
      default:

        set(ref(db, `/infos/${uuid}`), {
          title,
          date : date.format("MM-DD-YYYY"),
          kindOfConcert,
          message,
          postedOn : Date.now(),
          uuid
        });

        return
    }
  }
  
  const resetFields = () => {
    setAdditionalThingsForConcert('')
    setMessage('')
    setTitle('')
    setProgrammOfConcert('')
    setListOfProgramm([])
    setDate(dayjs())
    setRecentUid("")
  }

  const pushSend = () => {
    console.log('fdasfd')
    writeMessage(false);

    resetFields()

    if(messageList.length > 10){
      var msg = messageList.sort((a,b) => a.postedOn > b.postedOn ? 1 : -1)[0]
      remove(ref(db, `/infos/${msg.uuid}`));
    }
  }

  const handleSelectChange = (event) => {
    setProgrammOfConcert('')
    setListOfProgramm([])
    setKindOfConcert(event.target.value);
    console.log('change')
  };

  const showClothes = () => {
    return <div>
        <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%',
        }}>
        <FormControl fullWidth>
          <InputLabel id='kind_of_concert_clothes_label'>Adjustierung</InputLabel>
          <Select
            labelId='kind_of_concert_clothes_label'
            id='kind_of_concert_clothes_select'
            label='Adjustierung'
            value={clothesOfConcert}
            onChange={(event) => setClothesOfConcert(event.target.value) }
          >
            <MenuItem value={'Gala'}>Gala</MenuItem>
            <MenuItem value={'A-Garnitur'}>A-Garnitur</MenuItem>
            <MenuItem value={'TAz'}>TAz</MenuItem>
            <MenuItem value={'TAz + Regenjacke'}>TAz + Regenjacke</MenuItem>
            <MenuItem value={'TAz + Schwere Jacke'}>TAz + Schwere Jacke</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%',
      }}>
        
        <FormGroup>
          <FormControlLabel 
            control={
              <Checkbox
                checked={whiteBelt}
                onChange={(event) => setWhiteBelt(event.target.checked)}
              />}
            label="Weißes Riemenzeug"
          />
        </FormGroup>
      </div>
    </div>
  }

  const showProgramm = () => {
    return <div>
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%',
        }}>
        <TextField placeholder='Programm' variant='outlined' style={{width:'80%'}}  value={programmOfConcert} onChange={(e) => setProgrammOfConcert(e.target.value)}/>
        <Button variant='outlined' style={{width:'18%', height:'56px', marginLeft:'2%'}}
        onClick={() => {
          setListOfProgramm([...listOfProgramm, programmOfConcert])
          setProgrammOfConcert('')
        }}
        ><FaPlus /></Button>
      </div>

      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%',
        }}>

        <div>
          <Grid container spacing={2}>
            {listOfProgramm.map(piece => 
            <Grid item sx>
              <div>
                {piece} 
                <Button variant='outlined' onClick={() => {
                  setListOfProgramm(listOfProgramm.filter(e => e !== piece))
                  }}> 
                  <AiFillDelete/>
                </Button>
              </div>
              
            </Grid>)}
          </Grid>
        </div>
      </div>
    </div>
  }

  const renderSwitch = (param) => {
      switch (kindOfConcert) {
        case 'Konzert':
          return <div>

            {showProgramm()};
            {showClothes()};

            <div style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              marginLeft: '10%',
              marginRight: '10%',
              }}>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Checkbox
                      checked={standingConcert}
                      onChange={(event) => setStandingConcert(event.target.checked)}
                    />}
                  label="StandKonzert"
                />
              </FormGroup>
              
            </div>

            <div style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              marginLeft: '10%',
              marginRight: '10%',
              marginTop: '2%',
              marginBottom: '20px'
              }}>
              <TextField placeholder='Mitnehmen: z.B. Notenständer' variant='outlined' fullWidth multiline style={{width:'100%'}} value={additionalThingsForConcert} onChange={(e) => setAdditionalThingsForConcert(e.target.value)}></TextField>
            </div>
          </div>
        case 'Militärische Ausrückung':
          return <div>
            <div style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              marginLeft: '10%',
              marginRight: '10%',
              marginTop: '2%',
              marginBottom: '20px'
              }}>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Checkbox
                      checked={militaryReception}
                      onChange={(event) => setMilitaryReception(event.target.checked)}
                    />}
                  label="Militärischer Empfang"
                />
              </FormGroup>
              
            </div>

            {showProgramm()}

            {showClothes()}
          </div>
        case 'Info':
          return <div>
          </div>
        case 'Befehl':
          return <div>
          </div>
        default:
          return null
      }
  }

  useEffect(() => {
    
    onValue(ref(db, `/infos/`), snapshot => {
      setMessageList([])
      const data = snapshot.val();
      console.log(data)

      if(data !== null){
        console.log(messageList)
        Object.values(data).map(msg => {
          setMessageList((oldArr) => [...oldArr, msg])
        })

        console.log(messageList)
      }
    })
  }, [])

  return (
    <div style={{
      alignItems:'center',
      justifyContent:'center'
      }}
      >

    <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%',
        marginBottom: '20px'
        }}
      >
        <UploadRoadster uploadUrl={ (url) => {
          set(ref(db, `/roadster/dp`), {
            downloadUrl: url
          });
        }}/>

      </div>
      <hr/>
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%',
        marginBottom: '20px'
        }}
      >


        <TextField variant='outlined' style={{width: '90%', marginRight: '10px'}} placeholder='Titel' value={title} onChange={(e) => setTitle(e.target.value)}>Titel</TextField>

        <FormControl fullWidth>
          <InputLabel id='kind_of_concert_label'>Art der Ausrückung</InputLabel>
          <Select
            labelId='kind_of_concert_label'
            id='kind_of_concert_select'
            label='Art der Ausrückung'
            value={kindOfConcert}
            onChange={handleSelectChange}
            disabled={editMode}
          >
            <MenuItem value={'Info'}>Info</MenuItem>
            <MenuItem value={'Konzert'}>Konzert</MenuItem>
            <MenuItem value={'Militärische Ausrückung'}>Militärische Ausrückung</MenuItem>
            <MenuItem value={'Befehl'}>Befehl</MenuItem>
          </Select>
        </FormControl>

        <div hidden={editMode}>
          <Button variant='outlined' style={{marginLeft: '10px', width: '10%', minHeight: '56px'}} onClick={pushSend} disabled={title === ''}>Send</Button>
        </div>
        <div hidden={!editMode}>
          <Button 
            variant='outlined' 
            style={{marginLeft: '10px', width: '10%', minHeight: '56px'}} 
            disabled={title === ''}
            onClick={() => {
              resetFields();
              setEditMode(!editMode)
            }}
          >
            <AiFillCloseCircle />
          </Button>
        </div>
        <div hidden={!editMode}>
          <Button 
            variant='outlined' 
            style={{marginLeft: '10px', width: '10%', minHeight: '56px'}} 
            disabled={title === ''}
            onClick={() => {
              writeMessage(true);
              resetFields();
              setEditMode(!editMode)
            }}
          >
            <AiOutlineSave />
          </Button>
        </div>
      </div>
        
    
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          marginLeft: '10%',
          marginRight: '10%',
          marginBottom: '20px',
          marginTop: '2%'
        }}
        >
          Datum der Ausrückung:
          <DatePicker label="Datum" value={date} onChange={(newValue) => setDate(newValue)} format="DD.MM.YYYY" sx={{marginLeft: "20px"}}/>
        </div>
      </LocalizationProvider>

    {renderSwitch(kindOfConcert)}
    
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginLeft: '10%',
      marginRight: '10%',
      marginBottom: '20px',
      marginTop: '2%'
    }}
    >
      <TextField placeholder='Zusätzliche Informationen' variant='outlined' fullWidth multiline minRows={3} style={{width:'100%'}} value={message} onChange={(e) => setMessage(e.target.value)}></TextField>
    </div>

    
    <div
    style={{
      alignItems:'center',
      justifyContent:'center'
      }}>

      {messageList.sort((a,b) => a.postedOn < b.postedOn ? 1 : -1).map((msg) => (
        <div style={{
          borderWidth: 'medium',
          borderStyle: 'dashed',
          borderRadius: '15px',
          margin: '5px',
          marginLeft: '10%',
          marginRight: '10%',
          textAlign: 'center',
          textDecoration : getTextDecoration(msg)
        }}>
          <div
            style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
            }}>
            <div
            style={{
              minWidth:'400px'
            }}
            >
              <div style={{
                    fontSize: '30px'
                }}>
                    {dayjs(msg.date, "MM-DD-YYYY").format("DD.MM.YYYY")} - {msg.title}
                </div>
              {msg.message}
              {msg.kindOfConcert}
            </div>
            
            <Button variant='outlined' onClick={() => {
              setEditMode(true)
              setTitle(msg.title)
              setMessage(msg?.message)
              setKindOfConcert(msg?.kindOfConcert)
              setProgrammOfConcert(msg?.programmOfConcert)
              setClothesOfConcert(msg?.clothesOfConcert)
              setAdditionalThingsForConcert(msg?.additionalThingsForConcert)
              setStandingConcert(msg?.standingConcert)
              setDate(dayjs(msg.date))
              setMilitaryReception(msg?.militaryReception)
              setListOfProgramm(msg?.listOfProgramm === undefined ? [] : msg.listOfProgramm)
              setRecentUid(msg.uuid)
            }}>
              <AiTwotoneEdit/>
            </Button>

            <Button variant='outlined' onClick={() => {
              remove(ref(db, `/infos/${msg.uuid}`));
            }}>
              <AiFillDelete/>
            </Button>
            
          </div>

        </div>
      ))}
    </div>
    
  </div>
  )

}

export default App;
