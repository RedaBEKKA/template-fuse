import { Button,Box, Modal,Typography,Select,MenuItem,TextareaAutosize  } from "@mui/material";
import MaterialTable from "material-table" 
import moment from 'moment';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {viewMyCollaborateur,partagerToCollaborateur} from "./axiosFunc/Functions"
import { useSnackbar } from "notistack";

const DML = ({choosenPatient,displayDML}) => {

  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(({ auth }) => auth.user);

  const columns = [
    {title:"Titre",field : "titre"},
    {title:"Description",field : "description"},
    {title:"Date De livrance",field : "dateDelivrance",render:(row)=>moment(row.dateDelivrance).format("DD / MM / YYYY")},
    {title:"Fait Par",field : "faitPar"},
    {title:"URL",field : "url",render:(row)=><a href={row.url} download>Télécharger</a>}
  
  ]

  const [partagerVisible,setPartagerVisible] = useState('none');
  const [choosenDMV,setChoosenDmv] = useState({})

  const [collaborateurOpen, collaborateurSetOpen] = useState(false);
  const handleOpen = () => collaborateurSetOpen(true);
  const handleClose = () => collaborateurSetOpen(false);

  const [dataDML,setDataDML] = useState({
    idMedecinrecepteur : "",
    message : "",
  })



  var {idMedecinrecepteur, message} = dataDML;

  const handleChange = (text) => (e) =>{
    setDataDML({...dataDML,[text]: e.target.value })
  }
  const handleSelect = (rows)=>{
    setChoosenDmv(rows)
    if(rows.length === 0){
      setPartagerVisible('none')
    }else {
      setPartagerVisible('flex')
    }
  }

  const handlePartagerToCollaborateur =  e =>{
    var BreakException= {}
    e.preventDefault()
    choosenDMV.forEach(dml => {
      const values = {
        idFichier : dml._id,
        idPatient : dml.idPatient,
        idMedecinEmetteur :user.uuid,
        idMedecinrecepteur : dataDML.idMedecinrecepteur,
        titre : dml.titre,
        message : dataDML.message,
        url : dml.url,
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

 const [myCollaborateur,setMyCollaborateur] = useState([])
  const displayCollaborateur = async ()=>  viewMyCollaborateur(user.uuid).then(res=>setMyCollaborateur(res.data))

  useEffect(()=>{
 displayCollaborateur()
  },[])

  return (
    <div>
     <Box display={partagerVisible} justifyContent="flex-end" mb={1}>
<Button variant="contained" onClick={handleOpen}>Partager to Collaborateur</Button>
    </Box>
<MaterialTable 

title={`Dossier Medical Livré de ${choosenPatient.nom} ${choosenPatient.prenom}`}
data={displayDML.filter(d => d.idPatient === choosenPatient._id )}
columns={columns}
options={{
  filtering:false,
  search:false,
  selection: true
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
    </div>
  )
}

export default DML