<template>

    <head>
        <title>Scoreworker</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="/vk-logo.ico" type="image/x-icon">
    </head>
    <div class="app-wrapper">
        <!-- Header -->
        <Header/>

        <div class="app-container">
            <LeftSlideBar :employee="employees" :metric="metric_list" @selectEployye='fetchEmployeesCard'/> 

            <!-- Right Content -->
            <RightContent :selectedEmployee="selectedEmployee" :skills="skills" @clearSelectedEmployee="clearSelectedEmployee" :metodology="methodologies"/>
            
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';
import Header from './Header.vue';
import LeftSlideBar from './LeftSlideBar.vue';
import RightContent from './RightContent.vue';
import { getCurrentInstance } from 'vue';

// Accessing the global variable
const instance = getCurrentInstance();
const myGlobalVariable = instance.appContext.config.globalProperties.$globalUrl;
const metric_list = ref()
const selectedEmployee = ref(null)

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
const fetchEmployees = async () => {
    try {
        const response = await axios.get(myGlobalVariable + '/users/');
        const response_metric = await axios.get(myGlobalVariable + '/methodology/');
        metric_list.value = response_metric.data
        console.log(response_metric, "111111111")
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
        const response = await axios.get(myGlobalVariable + '/user/card/' + id + "/");
        console.log(response.data)

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
    console.log("ASAASA", methodologies.value)
};

const employees = ref([])
// Получаем сотрудников при монтировании компонента
onMounted(fetchEmployees);




</script>

<style>
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
    width: 90%;
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
    width: 100%;
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
  .start-button{
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background-color: #f2f3f5;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    margin-top: 10px;
  }
  
  .gender-button.active {
    background-color: #e5ebf1;
  }
  .start-button.active {
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
    border-bottom: 2px solid  #dce1e6;
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
    flex-direction: column;
  }
  
  .star-icon {
    color: #2688EB;
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
    margin-top: 1.5rem
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
    color: #2688EB;
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
    border-right: 2px solid #2688eb;
    border-bottom: 2px solid #2688eb;
    transform: rotate(-45deg);
    color: #0077ff
  }
  
  .placeholder-state {
    text-align: center;
    padding: 40px 0;
  }
  
  .placeholder-icon img {
    width: 128px;
    height: 168px;
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