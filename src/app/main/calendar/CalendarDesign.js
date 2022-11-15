import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useSelector } from "react-redux";

import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  ListItemText,
  ListItem,
  List,
  Stack,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "../../../styles/calendar.css";
import { useEffect, useState } from "react";
import {
  createEvent,
  listEvent,
  modifierEvent,
  deleteEvent,
  loadMedecin,
  addPatient,
  partagerURL,
} from "./axiosFunc/Functions";
import moment from "moment";
import listPlugin from "@fullcalendar/list";
import CircleIcon from "@mui/icons-material/Circle";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const CalendarDesign = () => {

  // URL MODEL 
  const [openURLModel, setOpenURLModel] = useState(false);
  const handleOpenURLModel = () => setOpenURLModel(true);
  const handleCloseURLModel = () => setOpenURLModel(false);
const [choosenRDVenLigne,setCoosenRDVenLigne] = useState("")
  const handleChangeURL = e =>{
    useDisplay({...display,meetURL : e.target.value})
  }
  
  const handleClickURL = () => {
    partagerURL(choosenRDVenLigne,display.meetURL).then(
      (res) => enqueueSnackbar(res.data.success, { variant: "success" })
    );
  }
  // URL MODEL

  const user = useSelector(({ auth }) => auth.user);
  const { enqueueSnackbar } = useSnackbar();

  const handelSelect = (info) => {
    handleOpen();
    setCalendarValues({
      ...calendarValues,
      start: info.startStr,
      end: info.endStr,
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [diasbledChrono, setDisabledChrono] = useState(false);

  const [calendarValues, setCalendarValues] = useState({
    title: "",
    start: "",
    end: "",
    color: "gray",
    Comment: "Indisponible",
    id: "",
    medecinID : user.uuid,
  });

  const changeCalendarValues = (e) => {
    setCalendarValues({ ...calendarValues, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    createEvent(calendarValues)
      .then((res) => {
        setCalendarValues({ ...calendarValues, title: "" });
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  const handelCancel = () => {
    setCalendarValues({ ...calendarValues, title: "" });
    handleClose();
  };

  const [events, setEvents] = useState([]);

  const loadData = () => {
    listEvent(user.uuid)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const type = [
    { id: "1", name: "Indisponible", color: "gray" },
    { id: "2", name: "En ligne", color: "green" },
    { id: "3", name: "présentiel", color: "blue" },
  ];

  const onChangeValues = (info) => {
    setCalendarValues({
      ...calendarValues,
      title: info.event._def.title,
      start: info.event.start,
      end: info.event.end,
    });
    useDisplay({
      ...display,
      idPatient: info.event._def.extendedProps.patientID?._id,
      model: info.event._def.extendedProps?.Comment,
      email: info.event._def.extendedProps.patientID?.email,
      tel: info.event._def.extendedProps.patientID?.tel,
      title: info.event._def?.title,
      nom: info.event._def.extendedProps.patientID?.nom,
      prenom: info.event._def.extendedProps.patientID?.prenom,
      meetURL: info.event._def.extendedProps?.meetURL,
    });
  };

  const modifierDisponibilité = (info) => {
    setCalendarValues({
      title: info.event._def.title,
      start: info.event.startStr,
      end: info.event.endStr,
      id: info.event._def.extendedProps._id,
    });
  };
  const onEventClick = (info) => {
    onChangeValues(info);
    modifierDisponibilité(info);
    handleOpen();
    setCoosenRDVenLigne(info.event._def.extendedProps?._id)
  };

  const handleModifier = () => {
    modifierEvent(calendarValues);
    handleClose();
    loadData();
  };

  const [display, useDisplay] = useState({
    idPatient: "",
    model: "",
    nom: "",
    prenom: "",
    email: "",
    title: "",
    tel: "",
    meetURL : "",
  });

  const handleDelete = () => {
    deleteEvent(calendarValues);
    //  location.reload();
    loadData();
    handleClose();
  };

  const [chrono, setChrono] = useState("30");

  const handleChangeChrono = async (event) => {
    await axios.put(`${process.env.REACT_APP_URL}/medecin/chrono/${user.uuid}`,{chrono:event.target.value});
    setChrono(event.target.value);
  };

  const loadMedecinData = () => {
    loadMedecin(user.uuid)
      .then((res) => {
        if (res.data.chrono) {
          setChrono(res.data.chrono);
          setDisabledChrono(true);
        } else {
          setChrono("30");
          setDisabledChrono(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    loadMedecinData();
}, [loadData(), loadMedecinData()]);

  const ajouterPatient = (display) => {
    addPatient({ idMedecin: user.uuid, idPatients: display.idPatient }).then(
      (res) => enqueueSnackbar(res.data, { variant: "success" })
    );
  };

  return (
    <>
      <Box id="calendarkeys">
        <Stack direction="row">
          {type.map((item) => (
            <ListItem disablePadding key={item.id}>
              <ListItemIcon>
                <CircleIcon sx={{ color: item.color }} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <li>
            <FormControl sx={{ width: "20em" }}>
              <InputLabel id="chrono">
                Choisire ton chrono de consultation
              </InputLabel>
              <Select
                labelId="chrono"
                id="chrono"
                value={chrono}
                label="Choisire ton chrono de consultation"
                onChange={handleChangeChrono}
                disabled={diasbledChrono}
              >
                <MenuItem value="10">10 min</MenuItem>
                <MenuItem value="15">15 min</MenuItem>
                <MenuItem value="30">30 min</MenuItem>
              </Select>
            </FormControl>
          </li>
        </Stack>
      </Box>
      <Box id="calendar">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,dayGridMonth,timeGridWeek,listDay",
          }}
          events={events}
          selectOverlap={function (event) {
            return event.rendering === "background";
          }}
          selectable={true}
          select={handelSelect}
          initialView="timeGridDay"
          views={{
            listDay: { buttonText: "list day" },
          }}
          eventClick={onEventClick}
          slotDuration={{ minute: chrono }}
          
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {display.model === "En ligne" || display.model === "présentiel" ? (
          <Box id="boxModal">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h5"
              gutterBottom
            >
              les Detailles de rendez-vous de {display.nom} {display.prenom}
            </Typography>

            <Box className="detailles">
              <h3>Raison</h3>
              <p>{display.title}</p>
            </Box>

            <Box className="detailles">
              <h3>email</h3>
              <p>{display.email}</p>
            </Box>

            <Box className="detailles">
              <h3>N° Mobile</h3>
              <p>{display.tel}</p>
            </Box>

            <Box className="detailles">
              <h3>Façon</h3>
              <p>{display.model}</p>
            </Box>

            
            {display.model === "En ligne" && (
              <Box className="detailles">
              <h3>URL</h3>
              <Link to={{ pathname: display.meetURL }} target="_blank" >{display.meetURL}</Link>
            </Box>

            )}
            
            
            <Button
              id="btn"
              onClick={() => ajouterPatient(display)}
              variant="contained"
            >
              Ajouter a Liste des mes Patients
            </Button>
            {display.model === "En ligne" && <Button id="btn"  variant="contained" onClick={handleOpenURLModel}>Ajouter l'URL</Button>}
          </Box>
        ) : (
          <Box id="boxModal">
            <Typography id="modal-modal-title" variant="h6" component="h5">
              veuillez vous indiquez la raison du votre non disponibilités ?
            </Typography>
            <h5>
              du {moment(calendarValues.start).format("DD/MM/YYYY HH:mm")} au{" "}
              {moment(calendarValues.end).format("DD/MM/YYYY HH:mm")}
            </h5>
            <TextField
              name="title"
              value={calendarValues.title}
              onChange={changeCalendarValues}
              fullWidth
            />

            <Box>
              {calendarValues.id === "" ? (
                <Button id="btn" onClick={handleOk} variant="contained">
                  Valider
                </Button>
              ) : (
                <>
                  <ChildModal handleDelete={handleDelete} />

                  <Button id="btn" onClick={handleModifier} variant="contained">
                    Modifier
                  </Button>
                </>
              )}

              <Button id="btn" onClick={handelCancel} variant="outlined">
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Modal>


       {/* url Model  */}
          <Modal
      open={openURLModel}
      onClose={handleCloseURLModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="boxModal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
         Saisire L'URL a ce RDV
        </Typography>
        <TextField
              name="meetURL"
              value={display.meetURL}
             onChange={handleChangeURL}
              fullWidth
            />
            <Box>
            <Button id="btn" variant="contained" onClick={handleClickURL} >Valider</Button>
            <Button id="btn" variant="contained" ><a href="https://urdoctovisioconference.netlify.app/" target="_blank">Générer  Un Lien</a></Button>
            </Box>

      </Box>
    </Modal>

       {/* url Model  */}
    </>
  );
};

function ChildModal({ handleDelete }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button id="btn" onClick={handleOpen} variant="contained" color="error">
        Supprimer
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box id="boxModal">
          <h2 id="child-modal-title">Voulez Vous vraiment le supprimer ?</h2>
          <Button id="btn" onClick={handleClose} variant="outlined">
            Annuler
          </Button>
          <Button
            id="btn"
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            Supprimer
          </Button>
        </Box>
      </Modal>

     
    </>
  );
}

export default CalendarDesign;
