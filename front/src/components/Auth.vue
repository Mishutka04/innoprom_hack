<template>
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-tabs">
          <button 
            @click="activeTab = 'login'" 
            :class="{ active: activeTab === 'login' }"
            class="tab-button"
          >
            Вход
          </button>
          <button 
            @click="activeTab = 'register'" 
            :class="{ active: activeTab === 'register' }"
            class="tab-button"
          >
            Регистрация
          </button>
        </div>
  
        <form @submit.prevent="handleSubmit" class="auth-form">
          <template v-if="activeTab === 'register'">
            <div class="form-group">
              <label for="name">Имя</label>
              <input
                v-model="name"
                type="text"
                id="name"
                placeholder="Введите ваше имя"
                class="form-input"
                required
              />
            </div>
          </template>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Введите ваш email"
              class="form-input"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="password">Пароль</label>
            <div class="password-input-wrapper">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Введите ваш пароль"
                class="form-input"
                required
              />
              <button 
                type="button" 
                @click="togglePasswordVisibility" 
                class="toggle-password"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
  
          <template v-if="activeTab === 'register'">
            <div class="form-group">
              <label for="confirmPassword">Подтвердите пароль</label>
              <div class="password-input-wrapper">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  placeholder="Подтвердите ваш пароль"
                  class="form-input"
                  required
                />
                <button 
                  type="button" 
                  @click="toggleConfirmPasswordVisibility" 
                  class="toggle-password"
                >
                  {{ showConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
          </template>
  
          <button type="submit" class="submit-button">
            {{ activeTab === 'login' ? 'Войти' : 'Зарегистрироваться' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const activeTab = ref('login')
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }
  
  const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value
  }
  
  const handleSubmit = () => {
    if (activeTab.value === 'login') {
      console.log('Вход', { email: email.value, password: password.value })
      // Здесь будет логика входа
    } else {
      if (password.value !== confirmPassword.value) {
        alert('Пароли не совпадают')
        return
      }
      console.log('Регистрация', { 
        name: name.value, 
        email: email.value, 
        password: password.value 
      })
      // Здесь будет логика регистрации
    }
  }
  </script>
  
  <style scoped>
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .auth-container {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    width: 100%;
    max-width: 400px;
  }
  
  .auth-tabs {
    display: flex;
    margin-bottom: 1.5rem;
  }
  
  .tab-button {
    flex: 1;
    padding: 0.75rem;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #ddd;
    font-size: 1rem;
    font-weight: 600;
    color: #777;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab-button.active {
    color: #4a90e2;
    border-bottom-color: #4a90e2;
  }
  
  .auth-form {
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    color: #333;
    transition: border-color 0.3s ease;
  }
  
  .form-input:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  .password-input-wrapper {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: #777;
  }
  
  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #3a7bc8;
  }
  
  @media (max-width: 480px) {
    .auth-container {
      padding: 1.5rem;
      margin: 1rem;
    }
  
    .tab-button {
      font-size: 0.9rem;
    }
  
    .form-input,
    .submit-button {
      font-size: 0.9rem;
    }
  }
  </style>