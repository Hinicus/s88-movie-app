<template>
  <!-- hero section -->
  <section
    id="hero"
    class="bg-light p-5 d-flex flex-column rounded shadow-sm border justify-content-center align-items-center">
    <h1 class="display-3 fst-italic fw-bold text-danger">iPlicks</h1>
    <p class="lead text-center">
      Stop scrolling through endless menus and start watching. iPlicks brings
      every genre, hidden gem, and blockbuster together in one sleek
      space—making it effortless to discover what’s trending, organize your
      watchlist, and find your next favorite film in seconds.
    </p>
    <div v-if="!user.email">
      <div class="d-flex gap-3 align-items-center">
        <router-link class="btn btn-outline-danger" to="/login"
          >Log in</router-link
        >
        <p class="m-0">or</p>
        <router-link class="btn btn-outline-danger" to="/register"
          >Register</router-link
        >
      </div>
      <p class="text-center mt-1">To view films here in iPlicks</p>
    </div>
  </section>

  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-danger" role="status"></div>
  </div>

  <div class="container py-3" v-else>
    <section id="movies-catalog" class="row row-cols-2 row-cols-md-4 g-4 p-5">
      <MoviePosterCard
        v-for="movie in movies"
        :movie="movie"
        :key="movie._id" />
    </section>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../stores/global.js";
const { user } = useGlobalStore();
import MoviePosterCard from "../components/MoviePosterCard.vue";
import api from "../api.js";
import { ref, onMounted } from "vue";
import { Notyf } from "notyf";

const notyf = new Notyf();

const movies = ref([]);
const loading = ref(true);

async function fetchMovies() {
  loading.value = true;
  try {
    const { data } = await api.get("/movies/getMovies");
    movies.value = Array.isArray(data) ? data : data.movies || [];
  } catch (e) {
    notyf.error(`${e.response?.data?.message || "Failed to load movies"}`);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchMovies);
</script>
