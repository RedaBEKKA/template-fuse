import i18next from "i18next";
import Calendar from "./Calendar";
import en from "./i18n/en";
import ar from "./i18n/ar"

i18next.addResourceBundle("en", "CalendarPage", en);
i18next.addResourceBundle("ar", "CalendarPage", ar);


const CalendarConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: ['admin'], 
      path: "/calendar",
      component: Calendar,
    },
  ],
};

export default CalendarConfig;
