<template>
  <b-card-body class="chat-body" v-show="screen === 2">
    <b-card v-for="message in messages" :key="message.id">
      <strong>{{ message.name }}:</strong>
      <p class="card-text">{{ message.message }}</p>
    </b-card>
  </b-card-body>
</template>

<script>
import { HTTP } from '@/http'

export default {
  name: 'Chat',
  props: ['screen', 'lobby'],
  data () {
    return {
      loading: false,
      messages: []
    }
  },
  methods: {
    getMessages(id) {
      console.log('boom')
      this.loading = true
      HTTP.get(`/api/v1/lobbies/${id}/messages`)
        .then(response => {
          console.log(response.data.data)
          this.messages = response.data.data
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
  }
}
</script>
