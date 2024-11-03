<template>
  <div class="evaluation-page">
    <!-- Header -->
    <Header />

    <!-- User Info Section -->
    <section class="user-info" v-if="user">
      <div class="user-card">
        <h2>Ваш профиль</h2>
        <div class="profile-details">
          <p><strong>ФИО:</strong> {{ user.full_name }}</p>
          <p><strong>Департамент:</strong> {{ user.department }}</p>
          <p><strong>Направление:</strong> {{ user.position }}</p>
        </div>
      </div>
    </section>

    <!-- Evaluation Form -->
    <section class="evaluation-form">
      <h2>Оставить отзыв</h2>

      <!-- Employee Selection -->
      <div class="form-group">
        <label for="employee">Выберите сотрудника:</label>
        <select v-model="selectedEmployee" id="employee" class="form-select">
          <option value="">Выберите сотрудника</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.name }}
          </option>
        </select>
      </div>

      <!-- Feedback Text -->
      <div class="form-group" v-if="selectedEmployee">
        <label for="feedback">Ваш отзыв:</label>
        <textarea v-model="feedback" id="feedback" rows="4" placeholder="Напишите ваш отзыв здесь..."
          class="form-textarea"></textarea>
      </div>

      <!-- Submit Button -->
      <button @click="submitFeedback" :disabled="!canSubmit" class="submit-button">
        Отправить отзыв
      </button>
    </section>

    <!-- Modal -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>Отзыв отправлен</h3>
        <p>Спасибо за ваш отзыв!</p>
        <div class="modal-buttons">
          <button @click="continueFeedback" class="continue-button">
            Продолжить оценивание
          </button>
          <button @click="closeModal" class="close-button">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './Header.vue';

import { useRoute } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const userId = route.params.id; // Получаем ID из URL
const user = ref();
import { getCurrentInstance } from 'vue';

// Accessing the global variable
const instance = getCurrentInstance();
const myGlobalVariable = instance.appContext.config.globalProperties.$globalUrl;
const fetchUserAndEmployees = async () => {
  try {
    const response = await axios.get(myGlobalVariable + '/user/' + userId + "/");
    if (response.data && response.data.length) {
      user.value = response.data[0]
      console.log(response.data[0])
    }
    
    // Преобразуем данные для соответствия структуре employees
    // employees.value = response.data.map(user => ({
    //     id: user.id,
    //     name: user.full_name,
    //     position: user.position || 'Не указана',
    //     rating: 5, // Замените на реальный рейтинг, если доступен
    //     avatar: user.photo || '../assets/user.png',
    //     description: 'Описание сотрудника отсутствует.', // Замените на реальное описание, если доступно
    //     reviewers: Array(8).fill('../assets/user.png') // Замените на реальные аватары, если доступны
    // }));

  } catch (error) {
    console.error('Ошибка при получении сотрудников:', error);
  }
};

onMounted(fetchUserAndEmployees);
// Mock data
const currentUser = {
  name: 'Иванов Петр Сергеевич',
  department: 'IT-отдел',
  role: 'Frontend Developer'
}

const employees = [
  { id: 1, name: 'Петров Иван Васильевич' },
  { id: 2, name: 'Сидорова Анна Михайловна' },
  { id: 3, name: 'Козлов Дмитрий Александрович' }
]

// Reactive state
const selectedEmployee = ref('')
const feedback = ref('')
const showModal = ref(false)

// Computed
const canSubmit = computed(() => {
  return selectedEmployee.value && feedback.value.trim().length > 0
})

// Methods
const submitFeedback = () => {
  if (canSubmit.value) {
    // Here you would typically make an API call
    console.log('Feedback submitted:', {
      employeeId: selectedEmployee.value,
      feedback: feedback.value
    })
    showModal.value = true
  }
}

const continueFeedback = () => {
  selectedEmployee.value = ''
  feedback.value = ''
  showModal.value = false
}

const closeModal = () => {
  showModal.value = false
  selectedEmployee.value = ''
  feedback.value = ''
}
</script>

<style scoped>
.evaluation-page {
  max-width: 100%;
  min-height: 100vh;
  background-color: #edeef0;
}

.header {
  background-color: #2787f5;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h1 {
  color: white;
  font-size: 20px;
  font-weight: 500;
}

.logo {
  width: 24px;
  height: 24px;
}

.user-info,
.evaluation-form {
  max-width: 600px;
  margin: 16px auto;
  padding: 16px;
}

.user-card,
.evaluation-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.profile-details {
  margin-top: 16px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c2d2e;
}

.form-select,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #dce1e6;
  border-radius: 8px;
  font-size: 15px;
}

.form-select:focus,
.form-textarea:focus {
  border-color: #2787f5;
  outline: none;
}

.submit-button {
  background-color: #2787f5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
}

.submit-button:disabled {
  background-color: #99a2ad;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.continue-button,
.close-button {
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.continue-button {
  background-color: #2787f5;
  color: white;
}

.close-button {
  background-color: #f2f3f5;
  color: #2c2d2e;
}

/* Responsive Design */
@media (max-width: 640px) {

  .user-info,
  .evaluation-form {
    margin: 12px;
    padding: 12px;
  }

  .modal-content {
    margin: 20px;
  }
}
</style>