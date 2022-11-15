import {Grid, Paper, TextField,Box, Avatar, Stack, Typography} from '@mui/material';
import "../../../../styles/collaborateur.css"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {viewMyCollaborateur,addCollaborateur} from "../axiosFunc/Functions"
import { useSnackbar } from "notistack";

const ChercherCollaborateurContent = () => {

  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector(({ auth }) => auth.user);

  const [queryNom,setQueryNom] = useState('')
  const [nomResult,setNomResult] = useState([])

  const [isCollaborateur,setIsCollaborateur] = useState([])

  const searchByName = ()=>{
    if(!queryNom) {
      setNomResult([])
      return false
    };
    (
      async ()=>{
       await axios.get(`${process.env.REACT_APP_URL}/patient/search`,{
          params : {
            nom : queryNom
          }
        }).then(res => {setNomResult(res.data)})
      }
    )()
  }

  const handleChangeNom = (e) => {
    setQueryNom(e.target.value);
    searchByName();
  };


  const handleClick = (cid) => {
    let values = {
      "idMedecin" : user.uuid,
      "idCollaborateur" : cid
    }
    addCollaborateur(values).then(res =>  enqueueSnackbar(res.data.success, { variant: "success" }))
  }

  useEffect(()=>{
    (
      async ()=>{
        viewMyCollaborateur(user.uuid).then(res => {
          res.data.forEach((c)=>{setIsCollaborateur(isCollaborateur => [...isCollaborateur, c.idCollaborateur._id])})
        })
      }
    )()
  },[isCollaborateur])

  return (
    <>

      <TextField label="Chercher..." variant="outlined"  className='chercher'  value={queryNom} onChange={handleChangeNom}/>
      <Grid container spacing={2}>
      {nomResult.map((medecin,idx) => (
medecin._id !== user.uuid &&

      <Grid item xs={12} sm={6}   md={4} key={idx}>
      <Paper elevation={3} className="medecin_card">
      <Stack direction="row" spacing={2}>
    <Box className="medecin_avatar"><Avatar alt={medecin.firstName.toUpperCase()+" "+medecin.lastName.toUpperCase()}  sx={{bgcolor: '#1b2330', width: 80, height: 80 }}/></Box>
   <Box className='medecin_infos'>
    <Typography className="medecin_name" variant='h6'>{medecin.firstName.toUpperCase()+" "+medecin.lastName.toUpperCase()} </Typography>
    <Typography className="medecin_specialite">{medecin.specialitie}</Typography>
{
  
  isCollaborateur.indexOf(medecin._id) != -1
    ?

<Typography variant='h5'>collaborateur</Typography>
    :
    <>
    <PersonAddIcon sx={{ fontSize: 40,marginBottom:'10px' }} onClick={()=>handleClick(medecin._id)} />

    </>
    }
    </Box>
    </Stack>
</Paper>
</Grid>

      ))}








</Grid>

    </>
  )
}

export default ChercherCollaborateurContent