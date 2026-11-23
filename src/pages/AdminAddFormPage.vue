<template>
  <router-link to="/admin" class="btn btn-outline-secondary mb-4">
    &larr; Back to Dashboard
  </router-link>

  <h1 class="text-center mt-5 mb-3">Add a Movie to the Catalog</h1>
  <!-- Add movie form -->
  <form
    @submit.prevent="addMovie"
    class="card card-body bg-light shadow-sm mb-4">
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label" for="title">Title</label>
        <input
          id="title"
          v-model.trim="form.title"
          class="form-control"
          required />
      </div>
      <div class="col-md-6">
        <label class="form-label" for="director">Director</label>
        <input
          id="director"
          v-model.trim="form.director"
          class="form-control"
          required />
      </div>
      <div class="col-md-4">
        <label class="form-label" for="year">Year</label>
        <input
          id="year"
          v-model.number="form.year"
          type="number"
          min="1888"
          class="form-control"
          required />
      </div>
      <div class="col-md-8">
        <label class="form-label" for="genre">Genre</label>
        <input
          id="genre"
          v-model.trim="form.genre"
          class="form-control"
          placeholder="e.g. action, drama"
          required />
      </div>
      <div class="col-12">
        <label class="form-label" for="description">Description</label>
        <textarea
          id="description"
          v-model.trim="form.description"
          rows="3"
          class="form-control"
          required></textarea>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary ms-auto mt-3"
      :disabled="isSubmitting">
      {{ isSubmitting ? "Saving..." : "Save Movie" }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();
const isSubmitting = ref(false);
const emptyForm = () => ({
  title: "",
  director: "",
  year: null,
  description: "",
  genre: "",
});
const form = reactive(emptyForm());

async function addMovie() {
  isSubmitting.value = true;
  try {
    await api.post("/movies/addMovie", { ...form });
    notyf.success("Movie added");
    Object.assign(form, emptyForm());
    router.push("/admin");
  } catch (e) {
    notyf.error(e.response?.data?.message ?? "Failed to add movie.");
  } finally {
    isSubmitting.value = false;
  }
}
</script>
