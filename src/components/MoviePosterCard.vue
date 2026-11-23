<template>
  <div class="col">
    <div class="card h-100 p-3">
      <img
        src="https://placehold.co/400x600?text=No+Poster"
        class="card-img-top"
        alt="Movie poster" />
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text text-truncate">{{ movie.description }}</p>
        <router-link :to="`/movies/${movie._id}`" class="btn btn-danger">
          View Movie
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>
