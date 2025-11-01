<template>
  <div class="login-page ">
    <h1 class="text-red-500 bg-red-300" >Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" autocomplete="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// use .js extension because TS is configured with moduleResolution 'nodenext'
// at runtime the compiled files will be .js
import { loginUser } from "@/services/authService.js";

const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");

async function handleLogin() {
  try {
    const response = await loginUser({
      email: email.value,
      password: password.value,
    });
    console.log("User connected:", response.data);
    // you can store the token here
    localStorage.setItem("token", response.data.token);
  } catch (err: any) {
    error.value = err?.response?.data?.message || "Erreur de connexion";
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
