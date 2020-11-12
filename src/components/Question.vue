<template>
  <div class="question-container">
    <!--     <h1 v-html="currentQuestion.question">}</h1>-->
    <h1>{{ vueDecodeHTML(currentQuestion.question) }}</h1>

    <div class="answer-list">
      <button
        @click="answerSelected(answer)"
        v-for="(answer, index) in answers"
        :key="index"
        class="answer"
        :class="higlightSelectedAnswer(answer)"
      >
        {{ vueDecodeHTML(answer) }}
      </button>
    </div>

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
import { shuffle, decodeHTML } from "../util/quizUtil";

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
      this.selectedAnswer = this.vueDecodeHTML(selectedAnswer);
    },
    // To escape special HTML symbols such as &quot;
    // Not possible to use decodeHTML directly in vue template, hence an extra wrapper method.
    vueDecodeHTML(str) {
      return decodeHTML(str);
    },

    updateAnswers() {
      const unshuffledAnswers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];

      this.answers = [...shuffle(unshuffledAnswers)];
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
      let setRedButton = false;
      let setBlueButton = false;

      if (selectedAnswer === "True") {
        setBlueButton = true;
      }
      if (selectedAnswer === "False") {
        setRedButton = true;
      }

      return {
        "red-button-color": setRedButton,
        "blue-button-color": setBlueButton,
        "selected-answer ":
          this.selectedAnswer === this.vueDecodeHTML(selectedAnswer),
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
  border-width: 2px;
  border-color: #e5c829;
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 1px 1px #9f8707;
}

.question-container {
  flex: 2;
  color: #dededa;
  text-shadow: 3px 3px #0b332e;
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
  color: #dededa;
  background-color: #0028ef57 !important;
  border-color: #19ea19 !important;
  outline: none;
}

.answer:hover {
  background-color: #d2b30b;
  border-style: solid;
  border-color: #0028ef57;
  box-shadow: 1px 1px #0028ef57;
}

.answer:active {
  background-color: #dbbf27;
  transform: translateY(4px);
}

.unclickable-buttons {
  pointer-events: none;
}
.next {
  color: white;
  background: #0066a2;
  padding: 6px 8px;
  border-style: solid;
  border-color: #0066a2;
  border-width: 2px;
  font-size: 1.6rem;
  cursor: pointer;
  letter-spacing: 3px;
}

.next:hover {
  background-color: #0028ef57;
  border-style: solid;
  border-color: #0028ef57;
  box-shadow: 1px 1px #0028ef57;
}

.next:active {
  background-color: #0066a2;
  transform: translateY(2px);
}

.next:disabled,
.next[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: no-drop;
}

.red-button-color {
  color: #fff;
  background-color: #e76e55;
}

.blue-button-color {
  color: #fff;
  background-color: #209cee;
}
</style>
