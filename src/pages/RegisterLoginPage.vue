<template>
  <div class="shadow-sm bg-light rounded-4 border p-5 w-50">
    <div class="text-center">
      <h1 class="fw-semibold text-danger fst-italic">iPlicks</h1>
      <h3>{{ isRegistering ? "Register" : "Login" }}</h3>
    </div>
    <form @submit.prevent="handleSubmit" class="d-flex flex-column">
      <div class="form-group mb-3">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp
          "
          v-model="email" />
      </div>
      <div class="form-group mb-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password" />
      </div>
      <button
        type="submit"
        class="ms-auto btn"
        :class="isEnabled ? 'btn-primary' : 'btn-danger'"
        :disabled="!isEnabled">
        {{ isRegistering ? "Register" : "Login" }}
      </button>
    </form>
    <p class="text-center mt-3" v-if="isRegistering">
      Have an account? <router-link to="/login">Login</router-link>
    </p>
    <p class="text-center mt-3" v-else>
      New User? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../stores/global";
import { onBeforeMount, ref, computed, watch } from "vue";
import { Notyf } from "notyf";
import api from "../api";

const { user, getUserDetails } = useGlobalStore();
const notyf = new Notyf();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

//input states
const email = ref("");
const password = ref("");
const isEnabled = computed(() => email.value !== "" && password.value !== "");
const isRegistering = computed(() => route.path === "/register");

async function handleSubmit() {
  const endpoint = isRegistering.value ? "/users/register" : "/users/login";

  try {
    const res = await api.post(endpoint, {
      email: email.value,
      password: password.value,
    });

    if (isRegistering.value && res.status === 201) {
      notyf.success("Successfully Registered");
      router.push("/login");
    } else if (!isRegistering.value && res.status === 200) {
      localStorage.setItem("token", res.data.access);
      getUserDetails(res.data.access);
      notyf.success("Logged in");
      router.push("/movies");
    }
  } catch (e) {
    const status = e.response?.status;
    if ([400, 401, 404, 409].includes(status)) {
      notyf.error(e.response.data.message);
    } else {
      console.error(e);
      notyf.error("Something went wrong. Please contact administrator.");
    }
  }
}

watch(
  () => route.path,
  () => {
    email.value = "";
    password.value = "";
  },
);

onBeforeMount(() => {
  if (user.token) {
    router.push({ path: "/movies" });
  }
});
</script>
