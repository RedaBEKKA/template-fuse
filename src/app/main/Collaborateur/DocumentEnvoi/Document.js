import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DocumentEnvoiCollaborateurContent from './DocumentEnvoiCollaborateurContent'

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function DocumentEnvoiCollaborateurPage() {



  return (
    <Root
     header={
        <div className="p-24">
          <h4>Document Envoyé</h4>
        </div>
      }
      content={ 
        <DocumentEnvoiCollaborateurContent />
      }
    />
  );
}

export default DocumentEnvoiCollaborateurPage;