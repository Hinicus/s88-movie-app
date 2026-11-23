<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-semibold mb-0">Admin Dashboard</h2>
      <router-link class="btn btn-danger" :to="'admin/addMovie'"
        >Add Movie</router-link
      >
    </div>

    <!-- Movies table -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else class="table-responsive shadow-sm rounded-4 border bg-white">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Description</th>
            <th class="text-end">Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!movies.length">
            <td colspan="6" class="text-center text-muted py-4">
              No movies yet.
            </td>
          </tr>
          <tr v-for="movie in movies" :key="movie._id">
            <td class="fw-semibold">
              <router-link
                :to="`/movies/${movie._id}`"
                class="text-decoration-none">
                {{ movie.title }}
              </router-link>
            </td>
            <td>{{ movie.director }}</td>
            <td>{{ movie.year }}</td>
            <td class="text-capitalize">{{ movie.genre }}</td>
            <td class="text-truncate" style="max-width: 260px">
              {{ movie.description }}
            </td>
            <td class="text-end">{{ movie.comments.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { Notyf } from "notyf";
import api from "../api";

const notyf = new Notyf();

const movies = ref([]);
const isLoading = ref(false);

async function fetchMovies() {
  isLoading.value = true;
  try {
    const res = await api.get("/movies/getMovies");
    movies.value = Array.isArray(res.data) ? res.data : res.data.movies;
  } catch (e) {
    console.error(e);
    notyf.error("Failed to load movies.");
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchMovies);
</script>
