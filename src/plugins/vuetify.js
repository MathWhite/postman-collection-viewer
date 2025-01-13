// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi";

//json
import themeConfig from "@/assets/themeConfig";

const themes = themeConfig;

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: themes.light,
      dark: themes.dark,
      wevo: themes.wevo,
      jitterbit: themes.jitterbit,
      matheus: themes.matheus,
    },
  },
  icons: {
    defaultSet: "mdi",
    sets: { mdi },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
