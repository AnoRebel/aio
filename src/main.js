import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import App from "@/App.vue";
import { AppLink } from "@/components";
import router from "@/router";
import "virtual:windi.css";
import { piniaLogger, piniaDebounce } from "@/utils";
import "@/assets/scss/style.scss";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

const pinia = createPinia();
pinia.use(piniaLogger);
pinia.use(piniaDebounce);

const app = createApp(App);
app.component("AppLink", AppLink);
app.use(router);
app.use(pinia);
app.use(i18n);
router.isReady().then(() => app.mount("#app"));
