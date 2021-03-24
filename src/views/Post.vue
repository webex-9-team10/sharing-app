<template>
  <div class="home__wrapper">
    <submit-form v-bind:position="position" />
  </div>
</template>

<script>
import SubmitForm from "../components/SubmitForm.vue";
export default {
  data: function() {
    return {
      position: {
        lat: this.$route.params.lat,
        lng: this.$route.params.lng,
      },
    };
  },
  components: { SubmitForm },
  props: {
    lat: String,
    lng: String,
  },
};
</script>

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
}
</style>
