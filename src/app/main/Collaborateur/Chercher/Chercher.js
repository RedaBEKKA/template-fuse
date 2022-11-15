import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import ChercherCollaborateurContent from './ChercherCollaborateurContent'

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function ChercherCollaborateurPage() {



  return (
    <Root
     header={
        <div className="p-24">
          <h4>Chercher Un Collaborateur</h4>
        </div>
      }
      content={ 
        <ChercherCollaborateurContent />
      }
    />
  );
}

export default ChercherCollaborateurPage;