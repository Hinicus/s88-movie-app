<template>
  <div class="container py-5">
    <router-link to="/movies" class="btn btn-outline-secondary mb-4">
      &larr; Back to movies
    </router-link>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else-if="movie" class="row g-5">
      <!-- Poster -->
      <div class="col-md-4">
        <img
          src="https://placehold.co/400x600?text=No+Poster"
          class="img-fluid rounded-4 shadow-sm w-100"
          alt="Movie poster" />
      </div>

      <!-- Details -->
      <div class="col-md-8">
        <h1 class="fw-semibold">{{ movie.title }}</h1>

        <div class="mb-3">
          <span class="badge text-bg-danger text-capitalize me-2">
            {{ movie.genre }}
          </span>
          <span class="text-muted">{{ movie.year }}</span>
        </div>

        <p class="mb-1">
          <span class="fw-semibold">Director:</span> {{ movie.director }}
        </p>

        <h5 class="mt-4">Description</h5>
        <p>{{ movie.description }}</p>

        <!-- Comments -->
        <h5 class="mt-5">Comments ({{ movie.comments.length }})</h5>

        <p v-if="!movie.comments.length" class="text-muted">No comments yet.</p>

        <ul v-else class="list-group">
          <li v-for="c in movie.comments" :key="c._id" class="list-group-item">
            <small class="text-muted d-block mb-1"
              >User {{ c.userId.slice(-6) }}</small
            >
            {{ c.comment }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import api from "../api";

const notyf = new Notyf();
const route = useRoute();

const movie = ref(null);
const isLoading = ref(false);
const error = ref("");

async function fetchMovie(id) {
  isLoading.value = true;
  error.value = "";
  movie.value = null;

  try {
    const res = await api.get(`/movies/getMovie/${id}`);
    movie.value = res.data;
  } catch (e) {
    if (e.response?.status === 404) {
      error.value = "Movie not found.";
    } else {
      console.error(e);
      error.value = "Failed to load the movie. Please try again.";
      notyf.error(error.value);
    }
  } finally {
    isLoading.value = false;
  }
}

// Runs on load and again if the :id param changes while the page stays mounted
watch(() => route.params.id, fetchMovie, { immediate: true });
</script>
