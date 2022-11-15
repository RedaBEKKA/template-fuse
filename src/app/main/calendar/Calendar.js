import DemoContent from '@fuse/core/DemoContent';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import CalendarDesign from "./CalendarDesign"

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function CalendarPage() {
  const { t } = useTranslation('CalendarPage');


  return (
    <Root
     header={
        <div className="p-24">
          <h4>{t('TITLE')}</h4>
        </div>
      }
      content={ 
        <CalendarDesign />
      }
    />
  );
}

export default CalendarPage;
