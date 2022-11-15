import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import ListeCollaborateurContent from './ListeCollaborateurContent'

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function DocumentCollaborateurPage() {



  return (
    <Root
     header={
        <div className="p-24">
          <h4>Liste Collaborateur</h4>
        </div>
      }
      content={ 
        <ListeCollaborateurContent />
      }
    />
  );
}

export default DocumentCollaborateurPage;