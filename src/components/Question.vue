<template>
  <div class="question-container">
    <!--     <h1 v-html="currentQuestion.question">}</h1>-->
    <h1>{{ decodeHTML(currentQuestion.question) }}</h1>

    <div class="answer-list">
      <button
        @click="answerSelected(answer)"
        v-for="(answer, index) in answers"
        :key="index"
        class="answer"
        :class="higlightSelectedAnswer(answer)"
      >
        {{ decodeHTML(answer) }}
      </button>
    </div>

    <p>{{ currentQuestion.correct_answer }}</p>

    <div class="next-question-container">
      <button
        v-if="!hasAnswered"
        @click="answerQuestion"
        class="next"
        :disabled="selectedAnswer === null"
      >
        Submit answer
      </button>

      <button
        v-else-if="!isQuizOver && hasAnswered"
        @click="handleNextQuestionUpdate"
        class="next"
        :disabled="!hasAnswered"
      >
        Next Questions
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      answers: [],
      selectedAnswer: null,
      hasAnswered: false
    };
  },
  props: {
    currentQuestion: Object,
    isQuizOver: Boolean
  },
  watch: {
    currentQuestion: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (oldVal !== newVal) {
        this.updateAnswers();
      }
    }
  },
  mounted() {
    console.log(this.hasAnswered, this.isQuizOver);
    this.updateAnswers();
  },
  methods: {
    answerSelected(selectedAnswer) {
      this.selectedAnswer = this.decodeHTML(selectedAnswer);
    },
    // To escape special HTML symbols such as &quot;
    decodeHTML: function(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    updateAnswers() {
      this.answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
    },
    answerQuestion() {
      // check answer and do sumething with it
      // om korrekt svar, kalla parent en metod och öka dens counter med
      // skicka även upp frågan, korrekt svar och det användaren valt
      // till en array i parent

      this.$emit("update:progressData", this.selectedAnswer);

      this.toggleHasAnswered();
    },
    toggleHasAnswered() {
      this.hasAnswered = !this.hasAnswered;
    },
    handleNextQuestionUpdate() {
      this.selectedAnswer = null;

      this.toggleHasAnswered();
      this.$emit("update:nextQuestion");
    },
    higlightSelectedAnswer: function(selectedAnswer) {
      return {
        "selected-answer ":
          this.selectedAnswer === this.decodeHTML(selectedAnswer),
        "unclickable-buttons": this.hasAnswered
      };
    }
  }
};
</script>

<style scoped>
.answer-list {
  display: flex;
  flex-flow: row wrap;
}

.answer {
  flex: 1 0 48%;
  margin: 5px;
  color: #212529;
  background-color: #f7d51d;
  padding: 6px 8px;
  border-style: solid;
  border-width: 4px;
  font-size: 1.6rem;
  cursor: pointer;
}

.question-container {
  flex: 2;
}

.next-question-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.next-question-container > * {
  margin-left: auto;
  margin-top: 20px;
}

.selected-answer {
  background-color: #0028ef57;
}
.unclickable-buttons {
  pointer-events: none;
}
.next {
  color: white;
  background: #0066a2;
  padding: 6px 8px;
  border-style: solid;
  border-width: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  letter-spacing: 3px;
}

.next:disabled,
.next[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
