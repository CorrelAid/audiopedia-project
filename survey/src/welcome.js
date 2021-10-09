import { Audio } from "./audio";

import "./welcome.css";

const IconDone = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="24" fill="#ddd"/>
  <path 
    d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z"
    fill="#000" transform="translate(12, 12)"/>
</svg>`,
};

export const Welcome = {
  components: {
    "app-audio": Audio,
    "icon-done": IconDone,
  },
  template: `
<div class="welcome">
  <app-audio 
    :url="config.welcome.audioUrl" 
    :style="{width: audioEnded ? '60px' : '240px'}"
    @ended="audioEnded = true"/>
  <button
    class="welcome__done" 
    :style="{width: audioEnded ? '240px' : '60px'}"
    @click="done">
    <icon-done/>
  </button>
</div>`,
  props: {
    config: Object,
  },
  emits: ["done"],
  data() {
    return { audioEnded: false };
  },
  methods: {
    done() {
      this.$emit("done");
    },
  },
};
