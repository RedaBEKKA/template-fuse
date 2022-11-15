import axios from "axios";

export const viewMyPatients =  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/medecin/patientRelativeMedecin/viewMyPatients/${id}`)

  export const viewMyPatientsNoAccount =  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/medecin/patientNoAccount/get/${id}`)


  export const addPatientsNoAccount =  async(values) =>
  await axios.post(`${process.env.REACT_APP_URL}/medecin/patientNoAccount/add`,values)

  export const modifierPatientsNoAccount =  async(id,values) =>
  await axios.put(`${process.env.REACT_APP_URL}/medecin/patientNoAccount/put/${id}`,values)

  export const deletePatientsNoAccount =  async(id) =>
  await axios.delete(`${process.env.REACT_APP_URL}/medecin/patientNoAccount/delete/${id}`)

  export const listerDML =  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/medecin/visualiser/${id}`)

  export const listerDMV =  async(id) => 
  await axios.get(`${process.env.REACT_APP_URL}/medecin/fmv/get/${id}`)

  export const addDMV =  async(values) => 
  await axios.post(`${process.env.REACT_APP_URL}/medecin/fmv/add/`,values)


  export const deleteDMV =  async(id) =>
  await axios.delete(`${process.env.REACT_APP_URL}/medecin/fmv/delete/${id}`)
  
  export const updateDMV =  async(id,values) =>
  await axios.put(`${process.env.REACT_APP_URL}/medecin/fmv/update/${id}`,values)

  export const partagerDMV =  async(values) =>
  await axios.post(`${process.env.REACT_APP_URL}/medecin/fmv/partager/`,values)


  export const viewMyCollaborateur=  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/medecin/collaborateur/get/${id}`)

  export const partagerToCollaborateur=  async(values) =>
  await axios.post(`${process.env.REACT_APP_URL}/dossierMedical/collaborateur/partager`,values)


