import {useEffect, useState} from "react"
import MaterialTable from "material-table" 
import PatientDetails from "./patientDetails";
import {viewMyPatientsNoAccount,addPatientsNoAccount,modifierPatientsNoAccount,deletePatientsNoAccount} from "./axiosFunc/Functions"
import { useSelector } from "react-redux";
import { Box } from "@mui/material";




const PatientListPasDeCompte = () => {

  const user = useSelector(({ auth }) => auth.user);

 var idMedecin = user.uuid;

const [openRightDrawer, setOpenRightDrawer] = useState(false);
const [myPatients,setMyPatients]= useState([])
const [choosenPatient,setChoosenPatient ] = useState({})



const columns = [
  {title:"Nom",field : "nom",validate:rowData=>rowData.nom===undefined || rowData.nom==="" ?"Required" : true },
  {title:"Prénom",field : "prenom",validate:rowData=>rowData.prenom===undefined || rowData.prenom===""  ?"Required" : true },
  {title:"E-mail",field : "email"},
  {title:"N°Téléphone",field : "tel",validate:rowData=>rowData.tel===undefined  || rowData.tel===""  ?"Required" : true },
]

const displayPatient = async ()=>  viewMyPatientsNoAccount(idMedecin).then(res=>setMyPatients(res.data))

useEffect(()=>{
  displayPatient()
},[])


  return (
    <Box mt={5}>
<MaterialTable 

  title="N'a pas de compte" 
  data={myPatients}
  columns={columns}
  options={{
    filtering:true,
    exportButton:true,
actionsColumnIndex : -1,
addRowPosition : "first"
  }}
editable={{
  onRowAdd:(newData)=>new Promise((resolve,reject)=>{
    newData["idMedecin"] = idMedecin
    addPatientsNoAccount(newData).then(res =>displayPatient().then(res=> resolve()))
    

  }),
  onRowUpdate : (newData,oldData) => new Promise((resolve,reject)=>{
    modifierPatientsNoAccount(oldData._id,newData).then(res=>displayPatient().then(res=> resolve()))
    

  }),
  onRowDelete : (oldData) => new Promise((resolve,reject)=>{
    deletePatientsNoAccount(oldData._id).then(res =>displayPatient().then(res =>resolve() ))
   
    
  }),
}}
/>
    </Box>
  )
}

export default PatientListPasDeCompte