<!--
Chess clock with url routing:
  "/1" - countdown ticking for Player 1
  "/2" - countdown ticking for Player 2

Uses two StopClock components side by side.
Dispatches them by their events and by routes.
-->

<template>

  <div class="chess-clock" id="the-chess-clock">

    <stop-clock
      class="chess-clock__half"
      button-text="turn →"
      :minutes="minutes" :seconds="seconds"
      :run="run1"
      v-on:stop="start2"
      v-on:end="end"
    />

    <stop-clock
      class="chess-clock__half"
      button-text="← turn"
      :minutes="minutes" :seconds="seconds"
      :run="run2"
      v-on:stop="start1"
      v-on:end="end"
    />

  </div>

</template>


<script>

import VueRouter from 'vue-router';
import StopClock from './components/StopClock.vue';

const router = new VueRouter({
  name: 'app',

  routes: [
    { path: '/', redirect: '/1' },
    { path: '/:id' },
  ],
});

export default {
  router,

  components: {
    StopClock,
  },

  props: {
    minutes: { type: Number, default: 2 },
    seconds: { type: Number, default: 0 },
  },

  data() {
    return {
      isEnded: false,
    };
  },

  computed: {
    run1() {
      return !this.isEnded && this.$route.params.id === '1';
    },
    run2() {
      return !this.isEnded && this.$route.params.id === '2';
    },
  },

  methods: {
    start1() {
      this.$router.push('/1');
    },
    start2() {
      this.$router.push('/2');
    },
    end() {
      this.isEnded = true;
    },
  },
};

</script>


<style>

#the-chess-clock {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -68%);
}

.chess-clock {
  font-family: monospace;
  display: flex;
  justify-content: center;
}

.chess-clock__half {
    margin: 0 5px;
}

</style>
