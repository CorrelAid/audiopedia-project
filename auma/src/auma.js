import "./auma.css";

let controls;

const App = {
  template: `
<div class="auma">
  <template v-if="currentQuestion">
  <audio 
    ref="audio" 
    :src="currentQuestion.audioUrl"
    @timeupdate="tick"
    @ended="ended"
  ></audio>

  <div class="play-bar">
    <button 
      v-if="showPlayPause" @click="playing ? pause() : play()"
    >{{ playing ? 'pause' : 'play' }}</button>
  </div>

  <img v-if="imageUrl" :src="imageUrl">
  <div v-if="imageUrl == undefined" class="img-placeholder"></div>

  <div class="options">
    <button 
      class="option" 
      v-for="option of options" 
      @click="choose(option)" 
      :key="currentQuestion.name + option.name"
    >{{ option.name }}</button>
  </div>
  </template>
</div>

<pre>{{ JSON.stringify({results}, null, 2) }}</pre>
<pre>{{ JSON.stringify({playing, time}, null, 2) }}</pre>
`,
  data() {
    return {
      questions: [],
      currentQuestionIdx: -1,
      showPlayPause: false,
      playing: false,
      time: 0,
      imageUrl: undefined,
      options: [],
      results: [],
    };
  },
  computed: {
    currentQuestion() {
      return this.currentQuestionIdx >= 0
        ? this.questions[this.currentQuestionIdx]
        : undefined;
    },
  },
  methods: {
    tick() {
      const time = this.$refs.audio.currentTime;
      for (let i = Math.ceil(this.time); i <= Math.floor(time); i++) {
        const callback = (this.currentQuestion.callbacks || {})[i];
        if (callback) {
          callback(controls);
        }
      }
      this.time = time;
    },
    ended() {
      this.showPlayPause = false;
      this.playing = false;
      const callback = (this.currentQuestion.callbacks || {}).END;
      if (callback) {
        callback(controls);
      }
    },
    play() {
      this.$refs.audio.play();
      this.playing = true;
    },
    pause() {
      this.$refs.audio.pause();
      this.playing = false;
    },
    setImageUrl(url) {
      this.imageUrl = url;
    },
    clearImageUrl() {
      this.imageUrl = undefined;
    },
    setQuestion(nameOrIdx) {
      if (typeof nameOrIdx == "string") {
        this.currentQuestionIdx = this.questions
          .map((q) => q.name)
          .indexOf(nameOrIdx);
      } else {
        this.currentQuestionIdx = nameOrIdx;
      }

      const question = this.questions[this.currentQuestionIdx];
      if (question.imageUrl) {
        this.imageUrl = question.imageUrl;
      }

      this.showPlayPause = true;
      this.playing = false;
      this.time = 0;
    },
    setQuestionAndPlay(nameOrIdx) {
      this.setQuestion(nameOrIdx);
      this.$nextTick(this.play);
    },
    setOptions(options) {
      this.options = options;
      this.pause();
      this.showPlayPause = false;
    },
    choose(option) {
      this.options = [];
      this.results.push({
        question: this.currentQuestion.name,
        option: option.name,
      });
      option.callback(controls);
    },
    submit() {
      // proxy to object
      const results = JSON.parse(JSON.stringify(this.results));
      console.log(results);
    },
  },
};

function auma({ questions }) {
  const vue = document.createElement("script");
  vue.src = "https://unpkg.com/vue@3";

  vue.onload = () => {
    const el = document.createElement("div");
    document.body.append(el);
    const vm = Vue.createApp(App).mount(el);
    vm.questions = questions;
    vm.setQuestion(0);

    controls = {
      play: vm.play,
      pause: vm.pause,
      setImageUrl: vm.setImageUrl,
      clearImageUrl: vm.clearImageUrl,
      setQuestion: vm.setQuestion,
      setQuestionAndPlay: vm.setQuestionAndPlay,
      setOptions: vm.setOptions,
      submit: vm.submit,
    };
  };

  document.head.append(vue);
}

window.auma = auma;
