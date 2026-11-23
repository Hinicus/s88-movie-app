import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "notyf/notyf.min.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createWebHistory, createRouter } from "vue-router";

//components
import RegisterLoginPage from "./pages/RegisterLoginPage.vue";
import LogoutPage from "./pages/LogoutPage.vue";
import MoviePage from "./pages/MoviePage.vue";
import MoviesCatalogPage from "./pages/MoviesCatalogPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "Register",
      component: RegisterLoginPage,
      meta: { center: true },
    },
    {
      path: "/login",
      name: "Login",
      component: RegisterLoginPage,
      meta: { center: true },
    },
    {
      path: "/logout",
      name: "Logout",
      component: LogoutPage,
    },
    {
      path: "/movies",
      name: "MoviesCatalog",
      component: MoviesCatalogPage,
    },
    {
      path: "/movies/:id",
      name: "MoviePage",
      component: MoviePage,
    },
  ],
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
