<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-header>
              <h4>Lobby</h4>
            </b-card-header>
            <room ref="room" v-bind:screen="screen"></room>
            <chat ref="chat" v-bind:screen="screen" v-bind:lobby="selectedLobby"></chat>
            <post-lobby ref="post-lobby" v-bind:screen="screen"></post-lobby>
            <post-message ref="post-message" v-bind:screen="screen" v-bind:lobby="selectedLobby"></post-message>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Room from '@/views/partials/Room'
import Chat from '@/views/partials/Chat'
import PostLobby from '@/views/partials/PostLobby'
import PostMessage from '@/views/partials/PostMessage'

export default {
  name: 'Lobby',
  components: {
    Room,
    Chat,
    PostLobby,
    PostMessage
  },
  data () {
    return {
      screen: 1,
      selectedLobby: {}
    }
  },
  mounted () {
    this.initState()
  },
  methods: {
    enterLobby (lobby) {
      this.screen++
      this.selectedLobby = lobby
      this.refreshMessage(lobby.id)
    },
    backLobby () {
      this.initState()
      this.refreshLobby()
    },
    initState () {
      this.screen = 1
      this.selectedLobby = {}
    },
    refreshLobby () {
      this.$refs.room.getLobbies()
    },
    refreshMessage (id) {
      this.$refs.chat.getMessages(id)
    },
  }
}
</script>
