export const Survey = {
  template: `
  <div class="play-bar">
    <button 
      v-if="showPlayPause" @click="playing ? pause() : play()"
    >
      <icon-pause v-if="playing"></icon-pause>
      <icon-play v-if="!playing"></icon-play>
    </button>
    <button 
      v-if="showReplayButton" @click="replay"
    >
      <icon-replay></icon-replay>
    </button>
  </div>
  
  <audio 
    ref="audio" 
    :src="currentQuestion.audioUrl"
    @ended="onTrackEnded"
  ></audio>
  
  <img v-if="!!imageUrl" :src="imageUrl">
  <div v-if="!imageUrl" class="img-placeholder"></div>
  
  <div class="options">
    <template v-if="showOptions">
      <button 
        class="option" 
        @click="choose('no')" 
      >
        <icon-choice-no/>
      </button>
      <button 
        class="option" 
        @click="choose('yes')" 
      >
        <icon-choice-yes/> 
      </button>
      <button 
        class="option" 
        @click="choose('skip')" 
      >
        <icon-choice-skip/> 
      </button>
    </template>
  </div>
  `,
  props: {
    questions: Array,
  },
  emits: ["submit"],
  data() {
    return {
      currentQuestionIdx: 0,
      showPlayPause: false,
      showReplayButton: false,
      showOptions: false,
      playing: false,
      results: [],
      imageUrl: undefined,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIdx];
    },
  },
  mounted() {
    this.setQuestion(0);
  },
  methods: {
    play() {
      this.$refs.audio.play();
      this.playing = true;
    },
    pause() {
      this.$refs.audio.pause();
      this.playing = false;
    },
    onTrackEnded() {
      this.playing = false;
      this.showPlayPause = false;
      this.showReplayButton = true;
      this.showOptions = true;
    },
    choose(option) {
      this.showOptions = false;
      this.results.push({
        question: this.currentQuestion.id,
        option: option,
      });

      if (!this.questions[this.currentQuestionIdx + 1]) {
        this.$emit("submit", this.results);
        return;
      }

      this.setQuestion(this.currentQuestionIdx + 1);
      this.$nextTick(this.play);
    },
    replay() {
      this.$refs.audio.time = 0;
      this.showPlayPause = true;
      this.showReplayButton = false;
      this.showOptions = false;
      this.play();
    },
    setQuestion(idx) {
      this.currentQuestionIdx = idx;
      this.showPlayPause = true;
      this.showReplayButton = false;
      this.showOptions = false;

      const question = this.questions[idx];
      if (question.imageUrl) {
        this.imageUrl = question.imageUrl;
      }
    },
  },
};
