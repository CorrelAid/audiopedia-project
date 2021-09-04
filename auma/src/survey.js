export const Survey = {
  template: `
<app-audio 
  ref="audio"
  :url="currentQuestion.audioUrl" 
  @ready="onAudioReady"
  @ended="onAudioEnded" 
  @replay="onAudioReplay"/>

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
      showOptions: false,
      results: [],
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIdx];
    },
  },
  methods: {
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
    },
    onAudioReady() {
      if (this.currentQuestionIdx > 0) {
        this.$refs.audio.play();
      }
    },
    onAudioEnded() {
      this.showOptions = true;
    },
    onAudioReplay() {
      this.showOptions = false;
    },
    setQuestion(idx) {
      this.currentQuestionIdx = idx;
      this.showOptions = false;
    },
  },
};
