<template>
  <div id="employee-form">
    <h1>{{ message }}</h1>

    <form @submit.prevent="handleSubmit">
      <label>Employee name</label>
      <input v-model="employee.name" type="text" />
      <label>Employee Email</label>
      <input v-model="employee.email" type="text" />
      <button>Add Employee</button>
    </form>

    <button @click="$emit('delete-employee', employee.id)">Delete</button>
  </div>
</template>

<script>
export default {
  name: "employee-form",
  props: {
    message: String
  },
  data() {
    return {
      employee: {
        name: "",
        email: ""
      }
    };
  },

  methods: {
    handleSubmit() {
      this.$emit("add:employee", this.employee);
      this.employee = { name: "", email: "" };
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}
</style>
