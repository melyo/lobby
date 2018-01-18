<template>
  <b-card-footer class="p-4" v-show="screen === 2">
    <b-form-textarea
      placeholder="Enter something"
      :rows="2"
      :max-rows="2"
    >
    </b-form-textarea>
    <b-btn block variant="primary" @click.prevent="backLobby()">Submit</b-btn>
  </b-card-footer>
</template>

<script>
export default {
  name: 'PostMessage',
  props: ['screen']
}
</script>
