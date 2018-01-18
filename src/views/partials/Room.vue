<template>
  <b-card-body class="room-body" v-show="screen === 1">
    <b-card v-for="lobby in lobbies" :key="lobby.id">
      <b-row>
        <b-col sm="6">
          <h5 class="card-title">{{ lobby.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Users: {{ lobby.users }}</h6>
        </b-col>
        <b-col sm="6" class="text-right">
          <b-btn variant="success">
            Join
          </b-btn>
          <b-btn variant="danger">
            Delete
          </b-btn>
        </b-col>
      </b-row>
    </b-card>
  </b-card-body>
</template>

<script>
import { HTTP } from '@/http'

export default {
  name: 'Room',
  props: ['screen'],
  data () {
    return {
      loading: true,
      lobbies: []
    }
  },
  mounted () {
    this.getLobbies()
  },
  methods: {
    getLobbies() {
      this.loading = true
      HTTP.get('/api/v1/lobbies')
        .then(response => {
          this.lobbies = response.data.data
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
  }
}
</script>
