<template>
  <div class="container quiz-container">
    <div class="row">
      <div v-if="loading">Loading...</div>

      <result-page
        :progressData="progressData"
        v-else-if="isQuizOver && !loading"
      >
      </result-page>

      <div
        class="question-answer-container"
        v-else-if="!loading && !isQuizOver"
      >
        <h4 class="counter">Score: {{ progressData.counter }}</h4>

        <h4 class="counter">
          Question {{ questionIndex + 1 }} of {{ quizArr.length }}
        </h4>

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
import { decodeHTML } from "../util/quizUtil";

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
  beforeMount: function() {
    this.loading = true;
    this.questionIndex = 0;
    this.quizArr = [];
    this.progressData = {
      counter: 0,
      userQuizResult: []
    };
  },
  computed: {
    isQuizOver: function() {
      return this.questionIndex > this.quizArr.length - 1;
    }
  },
  mounted() {
    this.getQuestions(this.$route.params.categoryId);
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
    async getQuestions(categoryId) {
      if (categoryId === undefined || categoryId === null) {
        categoryId = 11;
      }

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy`
        );
        const data = await response.json();

        if (data.results.length <= 0) {
          alert(
            "No questions were found for the given category, please choose another one."
          );
          this.$router.push("/categories");
        }

        this.quizArr = data.results;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    nextQuestion() {
      this.questionIndex++;
    },
    updateUserQuizResult(userAnswer) {
      console.log(
        userAnswer,
        this.quizArr[this.questionIndex].correct_answer,
        decodeHTML(this.quizArr[this.questionIndex].correct_answer)
      );
      let isAnswerCorrect =
        userAnswer ===
        decodeHTML(this.quizArr[this.questionIndex].correct_answer);

      if (isAnswerCorrect) {
        this.progressData.counter = this.progressData.counter + 10;
      }

      this.progressData.userQuizResult.push({
        question: decodeHTML(this.quizArr[this.questionIndex].question),
        correct_answer: decodeHTML(
          this.quizArr[this.questionIndex].correct_answer
        ),
        user_answer: userAnswer
      });

      console.log(this.progressData);
    }
  }
};
</script>

<style>
.quiz-container {
  border-style: solid;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

body {
  background-color: #15242d !important;
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
