import MaterialTable from "material-table" 
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {viewMyCollaborateur,DeleteCollaborateur} from "../axiosFunc/Functions"


const ListeCollaborateurContent = () => {

   const user = useSelector(({ auth }) => auth.user);

  const columns = [
    {title:"Nom",field : "idCollaborateur.firstName"},
    {title:"Prénom",field : "idCollaborateur.lastName",},
    {title:"Specialité",field : "idCollaborateur.speciality.name"},
    {title:"E-mail",field : "idCollaborateur.email"},
    {title:"N°Téléphone",field : "idCollaborateur.tel"},
    {title:"Adresse",field : "idCollaborateur.adresse"},
  ]

  const [myCollaborateur,setMyCollaborateur]= useState([])

  const displayCollaborateur = async ()=>  viewMyCollaborateur(user.uuid).then(res=>setMyCollaborateur(res.data))

useEffect(()=>{
  displayCollaborateur()
},[])


  return (
    <>
    {console.log(myCollaborateur)}
      <MaterialTable  

title="Liste Collaborateur" 
  data={myCollaborateur}
  columns={columns}

  options={{
    actionsColumnIndex : -1,
  }}

  editable={{
  onRowDelete : (oldData) => new Promise((resolve,reject)=>{
    DeleteCollaborateur(oldData._id).then(res=>displayCollaborateur().then(res => resolve()))
  }),
}}
      />
    </>
  )
}

export default ListeCollaborateurContent