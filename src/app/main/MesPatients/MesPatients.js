import DemoContent from '@fuse/core/DemoContent';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import MesPatientsContent from "./MesPatientsContent"

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function MesPatientsPage() {
  const { t } = useTranslation('mesPatientsPage');


  return (
    <Root
     header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      content={ 
        <MesPatientsContent />
      }
    />
  );
}

export default MesPatientsPage;
