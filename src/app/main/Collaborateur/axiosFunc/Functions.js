import axios from "axios"

export const viewMyCollaborateur=  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/medecin/collaborateur/get/${id}`)


  export const addCollaborateur=  async(values) =>
  await axios.post(`${process.env.REACT_APP_URL}/medecin/collaborateur/add`,values)

  export const viewFichierRecu=  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/dossierMedical/collaborateur/recu/${id}`)

  export const viewFichierEnvoye=  async(id) =>
  await axios.get(`${process.env.REACT_APP_URL}/dossierMedical/collaborateur/envoi/${id}`)

  export const FichierRemoveFromCollaborateur=  async(id) =>
  await axios.delete(`${process.env.REACT_APP_URL}/dossierMedical/collaborateur/fichier/delete/${id}`)

  export const DeleteCollaborateur=  async(id) =>
  await axios.delete(`${process.env.REACT_APP_URL}/medecin/collaborateur/delete/${id}`,)