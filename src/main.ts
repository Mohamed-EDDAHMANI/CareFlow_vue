import { createApp } from "vue";
import App from "./App.vue";
// Node ESM resolution (nodenext) requires explicit extensions for relative imports.
// At runtime the compiled files are .js, so import the .js entry.
import router from "./router/index.js";
import "./assets/main.css";

createApp(App).use(router).mount("#app");
