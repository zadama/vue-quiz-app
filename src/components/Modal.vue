<template>
  <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">
            <p style="cursor:pointer;" @click="closeModal">X</p>

            <div class="input-container">
              <input placeholder="Enter your name..." v-model="name" />
              <button @click="saveName">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isOpen: Boolean,
    points: Number
  },
  data: () => {
    return {
      name: ""
    };
  },
  methods: {
    closeModal: function() {
      this.$emit("update:toggleModal");
    },
    saveName: function() {
      const usersStored = localStorage.getItem("users");
      let userArray = [];

      if (!usersStored) {
        userArray.push({
          name: this.name,
          points: this.points
        });
      } else {
        userArray = JSON.parse(localStorage.getItem("users"));
        userArray.push({
          name: this.name,
          points: this.points
        });
      }

      localStorage.setItem("users", JSON.stringify(userArray));
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.modal {
  width: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  display: flex;
  flex-flow: row wrap;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.input-container {
  display: flex;
  font-size: 1.6rem;
  width: 100%;
  padding: 10px;
}

input {
  width: calc(100% - 8px);
  padding: 0.5rem 1rem;
  margin: 4px;
  border-style: solid;
  border-width: 4px;
  font-size: inherit;
}

button {
  color: #fff;
  background-color: #92cc41;
  display: inline-block;
  padding: 6px 8px;
  margin: 4px;
  border-style: solid;
  border-width: 4px;
  outline: none;
  font-size: inherit;
  cursor: pointer;
}

p {
  margin-left: auto;
  margin-bottom: auto;
  padding: 5px;
  color: red;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>
