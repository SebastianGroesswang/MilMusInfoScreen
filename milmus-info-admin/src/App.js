import logo from './logo.svg';
import './App.css';
import { Button, Input, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormGroup, FormControlLabel, Grid } from '@mui/material';
import { db } from "./firebase_setup/firebase";
import { onValue, ref, set, remove } from "firebase/database";
import React, { useEffect, useState } from 'react';
import {uid} from 'uid'
import { AiFillDelete } from 'react-icons/ai'
import { FaPlus } from "react-icons/fa";

function App() {

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([])
  const [kindOfConcert, setKindOfConcert] = useState('')
  const [programmOfConcert, setProgrammOfConcert] = useState('')
  const [clothesOfConcert, setClothesOfConcert] = useState('')
  const [additionalThingsForConcert, setAdditionalThingsForConcert] = useState('')
  const [standingConcert, setStandingConcert] = useState(false)
  const [militaryReception, setMilitaryReception] = useState(true)
  const [choralMilitaryReception, setChoralMilitaryReception] = useState('')
  const [marchesMilitaryReception, setMarchesMilitaryReception] = useState('')
  const [listOfProgramm, setListOfProgramm] = useState([]);

  const writeMessage = () => {
    console.log('test')
    const uuid = uid();

    switch(kindOfConcert){
      case 'Konzert':
        set(ref(db, `/${uuid}`), {
          title,
          kindOfConcert,
          standingConcert,
          listOfProgramm,
          clothesOfConcert,
          additionalThingsForConcert,
          message,
          postedOn : Date.now(),
          uuid
        });
        return
      case 'Militärische Ausrückung':
        set(ref(db, `/${uuid}`), {
          title,
          kindOfConcert,
          militaryReception,
          listOfProgramm,
          clothesOfConcert,
          message,
          postedOn : Date.now(),
          uuid
        });
        return
      default:

        set(ref(db, `/${uuid}`), {
          title,
          kindOfConcert,
          message,
          postedOn : Date.now(),
          uuid
        });

        return
    }

    

    console.log('sending')
  }
  
  const resetFields = () => {
    setAdditionalThingsForConcert('')
    setChoralMilitaryReception('')
    setMessage('')
    setTitle('')
    setProgrammOfConcert('')
    setListOfProgramm([])
  }

  const pushSend = () => {
    console.log('fdasfd')
    writeMessage();

    resetFields()

    if(messageList.length > 10){
      var msg = messageList.sort((a,b) => a.postedOn > b.postedOn ? 1 : -1)[0]
      remove(ref(db, `/${msg.uuid}`));
    }
  }

  const handleSelectChange = (event) => {
    setProgrammOfConcert('')
    setListOfProgramm([])
    setKindOfConcert(event.target.value);
    console.log('change')
  };

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
                  <MenuItem value={'Katz03'}>Katz03</MenuItem>
                  <MenuItem value={'Katz03 + Regenjacke'}>Katz03 + Regenjacke</MenuItem>
                  <MenuItem value={'Katz03 + Schwere Jacke'}>Katz03 + Schwere Jacke</MenuItem>
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
              marginBottom: '20px'
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

            <div style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              marginLeft: '10%',
              marginRight: '10%',
              marginTop: '2%',
              marginBottom: '20px'
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
                  <MenuItem value={'Katz03'}>Katz03</MenuItem>
                  <MenuItem value={'Katz03 + Regenjacke'}>Katz03 + Regenjacke</MenuItem>
                  <MenuItem value={'Katz03 + Schwere Jacke'}>Katz03 + Schwere Jacke</MenuItem>
                </Select>
              </FormControl>
            </div>
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
    
    onValue(ref(db), snapshot => {
      setMessageList([])
      const data = snapshot.val();

      if(data !== null){
        Object.values(data).map(msg => {
          setMessageList((oldArr) => [...oldArr, msg])
        })
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
        <TextField variant='outlined' style={{width: '90%', marginRight: '10px'}} placeholder='Titel' value={title} onChange={(e) => setTitle(e.target.value)}>Titel</TextField>

        <FormControl fullWidth>
          <InputLabel id='kind_of_concert_label'>Art der Ausrückung</InputLabel>
          <Select
            labelId='kind_of_concert_label'
            id='kind_of_concert_select'
            label='Art der Ausrückung'
            value={kindOfConcert}
            onChange={handleSelectChange}
          >
            <MenuItem value={'Info'}>Info</MenuItem>
            <MenuItem value={'Konzert'}>Konzert</MenuItem>
            <MenuItem value={'Militärische Ausrückung'}>Militärische Ausrückung</MenuItem>
            <MenuItem value={'Befehl'}>Befehl</MenuItem>
          </Select>
        </FormControl>

        <Button variant='outlined' style={{width: '10%', minHeight: '56px'}} onClick={pushSend} disabled={title === ''}>Send</Button>
      </div>
    
    {renderSwitch(kindOfConcert)}
    
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginLeft: '10%',
      marginRight: '10%',
      marginBottom: '20px'
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
          textAlign: 'center'
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
                    {msg.title}
                </div>
              {msg.message}
              {msg.kindOfConcert}
            </div>
            
            <Button variant='outlined' onClick={() => {
              remove(ref(db, `/${msg.uuid}`));
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
