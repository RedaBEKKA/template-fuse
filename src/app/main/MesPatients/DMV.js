
import MaterialTable from "material-table";
import React, { useState, useCallback, useEffect } from "react";
import {listerDMV,addDMV,deleteDMV,updateDMV,partagerDMV,viewMyCollaborateur,partagerToCollaborateur} from "./axiosFunc/Functions"
import { useSelector } from "react-redux";
import moment from "moment"
import FileBase from "react-file-base64";
import { Button, Box, Modal, Select, MenuItem, TextareaAutosize,Typography } from "@mui/material";
import { useSnackbar } from "notistack";


const DMV = ({choosenPatient}) => {

  
  const [collaborateurOpen, collaborateurSetOpen] = useState(false);
  const handleOpen = () => collaborateurSetOpen(true);
  const handleClose = () => collaborateurSetOpen(false);

  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(({ auth }) => auth.user);


  const [data,setData] = useState([])
  const [image, setImage] = useState("");

const dispalyDMV = ()  => listerDMV(user.uuid).then(res=> setData(res.data))

const [myCollaborateur,setMyCollaborateur] = useState([])
const displayCollaborateur = async ()=>  viewMyCollaborateur(user.uuid).then(res=>setMyCollaborateur(res.data))

useEffect( ()=>{
  dispalyDMV()
  displayCollaborateur()
},[])



  const preventRerender = useCallback(
    (rowData) => <a href={rowData.url} download > Télécharger</a>,
    []
  );
  const editComponent = useCallback(() => {
    return (
      <FileBase
                      type="file"
                    onDone={({ base64 }) => setImage(base64)}
                    />
    );
  }, []);

  const columns = [
    {title:"Titre",field : "titre",validate:rowData=>rowData.titre===undefined || rowData.titre==="" ?"Required" : true },
    {title:"Description",field : "description"},
    {title:"Date De livrance",field : "dateDelivrance",validate:rowData=>rowData.dateDelivrance===undefined || rowData.dateDelivrance==="" ?"Required" : true,render:(row)=>moment(row.dateDelivrance).format("DD / MM / YYYY")},
    {title:"URL",field : "url", editComponent,render: preventRerender}
  
  ]
//validate:rowData=>rowData.url===undefined || rowData.url==="" ?"Required" : true,
  const [partagerVisible,setPartagerVisible] = useState('none');
  const [choosenDMV,setChoosenDmv] = useState({})

  const handleSelect = (rows)=>{
    setChoosenDmv(rows)
    if(rows.length === 0){
      setPartagerVisible('none')
    }else {
      setPartagerVisible('flex')
    }
  }

  const handlePartager = () =>{
choosenDMV.forEach((dmv)=>{
 const {_id,titre,description,url,dateDelivrance} = dmv;

const values = 
{
  "idPatient" :  choosenPatient._id,
  "titre" : titre,
  "description" : description,
  "url" : url,
  "dateDelivrance" :  dateDelivrance,
  "faitPar" : user.data.firstName + " "+user.data.lastName,
  "dealMedecin" : [
      {
          "idMedecin" : user.uuid,
          "droit" : {
              "visualiser":true
          } 
      }
  ]}
   partagerDMV(values).then(
    (res) =>{ enqueueSnackbar(res.data, { variant: "success" }), deleteDMV(_id).then(res => dispalyDMV())}
  );
})
  }

  const [dataDMV,setDataDMV] = useState({
    idMedecinrecepteur : "",
    message : "",
  })

  var {idMedecinrecepteur, message} = dataDMV;

  const handleChange = (text) => (e) =>{
    setDataDMV({...dataDMV,[text]: e.target.value })
  }


  const handlePartagerToCollaborateur =  () =>{
    var BreakException= {}
    choosenDMV.forEach(dmv => {
      const values = {
        idFichier : dmv._id,
        idPatient : dmv.idPatient,
        idMedecinEmetteur :user.uuid,
        idMedecinrecepteur : dataDMV.idMedecinrecepteur,
        titre : dmv.titre,
        message : dataDMV.message,
        url : dmv.url,
      }

      if( !values.idMedecinrecepteur) {
        enqueueSnackbar("Veuillez indique le medecin récepteur ", { variant: "info" });
        throw BreakException;
      }else if(!values.message){
        enqueueSnackbar("Veuillez Saisire Un Message Indicatif ", { variant: "info" });
        throw BreakException;
      }else{
        partagerToCollaborateur(values).then(res=>{
          if(res.data.Warning){
            enqueueSnackbar(res.data.Warning, { variant: "warning" });

          }else{
            enqueueSnackbar(res.data.success, { variant: "success" });
          }
        })
      }
    });

  }

  return (
    <>
    <Box display={partagerVisible} justifyContent="flex-end" mb={1}>
<Button variant="contained" onClick={handlePartager}>Partager</Button>&nbsp;
<Button variant="contained" onClick={handleOpen}>Partager to Collaborateur</Button>
    </Box>
      <MaterialTable
      title={`Dossier Medical  de ${choosenPatient.nom} ${choosenPatient.prenom}`}
      columns={columns}
      data={data.filter(d => d.idPatient === choosenPatient._id )}
      options={{
  filtering:false,
  search:false,
  actionsColumnIndex : -1,
  selection: true
}}
editable={{
  onRowAdd:(newData)=>new Promise((resolve,reject)=>{
  //  addDMV(newData)
  newData["url"] = image
  newData["idPatient"] = choosenPatient._id
  newData["idMedecin"] = user.uuid
  addDMV(newData).then(res=>dispalyDMV().then(res=>  
  resolve()))

  }),
  onRowUpdate : (newData,oldData) => new Promise((resolve,reject)=>{
    updateDMV(oldData._id,newData).then(res=>dispalyDMV().then(res=>  
  resolve()))
  }),

  onRowDelete : (oldData) => new Promise((resolve,reject)=>{
    deleteDMV(oldData._id).then(res=>dispalyDMV().then(res=>  
  resolve()))
  }),
}}
onSelectionChange={(rows) => handleSelect(rows)}
      />


      {/* Collaborateur model */}

<Modal
  open={collaborateurOpen}
  onClose={handleClose}
>
  <Box id="boxModal">
    <Typography id="collaborateur-modal-title" variant="h6" component="h2">
      Partager avec Un Collaborateur
    </Typography>
   <Select
   MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
   fullWidth
      onChange={handleChange("idMedecinrecepteur")}
      value={idMedecinrecepteur}
      label = "E-mail"
  >
  {
    myCollaborateur.map(c=>(
      <MenuItem value={c.idCollaborateur._id} key={c.idCollaborateur._id}>{c.idCollaborateur.email}</MenuItem>
    ))
  }
  </Select>
  <TextareaAutosize className="CollaborateurMessage" minRows={5} onChange={handleChange("message")} value={message} placeholder="Votre Message"/>
    <Button id="btn" variant="contained" onClick={handlePartagerToCollaborateur}>Partager</Button>
  </Box>
</Modal>


{/* Collaborateur model */}

</>

  );
};

export default DMV;
