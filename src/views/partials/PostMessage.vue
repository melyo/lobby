<template>
  <b-card-footer class="p-4" v-show="screen === 2">
    <form @submit.prevent="sendMessage()">
      <b-form-input v-model="form.name" placeholder="Your name here!" ></b-form-input>
      <b-form-textarea id="lobby-message" v-model="form.message" placeholder="Say something..." :rows="2" :max-rows="2">
      </b-form-textarea>
      <b-btn block variant="primary" type="submit">Submit</b-btn>
    </form>
  </b-card-footer>
</template>

<script>
import { HTTP } from '@/http'

export default {
  name: 'PostMessage',
  props: ['screen', 'lobby'],
  data () {
    return {
      loading: '',
      form: {
        name: '',
        type: 256,
        message: ''
      },
      error: false
    }
  },
  methods: {
    sendMessage () {
      this.loading = true
      HTTP.post(`/api/v1/lobbies/${this.lobby.id}/messages`, this.form)
        .then(response => {
          this.resetForm()
          this.$socket.emit('messageLobby', this.lobby)
          this.error = false
          this.loading = false
        })
        .catch(error => {
          this.error = true
          this.loading = false
        })
    },
    resetForm () {
      this.form.message = ''
      document.getElementById('lobby-message').value = ''
    }
  }
}
</script>
