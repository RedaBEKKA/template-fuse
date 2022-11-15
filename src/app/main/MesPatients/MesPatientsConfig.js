import i18next from "i18next";
import MesPatients from "./MesPatients";
import en from "./i18n/en";
import ar from "./i18n/ar"

i18next.addResourceBundle("en", "mesPatientsPage", en);
i18next.addResourceBundle("ar", "mesPatientsPage", ar);


const CalendarConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: ['admin'], 
      path: "/mesPatients",
      component: MesPatients,
    },
  ],
};

export default CalendarConfig;
