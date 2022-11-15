import {useEffect, useState} from "react"
import MaterialTable from "material-table" 
import PatientDetails from "./patientDetails";
import {viewMyPatients} from "./axiosFunc/Functions"
import { useSelector } from "react-redux";
import { Box } from "@mui/material";



const PatientList = () => {

  const user = useSelector(({ auth }) => auth.user);

 var idMedecin = user.uuid;

const [openRightDrawer, setOpenRightDrawer] = useState(false);
const [myPatients,setMyPatients]= useState([])
const [choosenPatient,setChoosenPatient ] = useState({})



const columns = [
  {title:"Nom",field : "nom"},
  {title:"Prénom",field : "prenom"},
  {title:"E-mail",field : "email"},
  {title:"N°Téléphone",field : "tel"}

]

useEffect(()=>{
  viewMyPatients(idMedecin).then(res=>setMyPatients(res.data.idPatients))
},[])


  return (
    <Box>
<MaterialTable 

  title="A un Compte" 
  data={myPatients}
  columns={columns}
  options={{
    filtering:true,
    exportButton:true,
    actionsColumnIndex: -1,
  }}
  actions={[
            {
              icon: 'visibilityIcon',
              onClick:  (event, rowData) => {
               setOpenRightDrawer(true)
               setChoosenPatient(rowData)
              }
              }]}
 
/>
    <PatientDetails openRightDrawer={openRightDrawer} setOpenRightDrawer={setOpenRightDrawer} choosenPatient={choosenPatient}/>
    </Box>
  )
}

export default PatientList