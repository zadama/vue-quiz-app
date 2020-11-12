<template>
  <div class="rounded-div">
    <h1>Points: {{ this.progressData.counter }}</h1>
    <table class="table-auto">
      <thead>
        <tr>
          <th style="border:none;">Question</th>
          <th style="border:none;">Correct Answer</th>
          <th style="border:none;">Your Answer</th>
          <th style="border:none;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in progressData.userQuizResult" :key="index">
          <td>{{ data.question }}</td>
          <td>{{ data.correct_answer }}</td>
          <td>{{ data.user_answer }}</td>
          <td
            :style="
              data.user_answer === data.correct_answer
                ? 'background-color:green;'
                : 'background-color:red;'
            "
          ></td>
        </tr>
      </tbody>
    </table>

    <modal
      :points="progressData.counter"
      :isOpen="isOpen"
      @update:toggleModal="toggleModal"
    />

    <div class="btn-container">
      <button
        style="background-color:#4aa52e;"
        @click="toggleModal"
        class="btn"
      >
        Save Results
      </button>

      <router-link to="/categories">
        <button class="btn">New Game(Score will not be saved)</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "ResultPage",
  components: {
    Modal
  },
  props: {
    progressData: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style>
.quiz-container {
  border: none;
  padding: 2rem 4rem;
}

.rounded-div {
  padding: 1rem;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-width: 1px;
  border-bottom-width: 1px;

  border-radius: 0.5rem;
  border-color: rgba(203, 213, 224, 1);
  border-style: solid;
  display: flex;
  flex-flow: column nowrap;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

td,
th {
  border: solid;
  border-width: 1px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border-color: rgba(203, 213, 224, 1);
  border-style: solid;
}

a {
  margin-left: auto;
}

.btn {
  color: #fff;
  background-color: #209cee;
  padding: 6px 8px;
  border-style: solid;
  border-width: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  margin-top: 10px;
  outline: none;
}

.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>
