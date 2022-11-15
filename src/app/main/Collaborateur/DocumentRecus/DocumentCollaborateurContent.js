import MaterialTable from "material-table" 
import moment from "moment";
import { useEffect, useState,forwardRef } from "react";
import { useSelector } from "react-redux";
import {viewFichierRecu,FichierRemoveFromCollaborateur} from "../axiosFunc/Functions"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const DocumentCollaborateurContent = () => {

  const tableIcons = {
    Delete: forwardRef((props, ref) => <VisibilityOffIcon {...props} ref={ref} />),
  }

  const user = useSelector(({ auth }) => auth.user);

  const [myFicherRecu,setMyFichierRecu]= useState([])

  const columns = [
    {title:"Nom",field : "idMedecinEmetteur.firstName"},
    {title:"Titre",field : "titre"},
    {title:"message",field : "message"},
    {title:"URL",field : "url",render:(row)=><a href={row.url} download>Télécharger</a>},
    {title:"Date d'envoi",field : "updatedAt",render:(row)=>moment(row.updatedAt).format("DD / MM / YYYY")}
  
  ]

 const displayFichierRecu = ()=>  viewFichierRecu(user.uuid).then(res=>setMyFichierRecu(res.data))
  useEffect(()=>{
    displayFichierRecu()
  },[])
  

  return (
    <>

<MaterialTable 
icons={tableIcons}
localization={{ body: { editRow: { deleteText: 'Supprimer ce Ficheir dans votre vue ' } } }}
title="Fichier Medeical Reçu" 
data={myFicherRecu}
columns={columns}
options={{
  filtering:true,
  actionsColumnIndex : -1
}}
editable={{
  onRowDelete : (oldData) => new Promise((resolve,reject)=>{
    FichierRemoveFromCollaborateur(oldData._id).then(res=>displayFichierRecu().then(res => resolve()))
  
  }),
}}
/>
    </>
  )
}

export default DocumentCollaborateurContent