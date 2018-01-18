<template>
  <b-card-footer class="p-4" v-show="screen === 1">
    <form @submit.prevent="createLobby()">
      <b-form-input v-model="form.name" placeholder="Lobby name ..."></b-form-input>
      <b-btn block variant="success" type="submit" :disabled="loading">Create</b-btn>
    </form>
  </b-card-footer>
</template>

<script>
import { HTTP } from '@/http'

export default {
  name: 'PostLobby',
  props: ['screen'],
  data () {
    return {
      loading: false,
      form: {
        name: ''
      },
      error: false
    }
  },
  methods: {
    createLobby () {
      this.loading = true
      HTTP.post('/api/v1/lobbies', this.form)
        .then(response => {
          this.resetForm()
          this.$socket.emit('refreshLobby')
          this.error = false
          this.loading = false
        })
        .catch(error => {
          this.error = true
          this.loading = false
        })
    },
    resetForm () {
      this.form = {
        name: ''
      }
    }
  }
}
</script>
