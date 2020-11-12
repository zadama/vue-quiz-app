<template>
  <div class="container" id="app">
    <div class="row">
      <h4 class="counter">Score: {{ progressData.counter }}</h4>

      <div v-if="loading">Loading...</div>

      <result-page
        :progressData="progressData"
        v-else-if="isQuizOver && !loading"
      >
        detta ska va egen komponent ha end screen med konfetti och table över
        resultat
      </result-page>

      <div
        class="question-answer-container"
        v-else-if="!loading && !isQuizOver"
      >
        <h4 class="counter">Counter: {{ progressData.counter }}</h4>

        <question
          @update:nextQuestion="nextQuestion"
          @update:progressData="updateUserQuizResult"
          :currentQuestion="quizArr[questionIndex]"
          :isQuizOver="isQuizOver"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Question from "./Question";
import ResultPage from "./ResultPage";

export default {
  name: "Quiz",
  components: {
    Question,
    ResultPage
  },
  data() {
    return {
      loading: true,
      quizArr: [],
      questionIndex: 0,
      progressData: {
        counter: 0,
        userQuizResult: []
      }
    };
  },
  computed: {
    isQuizOver: function() {
      //return true;
      // ÄNDRA TILLBAKA TILL NEDAN
      return this.questionIndex + 1 >= this.quizArr.length;
    }
  },
  mounted() {
    this.getQuestions();
  },

  /*
  watch: {
    questionIndex: function() {
      if (this.isQuizOver) {
        
        localStorage.setItem("progressbar", this.progressData.counter);
      }
    }
  },*/

  methods: {
    async getQuestions() {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy"
        );
        const data = await response.json();
        console.log(data);
        this.quizArr = data.results;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    nextQuestion() {
      this.questionIndex =
        this.questionIndex + 1 < this.quizArr.length
          ? this.questionIndex + 1
          : this.questionIndex;
    },
    updateUserQuizResult(userAnswer) {
      let isAnswerCorrect =
        userAnswer === this.quizArr[this.questionIndex].correct_answer;

      if (isAnswerCorrect) {
        this.progressData.counter = this.progressData.counter + 10;
      }

      this.progressData.userQuizResult.push({
        question: this.quizArr[this.questionIndex].question,
        correct_answer: this.quizArr[this.questionIndex].correct_answer,
        user_answer: userAnswer
      });

      console.log(this.progressData);
    }
  }
};
</script>

<style scoped>

div {
  background-color: #15242d;
}

.row {
  align-items: center;
  width: 100%;
}

.question-answer-container {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 300px;
}
.counter {
  margin-right: auto;
  margin-bottom: 20px;
  color: #dedede;
  font-size: 20px;
}
</style>
