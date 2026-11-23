import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from "../api.js";

export const useGlobalStore = defineStore("global", () => {
  let user = reactive({
    token: localStorage.getItem("token"),
    email: null,
    isAdmin: null,
  });

  async function getUserDetails(token) {
    if (!token) {
      user.token = null;
      user.email = null;
      user.isAdmin = null;
      return;
    }

    let { data } = await api.get("/users/details");
    user.token = token;
    user.email = data.user.email;
    user.isAdmin = data.user.isAdmin;
  }

  return {
    user,
    getUserDetails,
  };
});
