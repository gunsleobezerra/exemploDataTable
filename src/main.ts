import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "../src/style.css";
import wind from "./presets/wind";


const app = createApp(App);

app.use(PrimeVue, {
    unstyled: false,
    pt: wind                        //apply preset        
});


app.mount("#app");
