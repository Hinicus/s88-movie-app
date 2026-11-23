import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "notyf/notyf.min.css";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createWebHistory, createRouter } from "vue-router";
import { useGlobalStore } from "./stores/global.js";

//components
import RegisterLoginPage from "./pages/RegisterLoginPage.vue";
import LogoutPage from "./pages/LogoutPage.vue";
import MoviePage from "./pages/MoviePage.vue";
import MoviesCatalogPage from "./pages/MoviesCatalogPage.vue";
import AdminDashboardPage from "./pages/AdminDashboardPage.vue";
import AdminAddFormPage from "./pages/AdminAddFormPage.vue";

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
    //admin routes
    {
      path: "/admin",
      name: "Admin",
      component: AdminDashboardPage,
      meta: { requiresAdmin: true },
    },
    {
      path: "/admin/addMovie",
      name: "AddMovie",
      component: AdminAddFormPage,
      meta: { requiresAdmin: true },
    },
    {
      path: "/:pathMatch(.*)*",
      component: MoviesCatalogPage,
    },
  ],
});

//protect admin routes
router.beforeEach(async (to) => {
  const store = useGlobalStore();

  // Restore the user after a refresh
  if (store.user.token && store.user.isAdmin == null) {
    try {
      await store.getUserDetails(store.user.token);
    } catch {
      localStorage.removeItem("token"); // token expired or invalid
      await store.getUserDetails(null);
    }
  }

  if (to.meta.requiresAdmin && !store.user.isAdmin) {
    return store.user.token ? "/movies" : "/login";
  }
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
