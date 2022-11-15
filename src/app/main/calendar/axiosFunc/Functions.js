import axios from "axios";

export const createEvent =  async(values) =>
  await axios.post(`${process.env.REACT_APP_URL}/medecin/calendar/event`, values)


  export const listEvent =  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/medecin/calendar/event/${id}`)

  export const modifierEvent =  async(values) =>
  await axios.put(`${process.env.REACT_APP_URL}/medecin/calendar/event/${values.id}`,values)

  export const deleteEvent =  async(values) =>
  await axios.delete(`${process.env.REACT_APP_URL}/medecin/calendar/event/${values.id}`,values)


export const loadMedecin =  async(id) =>
await axios.get(`${process.env.REACT_APP_URL}/medecin/chrono/${id}`)


export const addPatient =  async(values) =>
  await axios.post(`${process.env.REACT_APP_URL}/medecin/patientRelativeMedecin/addPatient`, values)

  export const partagerURL =  async(id,values) =>
  await axios.put(`${process.env.REACT_APP_URL}/medecin/calendar/event/add/url/${id}`,
  {"meetURL" : values})
