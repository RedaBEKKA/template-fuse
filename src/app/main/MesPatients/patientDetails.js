import {useEffect, useState} from 'react'
import { Box, Tab,Drawer, Paper, Stack, IconButton, Grid } from "@mui/material";
import {TabContext,TabList,TabPanel} from "@mui/lab"
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DML from "./DML"
import DMV from "./DMV"
import {listerDML} from "./axiosFunc/Functions"
import { useSelector } from 'react-redux';

const patientDetails = (props) => {

  const user = useSelector(({ auth }) => auth.user);

  var idMedecin = user.uuid;

 const {openRightDrawer,setOpenRightDrawer,choosenPatient } = props
 const [value, setValue] = useState("1")
 const [displayDML,setDisplayDML] =useState([])

 const handleChange = (event, newValue) => {
  setValue(newValue);
};

useEffect(()=>{
  listerDML(idMedecin).then(res=>setDisplayDML(res.data))
},[])

  return (
    <Drawer
      anchor="right"
      open={openRightDrawer}
        onClose={() => setOpenRightDrawer(false)}
    >
  <Box id='patientContainer'>
<Paper id="patientOptions">
<Stack direction="row" justifyContent='flex-end'>
<IconButton aria-label="print"><PrintIcon /></IconButton>
<IconButton aria-label="download"><DownloadIcon /></IconButton>
<IconButton aria-label="edit"><EditIcon /></IconButton>
<IconButton aria-label="delete"><DeleteIcon /></IconButton>
</Stack>

</Paper>



<Box id="patientDetails">
<TabContext value={value} >
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList aria-label='Patient Informations' onChange={handleChange}>
      <Tab label="Dossier Medical Livré" value="1"/>
      <Tab label="Dossier Medical Versé" value="2"/>
      <Tab label="Autre Information" value="3"/>
    </TabList>



    </Box>
    
    <TabPanel value="1" index={0}>
        <DML choosenPatient={choosenPatient} displayDML={displayDML}/>
      </TabPanel>
      <TabPanel value="2" index={1}>
        <DMV choosenPatient={choosenPatient} />
      </TabPanel>
      <TabPanel value="3"index={2}>
      <Grid container spacing={2}>
  <Grid item xs={6} className="medicament">
    <h2>Antécédent</h2>
    {
    choosenPatient.antecedent?.map(t=>(
<div key={t._id}>
  <b>Motif : </b> {t.motif }<br />
  <b>durée : </b> {t.durée }<br />
  <b>traitement Suivi : </b> {t.traitementSuivi }<br />
  <hr />
</div>
    ))}
  </Grid>
  <Grid item xs={6}  className="traitement">
<h2>Traitement</h2>
   {
    choosenPatient.traitement?.map(t=>(
<div key={t._id}>
  <b>Motif : </b> {t.motif }<br />
  <b>durée : </b> {t.durée }<br />
  <b>traitement Suivi : </b> {t.traitementSuivi }<br />
  <hr />
</div>
    ))}
  </Grid>
  </Grid>
      </TabPanel>
      </TabContext>
      </Box>
    </Box>
    </Drawer>
  )
}

export default patientDetails