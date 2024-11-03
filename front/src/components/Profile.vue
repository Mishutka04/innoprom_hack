<template>
  <div class="page-container">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Profile Section -->
      <div class="profile-section" v-if="selectedEmployee">
        <div class="profile-header">
          <img src="../assets/user.png" alt="Profile" class="profile-image" />
          <div class="profile-info">
            <h1 class="profile-name">{{ selectedEmployee.name }}</h1>
            <p class="profile-position">{{ selectedEmployee.position }}</p>
          </div>
          <div class="profile-actions">
            <ButtonCSV/>
            <ButtonPdf/>
          </div>
        </div>

        <!-- Description -->
        <div class="description-section">
          <h2 class="section-title">Краткое описание</h2>
          <p class="description-text">{{ selectedEmployee.description }}
          </p>
        </div>

        <!-- Reviewers -->
        <div class="reviewers-section">
          <div class="reviewers-avatars">
            <img v-for="i in 3" :key="i" src="../assets/user.png" alt="Reviewer" class="reviewer-avatar" />
            <div class="reviewer-count">
              <span>+5</span>
            </div>
          </div>
          <span class="review-count">Оценка на основе 8 отзывов</span>
        </div>
      </div>
      <!-- Skills user -->
      <div class="skills-section-card" v-if="skills.length > 0">
        <div class="skill-item" v-for="(item, index) in skills" v-if="selectedEmployee">
          <div class="skill-header">
            <h4>{{ item.skill }}</h4>
            <div class="star-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= item.star }">★</span>
            </div>
          </div>
          <p>{{ item.description }}</p>
        </div>



      </div>
      <!-- Skills user -->
      <div class="skills-section">
        <h1>Блок компеценций</h1>
        <div class="skill-item">
          <div class="skill-header">
            <h4>Скиыфв</h4>
            <div class="star-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= 5 }">★</span>
            </div>
          </div>
          <p>фыв</p>
        </div>
        <div class="skill-item">
          <div class="skill-header">
            <h4>Скиыфв</h4>
            <div class="star-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= 5 }">★</span>
            </div>
          </div>
          <p>фыв</p>
        </div>
        <div class="skill-item">
          <div class="skill-header">
            <h4>Скиыфв</h4>
            <div class="star-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= 5 }">★</span>
            </div>
          </div>
          <p>фыв</p>
        </div>



      </div>
      <!-- Skills Chart -->
      <div class="skills-section">
        <h1>Блок карточек</h1>
        <div v-for="(item, index) in skills" v-if="skills">
          <CompetencyRadarChart :skills="item" :id="index" />
        </div>
        <div v-else>Запустите процесс анализа карточек</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ButtonCSV from './ButtonCSV.vue'
import ButtonPdf from './ButtonPdf.vue'
import axios from 'axios';
import Chart from 'chart.js/auto'
import Header from './Header.vue'
import CompetencyRadarChart from './CompetencyRadarChart.vue'
const chartRef = ref(null)
const selectedEmployee = ref(null)
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id; // Получаем ID из URL

const methodologies = ref()
const skills = ref([])
async function fetchSkills() {
  try {
    // Извлечение критериев и оценок для всех методологий
    const skillsObject = {}; // Object to hold categories and their criteria

    methodologies.value.forEach((methodology, index) => {
      const skillData = JSON.parse(methodology.matrix_competence).criteries;

      // Check if there are criteria available
      if (skillData && Array.isArray(skillData)) {
        // Create a new category for each methodology
        skillsObject[index] = {};

        skillData.forEach((criterion, criterionIndex) => {
          skillsObject[index][criterionIndex] = {
            skill: criterion.criteria,
            star: criterion.star,
            description: criterion.comment
          };
        });
      }
    });
    console.log(skillsObject, "SASD")
    return skillsObject; // Return the structured object
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return {};
  }
}
const clearSelectedEmployee = () => {
  selectedEmployee.value = null; // Clear selected employee
};
// Функция для получения сотрудников из API
// Функция для получения сотрудников из API
const fetchEmployeesCard = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user/card/' + userId + "/");
    console.log(response.data);

    // Преобразуем данные для соответствия структуре employees
    const user = response.data.user_profile; // Извлекаем объект user_profile

    selectedEmployee.value = {
      id: user.id,
      name: user.full_name,
      position: user.position || 'Не указана',
      rating: 5, // Замените на реальный рейтинг, если доступен
      avatar: user.photo || '../assets/user.png',
      description: 'Описание сотрудника отсутствует.', // Замените на реальное описание, если доступно
      reviewers: Array(8).fill('../assets/user.png'), // Замените на реальные аватары, если доступны
      user_card: response.data.user_card[0]
    };
    methodologies.value = response.data.methodologies

  } catch (error) {
    console.error('Ошибка при получении сотрудников:', error);
  }
  fetchSkills().then(fetchedSkills => {
    skills.value = fetchedSkills;
  });
};

const employees = ref([])
// Получаем сотрудников при монтировании компонента
onMounted(fetchEmployeesCard);

</script>

<style scoped>
/* Global Styles */

.review-count {
  font-size: 13px;
  color: #818c99;
}

.skills-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.skill-item {
  border: 1px solid #e7e8ec;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-header h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #000;
}

.star-rating {
  display: flex;
  gap: 2px;
}

.star {
  color: #e7e8ec;
  font-size: 16px;
}

.star.filled {
  color: #2563eb;
}

.skill-item p {
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
  color: #2c2d2e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.page-container {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Header Styles */
.header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 2rem;
  width: 2rem;
}

.logo-text {
  margin-left: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b82f6;
}

/* Main Content Styles */
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Profile Section Styles */
.profile-section {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 640px) {
  .profile-header {
    flex-direction: row;
    align-items: center;
  }
}

.profile-image {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.profile-image:hover {
  transform: scale(1.05);
}

.profile-info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
}

@media (min-width: 640px) {
  .profile-info {
    margin-top: 0;
    margin-left: 1.5rem;
    flex-grow: 1;
  }
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.profile-position {
  color: #6b7280;
}

.profile-actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) {
  .profile-actions {
    margin-top: 0;
  }
}

.btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 0.5rem;
}

.btn-primary:hover {
  background-color: #2563eb;
}

/* Description Section Styles */
.description-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.description-text {
  color: #4b5563;
  
}

/* Reviewers Section Styles */
.reviewers-section {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}

.reviewers-avatars {
  display: flex;
  margin-right: 1rem;
}

.reviewer-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid #ffffff;
  margin-right: -0.5rem;
}

.reviewer-count {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.review-count {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Skills Section Styles */
.skills-section {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.chart-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>