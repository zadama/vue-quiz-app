<template>
  <div class="categories-container">
    <h3>Pick a Category</h3>

    <div v-if="isLoading">Loading...</div>

    <ul v-else>
      <li
        @click="pickCategory(category.id)"
        v-for="(category, index) in categories"
        :key="index"
        class="category"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Categories",

  data() {
    return {
      isLoading: true,
      categories: []
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        this.categories = data.trivia_categories;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    pickCategory(categoryId) {
      this.$router.push({ name: "quiz", params: { categoryId } });
    }
  }
};
</script>

<style scoped>
h3 {
  display: inline-block;
  padding: 0 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  position: relative;
  top: -34px;
}

.categories-container {
  padding: 1.5rem 2rem;
  border-color: #000;
  border-style: solid;
  border-width: 4px;
  text-align: center;
}

ul {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
}

.category {
  flex: 0 0 auto;
  margin: 0.75em;
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
</style>
