<!--
Countdown timer clock with Stop button.

Uses Countdown component, wraps it with design and controls.

Makes Countdown start on prop 'run' === true.
Makes Countdown stop on  prop 'run' === false or when Stop button is pressed.

Propagates Countdown's 'start', 'stop', and 'end' events.

Makes clock face red when out of time.
-->

<template>

  <div class="stop-clock">

    <button class="stop-clock__button" @click="stop" :disabled="!isRunning">{{buttonText}}</button>

    <div class="stop-clock__face" :class="{'stop-clock__face_countdown-ended': isEnded }">
      <Countdown
        :minutes="minutes" :seconds="seconds"
        :run="runCountdown"
        v-on:start="countdownStarted()"
        v-on:stop="countdownStoped()"
        v-on:end="countdownEnded()"
      />
    </div>

  </div>

</template>


<script>

import Countdown from '@/components/Countdown.vue';

export default {
  name: 'StopClock',

  components: {
    Countdown,
  },

  props: {
    buttonText: { type: String, default: 'Stop' },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    run: { type: Boolean, default: false },
  },

  data() {
    return {
      runCountdown: this.run,
      isRunning: this.runCountdown,
      isEnded: false,
    };
  },

  watch: {
    run() {
      this.runCountdown = this.run;
    },
  },

  methods: {

    stop() {
      this.runCountdown = false;
    },

    countdownStarted() {
      this.isRunning = true;
      this.$emit('start');
    },

    countdownStoped() {
      this.isRunning = false;
      this.$emit('stop');
    },

    countdownEnded() {
      this.isRunning = false;
      this.isEnded = true;
      this.$emit('end');
    },
  },
};

</script>


<style>

.stop-clock {
  text-align: center;
}

.stop-clock__face {
  font-family: monospace;
  font-size: 50px;
  border: 5px solid #5E9438;
  color: #0C142C;
  padding: 10px;
}

.stop-clock__face_countdown-ended {
  background-color: #D45A18;
  color: white;
}

.stop-clock__button {
  background-color: #CCEBB7;
  color: #0C142C;
  font-size: 24px;
  height: 50px;
  width: 61.8%;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  outline: 0;
}

.stop-clock__button:disabled {
  cursor: default;
  font-size: 0;
  margin: 40px 0 0 0;
  height: 10px;
}

</style>
