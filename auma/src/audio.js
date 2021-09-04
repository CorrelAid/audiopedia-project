import "./audio.css";

export const Audio = {
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
