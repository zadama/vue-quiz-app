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
        <div v-if="showSuccessMessage" id="success-message-overlay">
          <div class="success-modal">
            <img src="../assets/check.png" />
            <h2>
              Your score was saved!
            </h2>
            <h5>
              Redirecting to home...
            </h5>
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
      name: "",
      showSuccessMessage: false
    };
  },
  methods: {
    closeModal: function() {
      this.$emit("update:toggleModal");
    },
    /**
     * If there are existing users in the localstorage,
     * we append the newly saved users to that array.
     * Simultaneously if there are no users, we simply create
     * a new array.
     * At the end we show a simple success message modal/alert and redirect to home after 1.5s.
     */
    saveName: function() {
      if (this.name.length <= 0) {
        alert("Please enter a name");
        return;
      }

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

      this.showSuccessMessage = true;

      setTimeout(() => {
        this.$router.push("/");
      }, 1500);
    }
  }
};
</script>

<style scoped>
.modal {
  width: 500px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  display: flex;
  flex-flow: row wrap;
}

@media (min-width: 320px) {
  .modal {
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
}

@media (min-width: 992px) {
  .modal {
    width: 500px;
    margin: 0px auto;
  }
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

#success-message-overlay {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 2px;

  display: flex;
  position: fixed;
  z-index: 1060;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: auto;
}

.success-modal {
  width: 540px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  transition: transform 0.3s, opacity 0.2s, -webkit-transform 0.3s;
  transform: scale(1);
  -webkit-animation: showSweetAlert 0.3s;
  animation: showSweetAlert 0.3s;
  will-change: transform;
  opacity: 1;
  display: inline-block;
  top: 0;
}

@keyframes showSweetAlert {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  1% {
    transform: scale(0.5);
    opacity: 0.4;
  }
  45% {
    transform: scale(1.05);
    opacity: 0.6;
  }
  80% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

img {
  max-width: 90px;
  margin-bottom: 20px;
  top: 0;
  margin-top: 10px;
}

h2,
h5 {
  color: black;
}

h5 {
  margin-top: 10px;
  margin-bottom: 10px;
  top: 0;
  bottom: 0;
}
</style>
