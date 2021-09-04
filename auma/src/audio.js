import "./audio.css";

const IconPlay = {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#ddd"/>
    <path d="M3 22v-20l18 10-18 10z" fill="#000" transform="translate(14, 12)"/>
  </svg>`,
};

const IconPause = {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#ddd"/>
    <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" fill="#000" transform="translate(12, 12)"/>
  </svg>`,
};

const IconReplay = {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#ddd"/>
    <path d="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"
      fill="#000" transform="translate(12, 12)"/>
  </svg>`,
};

export const Audio = {
  components: {
    "icon-play": IconPlay,
    "icon-pause": IconPause,
    "icon-replay": IconReplay,
  },
  template: `
<div class="audio">
    <button v-if="state == 'start' || state == 'paused'" @click="play"><icon-play/></button>
    <button v-if="state == 'playing'" @click="pause"><icon-pause/></button>
    <button v-if="state == 'ended'" @click="replay"><icon-replay/></button>
</div>
<audio 
    ref="audio" 
    :src="url"
    @ended="onEnded"
    style="display:none;"
></audio>`,
  props: {
    url: String,
  },
  data() {
    return {
      state: "start",
    };
  },
  emits: ["ready", "play", "pause", "ended", "replay"],
  mounted() {
    this.state = "start";
    setTimeout(() => this.$emit("ready"), 1);
  },
  methods: {
    play() {
      this.$refs.audio.play();
      this.state = "playing";
      this.$emit("play");
    },
    pause() {
      this.$refs.audio.pause();
      this.state = "paused";
      this.$emit("pause");
    },
    replay() {
      this.$refs.audio.time = 0;
      this.$refs.audio.play();
      this.state = "playing";
      this.$emit("replay");
    },
    onEnded() {
      this.state = "ended";
      this.$emit("ended");
    },
  },
  watch: {
    url() {
      this.state = "start";
      setTimeout(() => this.$emit("ready"), 1);
    },
  },
};
