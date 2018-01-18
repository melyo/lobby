<template>
  <b-card-body ref="messages" class="chat-body" v-show="screen === 2">
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
  watch: {
    messages () {
      this.$nextTick(() => {
        const card = this.$refs.messages
        card.scrollTop = card.scrollHeight
      })
    }
  },
  methods: {
    getMessages(id) {
      this.loading = true
      HTTP.get(`/api/v1/lobbies/${id}/messages`)
        .then(response => {
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
