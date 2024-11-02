<template>

    <head>
        <title>Scoreworker</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/vk-logo.ico" type="image/x-icon">
    </head>
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
            <!-- Left Sidebar -->
            <div class="sidebar">
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
                                :class="['gender-button', { active: selectedGender === gender }]"
                                @click="selectedGender = gender">
                                {{ gender }}
                            </button>
                        </div>
                    </div>

                    <div class="employees-list">
                        <div v-for="employee in filteredEmployees" :key="employee.id" class="employee-card"
                            @click="selectEmployee(employee)">
                            <img src="../assets/user.png" :alt="employee.name" class="employee-avatar">
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
            <div class="content">
                <div class="content-block">
                    <template v-if="selectedEmployee">
                        <div class="content-header">
                            <button class="back-button" @click="selectedEmployee = null">
                                ← {{ selectedEmployee.name }}
                            </button>
                        </div>

                        <div class="tabs">
                            <button class="tab-button" :class="{ active: activeTab === 'text' }"
                                @click="activeTab = 'text'">
                                Текстовое представление
                            </button>
                            <button class="tab-button" :class="{ active: activeTab === 'matrix' }"
                                @click="activeTab = 'matrix'">
                                Матрица компетенций
                            </button>
                        </div>

                        <div v-if="activeTab === 'text'">
                            <div class="profile-section">
                                <div class="profile-info">
                                    <img src="../assets/user.png" :alt="selectedEmployee.name" class="profile-avatar">
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
                                <p>{{ selectedEmployee.user_card.description }}</p>
                            </div>

                            <div class="reviewers-section">
                                <div class="reviewer-avatars">
                                    <img v-for="(reviewer, index) in selectedEmployee.reviewers.slice(0, 3)"
                                        :key="index" src="../assets/user.png" :alt="'Reviewer ' + (index + 1)"
                                        class="reviewer-avatar">
                                    <div class="more-reviewers">+5</div>
                                </div>
                                <span class="review-count">
                                    Оценка на основе 8 отзывов
                                </span>
                            </div>

                            <div class="skills-section">
                                <div class="skill-item" v-for="(item, index) in selectedEmployee.user_card.skills"
                                    v-if="selectEmployee">
                                    <div class="skill-header">
                                        <h4>{{ item.skill }}</h4>
                                        <div class="star-rating">
                                            <span v-for="i in 5" :key="i" class="star"
                                                :class="{ filled: i <= item.star }">★</span>
                                        </div>
                                    </div>
                                    <p>{{ item.description }}</p>
                                </div>

                                <div class="skill-item">
                                    <div class="skill-header">
                                        <h4>Эффективность</h4>
                                        <div class="star-rating">
                                            <span v-for="i in 5" :key="i" class="star"
                                                :class="{ filled: i <= 5 }">★</span>
                                        </div>
                                    </div>
                                    <p>Сотрудник выполняет задачи быстро и качественно, часто опережая сроки.</p>
                                </div>

                                <div class="skill-item">
                                    <div class="skill-header">
                                        <h4>Эффективность</h4>
                                        <div class="star-rating">
                                            <span v-for="i in 5" :key="i" class="star"
                                                :class="{ filled: i <= 3 }">★</span>
                                        </div>
                                    </div>
                                    <p>Сотрудник редко предлагает новые идеи и нуждается в дополнительной мотивации для
                                        проактивной работы.</p>
                                </div>
                            </div>

                            <div class="download-buttons">
                                <button class="download-button">Скачать PDF</button>
                                <button class="download-button">Скачать CSV</button>
                            </div>
                        </div>
                        <template v-else>
                            <CompetencyRadarChart :skills="skillsArray"/>
                        </template>
                    </template>
                    <template v-else>
                        <div class="placeholder-state">
                            <div class="placeholder-icon">
                                <img src="../assets/user.png" alt="Placeholder bear">
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
import CompetencyRadarChart from './CompetencyRadarChart.vue'; // Adjust the path as 
const searchQuery = ref('')
const selectedPosition = ref('')
const selectedDepartment = ref('')
const selectedGender = ref('Любой')
const activeTab = ref('text')
const selectedEmployee = ref(null)
const skillsArray = ref([
  { skill: 'JavaScript', star: 4 },
  { skill: 'Vue.js', star: 5 },
  { skill: 'CSS', star: 3 },
  { skill: 'HTML', star: 4 },
  { skill: 'Node.js', star: 2 }
]);
const genders = ['Любой', 'Мужской', 'Женский']



// Функция для получения сотрудников из API
const fetchEmployees = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        console.log(response.data)
        // Преобразуем данные для соответствия структуре employees
        employees.value = response.data.map(user => ({
            id: user.id,
            name: user.full_name,
            position: user.position || 'Не указана',
            rating: 5, // Замените на реальный рейтинг, если доступен
            avatar: user.photo || '../assets/user.png',
            description: 'Описание сотрудника отсутствует.', // Замените на реальное описание, если доступно
            reviewers: Array(8).fill('../assets/user.png') // Замените на реальные аватары, если доступны
        }));

    } catch (error) {
        console.error('Ошибка при получении сотрудников:', error);
    }
};
// Функция для получения сотрудников из API
const fetchEmployeesCard = async (id) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/card/' + id + "/");
        console.log(response.data.user_profile);

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

        console.log("Test", selectedEmployee.value);
    } catch (error) {
        console.error('Ошибка при получении сотрудников:', error);
    }
};

const employees = ref([
    {
        id: 1,
        name: 'Иван Петров',
        position: 'Middle-backend-developer',
        rating: 4.7,
        avatar: '/placeholder.svg?height=48&width=48',
        description: 'Иван показал себя как опытный и надежный бекенд разработчик. Его работа в целом соответствует ожиданиям компании и требованиям проектов. Он активно участвует в командных обсуждениях и демонстрирует готовность к обучению, что делает его ценным членом команды.',
        reviewers: [
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
            '/placeholder.svg?height=32&width=32',
        ]
    },
    // Add more employees as needed
])
const selectEmployee = async (employee) => {

    fetchEmployeesCard(employee.id);
    console.log(selectedEmployee)
}

const filteredEmployees = computed(() => {
    return employees.value.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesPosition = !selectedPosition.value || employee.position === selectedPosition.value
        const matchesDepartment = !selectedDepartment.value || employee.department === selectedDepartment.value
        return matchesSearch && matchesPosition && matchesDepartment
    })
})

// Получаем сотрудников при монтировании компонента
onMounted(fetchEmployees);




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

.profile-card {
    /* Remove these properties:
    background: white;
    border-radius: 12px;
    padding: 20px;
    */
}

.description {
    margin-bottom: 24px;
}

.description h3 {
    font-size: 16px;
    margin: 0 0 12px;
}

.description p {
    font-size: 14px;
    line-height: 1.5;
    color: #2c2d2e;
    margin: 0;
}

.reviewers {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
}

.reviewer-avatars {
    display: flex;
    align-items: center;
    margin-right: 12px;
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
    background-color: #f2f3f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-left: -8px;
}

.review-count {
    font-size: 13px;
    color: #818c99;
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
    background-color: #f2f3f5;
    color: #2688eb;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.download-button:hover {
    background-color: #e5ebf1;
}

.arrow-right {
    width: 8px;
    height: 8px;
    border-right: 2px solid #818c99;
    border-bottom: 2px solid #818c99;
    transform: rotate(-45deg);
}

.placeholder-state {
    /* Remove these properties:
    background: white;
    border-radius: 12px;
    padding: 40px;
    */
}

.content-block {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 0 0 #dcdedf, 0 0 0 1px #e7e8ec;
}

.content-block {
    background: white;
    border-radius: 12px;
    padding: 20px;
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

.tabs {
    display: flex;
    gap: 32px;
    margin-bottom: 24px;
    border-bottom: 2px solid #e7e8ec;
}

.tab-button {
    padding: 16px 0;
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    color: #818c99;
    position: relative;
}

.tab-button.active {
    color: #2688eb;
}

.tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #2688eb;
}

.back-button {
    font-size: 16px;
    color: #2688eb;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-bottom: 24px;
}
</style>