<template>
  <b-card-body class="chat-body" v-show="screen === 2">
    <b-card>
      <strong>Mucho:</strong>
      <p class="card-text">Message002</p>
    </b-card>
    <b-card>
      <strong>Mucho:</strong>
      <p class="card-text">Message001</p>
    </b-card>
  </b-card-body>
</template>

<script>
export default {
  name: 'Chat',
  props: ['screen']
}
</script>
