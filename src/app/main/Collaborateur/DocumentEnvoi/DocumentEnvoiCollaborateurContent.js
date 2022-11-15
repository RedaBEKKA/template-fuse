import MaterialTable from "material-table" 
import moment from "moment";
import { useEffect, useState,forwardRef  } from "react";
import { useSelector } from "react-redux";
import {viewFichierEnvoye,FichierRemoveFromCollaborateur} from "../axiosFunc/Functions"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const DocumentCollaborateurContent = () => {

  const user = useSelector(({ auth }) => auth.user);

  const [myFicherEnvoye,setMyFichierEnvoye]= useState([])

  const columns = [
    {title:"Email",field : "idMedecinrecepteur.email"},
    {title:"Titre",field : "titre"},
    {title:"message",field : "message"},
    {title:"URL",field : "url",render:(row)=><a href={row.url} download>Télécharger</a>},
    {title:"Date d'envoi",field : "updatedAt",render:(row)=>moment(row.updatedAt).format("DD / MM / YYYY")}
  
  ]
const displayFichierEnvoye = ()=> viewFichierEnvoye(user.uuid).then(res=>setMyFichierEnvoye(res.data))
  useEffect(()=>{
    displayFichierEnvoye()
  },[])
  
const tableIcons = {
  Delete: forwardRef((props, ref) => <VisibilityOffIcon {...props} ref={ref} />),
}
  return (
    <>
<MaterialTable 
icons={tableIcons}
title="Fichier Medeical Reçu" 
data={myFicherEnvoye}
columns={columns}
localization={{ body: { editRow: { deleteText: 'Supprimer ce Ficheir du la vue dans ce Medecin' } } }}

options={{
  filtering:true,
  actionsColumnIndex : -1,
  loadingType : "overlay"
}}
editable={{
  onRowDelete : (oldData) => new Promise((resolve,reject)=>{
    FichierRemoveFromCollaborateur(oldData._id).then(res=> displayFichierEnvoye().then(res=>resolve()))
   

  }),
}}

/>
    </>
  )
}

export default DocumentCollaborateurContent