import ChercherCollaborateurPage from "./Chercher/Chercher"
import DocumentCollaborateurPage from "./DocumentRecus/Document"
import DocumentEnvoiCollaborateurPage from "./DocumentEnvoi/Document"
import ListeCollaborateurPage from "./Liste/Liste"




const CollaborateurConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: ['admin'], 
      path: "/Collaborateur/chercher",
      component: ChercherCollaborateurPage,
    },
    {
      auth: ['admin'], 
      path: "/Collaborateur/liste",
      component: ListeCollaborateurPage,
    },
    {
      auth: ['admin'], 
      path: "/Collaborateur/document",
      component: DocumentCollaborateurPage,
    },
    {
      auth: ['admin'], 
      path: "/Collaborateur/envoi",
      component: DocumentEnvoiCollaborateurPage,
    },
  ],
};

export default CollaborateurConfig;
