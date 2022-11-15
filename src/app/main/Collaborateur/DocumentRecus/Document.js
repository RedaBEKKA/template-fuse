import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DocumentCollaborateurContent from './DocumentCollaborateurContent'

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
          <h4>Document Recus</h4>
        </div>
      }
      content={ 
        <DocumentCollaborateurContent />
      }
    />
  );
}

export default DocumentCollaborateurPage;