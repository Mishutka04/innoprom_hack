<template>
  <div class="app-wrapper">
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-container">
          <div class="vk-logo">
            <span class="vk-text">VK</span>
          </div>
          <span class="app-name">Scoreworker</span>
        </div>
      </div>
    </header>

    <div class="app-container">
      <!-- Mobile Back Button -->
      <button v-if="selectedEmployee && isMobile" class="mobile-back-button" @click="selectedEmployee = null">
        <span class="back-arrow">←</span> {{ selectedEmployee.name }}
      </button>

      <!-- Left Sidebar -->
      <div class="sidebar" v-show="!selectedEmployee || !isMobile">
        <div class="sidebar-block">
          <h2 class="sidebar-title">Результаты оценки сотрудников</h2>

          <div class="search-container">
            <input type="text" placeholder="Поиск" v-model="searchQuery" class="search-input">
            <button class="voice-button">
              <i class="mic-icon"></i>
            </button>
          </div>

          <div class="filters">
            <p class="filter-label">Фильтрация</p>
            <div class="dropdown-container">
              <select class="dropdown" v-model="selectedPosition">
                <option value="">Должность</option>
                <option value="backend">Backend Developer</option>
              </select>

              <select class="dropdown" v-model="selectedDepartment">
                <option value="">Департамент</option>
                <option value="it">IT</option>
              </select>
            </div>

            <div class="gender-filter">
              <button v-for="gender in genders" :key="gender"
                :class="['gender-button', { active: selectedGender === gender }]" @click="selectedGender = gender">
                {{ gender }}
              </button>
            </div>
          </div>

          <div class="employees-list">
            <div v-for="employee in filteredEmployees" :key="employee.id" class="employee-card"
              @click="selectEmployee(employee)">
              <img :src="employee.avatar" :alt="employee.name" class="employee-avatar">
              <div class="employee-info">
                <h3>{{ employee.name }}</h3>
                <p>{{ employee.position }}</p>
              </div>
              <div class="rating">{{ employee.rating }}</div>
              <div class="arrow-right"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content -->
      <div class="content" v-show="selectedEmployee || !isMobile">
        <div class="content-block">
          <template v-if="selectedEmployee">
            <div class="content-header" v-if="!isMobile">
              <button class="back-button" @click="selectedEmployee = null">
                ← {{ selectedEmployee.name }}
              </button>
            </div>

            <div class="tabs">
              <button class="tab-button" :class="{ active: activeTab === 'text' }" @click="activeTab = 'text'">
                Текстовое представление
              </button>
              <button class="tab-button" :class="{ active: activeTab === 'matrix' }" @click="activeTab = 'matrix'">
                Матрица компетенций
              </button>
            </div>

            <div v-if="activeTab === 'text'">
              <div class="profile-section">
                <div class="profile-info">
                  <img :src="selectedEmployee.avatar" :alt="selectedEmployee.name" class="profile-avatar">
                  <div class="profile-details">
                    <h2>{{ selectedEmployee.name }}</h2>
                    <p>{{ selectedEmployee.position }}</p>
                  </div>
                  <div class="profile-rating">
                    {{ selectedEmployee.rating }}
                    <span class="star-icon">★</span>
                  </div>
                </div>
              </div>

              <div class="description-section">
                <h3>Краткое описание</h3>
                <p>{{ selectedEmployee.user_card?.description }}</p>
              </div>

              <div class="reviewers-section">
                <div class="reviewer-avatars">
                  <img v-for="(reviewer, index) in selectedEmployee.reviewers?.slice(0, 3)" :key="index" :src="reviewer"
                    :alt="'Reviewer ' + (index + 1)" class="reviewer-avatar">
                  <div class="more-reviewers">+5</div>
                </div>
                <span class="review-count">
                  Оценка на основе 8 отзывов
                </span>
              </div>

              <div class="skills-section">
                <div class="skill-item" v-for="(item, index) in selectedEmployee.user_card?.skills" :key="index">
                  <div class="skill-header">
                    <h4>{{ item.skill }}</h4>
                    <div class="star-rating">
                      <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= item.star }">★</span>
                    </div>
                  </div>
                  <p>{{ item.description }}</p>
                </div>
              </div>

              <div class="download-buttons">
                <button class="download-button">Скачать PDF</button>
                <button class="download-button">Скачать CSV</button>
              </div>
            </div>
            <template v-else>
              <CompetencyRadarChart :skills="skills" />
            </template>
          </template>
          <template v-else>
            <div class="placeholder-state">
              <div class="placeholder-icon">
                <img src="../assets/user.png" alt="Placeholder">
              </div>
              <p class="placeholder-text">Сотрудник еще не выбран</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';
import CompetencyRadarChart from './CompetencyRadarChart.vue';

const searchQuery = ref('')
const selectedPosition = ref('')
const selectedDepartment = ref('')
const selectedGender = ref('Любой')
const activeTab = ref('text')
const selectedEmployee = ref(null)
const methodologies = ref()
const skills = ref([])
const employees = ref([])
const isMobile = ref(window.innerWidth <= 768)

const genders = ['Любой', 'Мужской', 'Женский']
import { getCurrentInstance } from 'vue';

// Accessing the global variable
const instance = getCurrentInstance();
const myGlobalVariable = instance.appContext.config.globalProperties.$globalUrl;
async function fetchSkills() {
  try {
    const skillsArray = [];

    methodologies.value.forEach(methodology => {
      const skillData = JSON.parse(methodology.matrix_competence).criteries;

      skillData.forEach(criterion => {
        skillsArray.push({
          skill: criterion.criteria,
          star: criterion.star
        });
      });
    });

    return skillsArray;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
}

const fetchEmployees = async () => {
  try {
    const response = await axios.get(myGlobalVariable + '/users/');

    employees.value = response.data.map(user => ({
      id: user.id,
      name: user.full_name,
      position: user.position || 'Не указана',
      rating: 4.7,
      avatar: user.photo || '../assets/user.png',
      description: 'Описание сотрудника отсутствует.',
      reviewers: Array(8).fill('../assets/user.png')
    }));

  } catch (error) {
    console.error('Ошибка при получении сотрудников:', error);
  }
};

const fetchEmployeesCard = async (id) => {
  try {
    const response = await axios.get(myGlobalVariable + '/user/card/' + id + "/");
    const user = response.data.user_profile;

    selectedEmployee.value = {
      id: user.id,
      name: user.full_name,
      position: user.position || 'Не указана',
      rating: 4.7,
      avatar: user.photo || '../assets/user.png',
      description: 'Описание сотрудника отсутствует.',
      reviewers: Array(8).fill('../assets/user.png'),
      user_card: response.data.user_card[0]
    };
    methodologies.value = response.data.methodologies

  } catch (error) {
    console.error('Ошибка при получении сотрудников:', error);
  }
  fetchSkills().then(fetchedSkills => {
    skills.value = fetchedSkills;
  });

  console.log("Test", skills.value);
};

const selectEmployee = async (employee) => {
  fetchEmployeesCard(employee.id);
}

const filteredEmployees = computed(() => {
  return employees.value.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesPosition = !selectedPosition.value || employee.position === selectedPosition.value
    const matchesDepartment = !selectedDepartment.value || employee.department === selectedDepartment.value
    return matchesSearch && matchesPosition && matchesDepartment
  })
})

onMounted(() => {
  fetchEmployees();
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768
  })
});
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: #edeef0;
}

.app-header {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  height: 48px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vk-logo {
  width: 24px;
  height: 24px;
  background: #0077ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vk-text {
  color: white;
  font-weight: 600;
  font-size: 12px;
}

.app-name {
  color: #0077ff;
  font-size: 16px;
  font-weight: 600;
}

.app-container {
  display: flex;
  padding-top: 20px;
  max-width: 1920px;
  margin: 0 auto;
}

.sidebar {
  width: 360px;
  padding: 0 16px;
}

.sidebar-block {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.search-container {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: #f2f3f5;
  font-size: 14px;
}

.voice-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.filters {
  margin-bottom: 20px;
}

.filter-label {
  font-size: 13px;
  color: #818c99;
  margin-bottom: 8px;
}

.dropdown-container {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.dropdown {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: #f2f3f5;
  font-size: 14px;
}

.gender-filter {
  display: flex;
  gap: 8px;
}

.gender-button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: #f2f3f5;
  cursor: pointer;
  font-size: 14px;
}

.gender-button.active {
  background-color: #e5ebf1;
}

.employees-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
}

.employee-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f2f3f5;
  border-radius: 8px;
  cursor: pointer;
}

.employee-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.employee-info {
  flex: 1;
}

.employee-info h3 {
  font-size: 14px;
  margin: 0;
}

.employee-info p {
  font-size: 13px;
  color: #818c99;
  margin: 4px 0 0;
}

.rating {
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
}

.content {
  flex: 1;
  padding: 0 16px;
}

.content-header {
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  font-size: 16px;
  color: #2688eb;
  cursor: pointer;
  padding: 0;
}

.tabs {
  display: flex;
  gap: 2px;
  margin-bottom: 20px;
  border-bottom: 2px solid #dce1e6;
}

.tab-button {
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #818c99;
}

.tab-button.active {
  color: #2688eb;
  border-bottom: 2px solid #2688eb;
  margin-bottom: -2px;
}

.content-block {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 0 0 #dcdedf, 0 0 0 1px #e7e8ec;
}

.profile-section {
  margin-bottom: 24px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.profile-details {
  flex: 1;
}

.profile-details h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #000;
}

.profile-details p {
  font-size: 14px;
  color: #818c99;
  margin: 0;
}

.profile-rating {
  font-size: 20px;
  font-weight: 600;
  color: #000;
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  color: #ffd700;
}

.description-section {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.description-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #000;
}

.description-section p {
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  color: #2c2d2e;
}

.reviewers-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.reviewer-avatars {
  display: flex;
  align-items: center;
}

.reviewer-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -8px;
}

.reviewer-avatar:first-child {
  margin-left: 0;
}

.more-reviewers {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: -8px;
  border: 2px solid white;
  color: #818c99;
}

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
  color: #ffd700;
}

.skill-item p {
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
  color: #2c2d2e;
}

.download-buttons {
  display: flex;
  gap: 12px;
}

.download-button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #f5f5f5;
  color: #2688eb;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.download-button:hover {
  background: #e5ebf1;
}

.arrow-right {
  width: 8px;
  height: 8px;
  border-right: 2px solid #818c99;
  border-bottom: 2px solid #818c99;
  transform: rotate(-45deg);
}

.placeholder-state {
  text-align: center;
  padding: 40px 0;
}

.placeholder-icon img {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.placeholder-text {
  font-size: 16px;
  color: #818c99;
}

/* Mobile styles */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    padding-top: 0;
  }

  .sidebar,
  .content {
    width: 100%;
    padding: 0;
  }

  .sidebar-block,
  .content-block {
    border-radius: 0;
    box-shadow: none;
  }

  .mobile-back-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: none;
    border: none;
    font-size: 16px;
    color: #2688eb;
    cursor: pointer;
  }

  .back-arrow {
    font-size: 20px;
  }

  .tabs {
    padding: 0 16px;
  }

  .profile-section {
    padding: 0 16px;
  }

  .description-section {
    margin: 16px;
  }

  .skills-section {
    padding: 0 16px;
  }

  .download-buttons {
    padding: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }

  .employees-list {
    max-height: none;
  }

  .employee-card {
    margin-bottom: 8px;
  }

  .content-header {
    display: none;
  }
}
</style>