<template>
    <div class="dashboard">
        <div class="content">
            <div class="left-panel">
                <div class="search-bar">
                    <SearchIcon :size="16" class="search-icon" />
                    <input type="text" v-model="filter.search" placeholder="Поиск" />
                </div>
                <div class="gender-filter">
                    <button v-for="gender in genders" :key="gender.value"
                        :class="['gender-btn', { active: filter.gender === gender.value }]"
                        @click="filter.gender = gender.value">
                        {{ gender.label }}
                    </button>
                </div>
                <div class="filters">
                    <div class="filter-dropdown">
                        <select v-model="filter.position">
                            <option value="">Должность</option>
                            <option value="developer">Backend developer</option>
                            <option value="designer">Designer</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <div class="filter-dropdown">
                        <select v-model="filter.department">
                            <option value="">Департамент</option>
                            <option value="it">IT</option>
                            <option value="hr">HR</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>
                </div>

                <!-- Список сотрудников -->
                <div class="department-section">
                    <h3>Backend</h3>
                    <div class="employee-list">
                        <div v-for="employee in filteredEmployees" :key="employee.id" class="employee-item"
                            :class="{ selected: selectedEmployee?.id === employee.id }"
                            @click="selectEmployee(employee)">
                            <div class="employee-info">
                                <img :src="employee.photo || defaultAvatar" :alt="employee.full_name"
                                    class="employee-avatar" />
                                <div class="employee-details">
                                    <div class="employee-name">{{ employee.full_name }}</div>
                                    <div class="employee-position">{{ employee.position }}</div>
                                </div>
                            </div>
                            <div class="employee-rating">
                                {{ employee.rating || 'N/A' }}
                                <ChevronRightIcon :size="16" class="chevron-icon" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Пагинация -->
                <div class="pagination">
                    <button v-for="page in 5" :key="page" :class="['page-btn', { active: currentPage === page }]"
                        @click="currentPage = page">
                        {{ page }}
                    </button>
                </div>
            </div>

            <!-- Карточка сотрудника -->
            <div class="right-panel" v-if="selectedEmployee">
                <!-- Существующая карточка сотрудника -->
                <div class="employee-card">
                    <img :src="selectedEmployee.photo" :alt="selectedEmployee.name" class="employee-photo">
                    <h2>{{ selectedEmployee.name }}</h2>
                    <p>Дата рождения: {{ formatDate(selectedEmployee.birthDate) }}</p>
                    <p>Департамент: {{ selectedEmployee.department }}</p>
                    <p>Стаж работы: {{ selectedEmployee.experience }} лет</p>

                    <!-- Компетенции -->
                    <h3>Компетенции</h3>
                    <!-- Ваши графики навыков здесь -->

                    <!-- Описание компетенций -->
                    <h3>Описание компетенций</h3>
                    <p>{{ selectedEmployee.competencyDescription }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
// Импорт необходимых библиотек
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; // Импортируем Axios
import { SearchIcon, ChevronRightIcon } from 'lucide-vue-next';

const currentPage = ref(1);
const filter = ref({ search: '', gender: 'any', position: '', department: '' });
const genders = [
    { label: 'Любой', value: 'any' },
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' }
];

// Переменная для хранения сотрудников
const employees = ref([]); // Изначально пустой массив сотрудников

const selectedEmployee = ref(null);

// Метод для получения данных сотрудников
const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users/');
    employees.value = response.data; // Set the fetched employees to the ref
    console.log(employees)
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};
const userProfile = ref(null); // Declare userProfile here
const methodologies = ref([]);
// Вызов метода fetchEmployees при загрузке компонента


const renderCompetencyChart = (competencies) => {
  const ctx = document.getElementById('competencyChart').getContext('2d');
  const labels = competencies.map(comp => comp.name); // Assuming each competency has a name
  const dataValues = competencies.map(comp => comp.level); // Assuming each competency has a level

  new Chart(ctx, {
    type: 'bar', // You can change this to 'line', 'pie', etc.
    data: {
      labels: labels,
      datasets: [{
        label: 'Компетенции',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const calculateExperience = (startDate) => {
  const startYear = new Date(startDate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - startYear; // Simple calculation of experience in years
};

// Fetch employee data when the component is mounted or when selectedEmployee changes
onMounted(() => {
    fetchEmployees();
});

// Фильтрация сотрудников на основе фильтров
const filteredEmployees = computed(() => {
  return employees.value; // You can add filtering logic here if needed
});

const selectEmployee = async (employee) => {
    selectedEmployee.value = employee;
    await fetchUserProfile(employee.id); // Fetch user profile and methodologies
};
const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/user/card/${id}/`);

    console.log(response.data)
    userProfile.value = response.data.user_profile; // Set user profile
    methodologies.value = response.data.methodologies; // Set methodologies
    renderCompetencyChart(methodologies.value)
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};


// Ваши методы для графиков навыков...
</script>

<style scoped>
.dashboard {
    display: flex;
    height: 100vh;
    background-color: #edeef0;
    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif;
}

.content {
    display: flex;
    flex: 1;
    gap: 20px;
    padding: 20px;
}

.left-panel {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.search-bar {
    position: relative;
    width: 100%;
}

.search-bar input {
    width: 100%;
    padding: 8px 32px;
    border: none;
    border-radius: 8px;
    background-color: #f0f2f5;
    font-size: 14px;
}

.search-icon {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #818c99;
}

.gender-filter {
    display: flex;
    gap: 8px;
}

.gender-btn {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background-color: #f0f2f5;
    color: #818c99;
    font-size: 14px;
    cursor: pointer;
}

.gender-btn.active {
    background-color: #5181b8;
    color: white;
}

.filters {
    display: flex;
    gap: 8px;
}

.filter-dropdown {
    flex: 1;
}

.filter-dropdown select {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background-color: #f0f2f5;
    color: #818c99;
    font-size: 14px;
}

.department-section h3 {
    margin-bottom: 12px;
    font-size: 16px;
    color: #2a5885;
}

.employee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.employee-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
}

.employee-item:hover {
    background-color: #f5f6f8;
}

.employee-item.selected {
    background-color: #edf2f8;
}

.employee-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.employee-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.employee-details {
    display: flex;
    flex-direction: column;
}

.employee-name {
    font-size: 14px;
    font-weight: 500;
    color: #2a5885;
}

.employee-position {
    font-size: 13px;
    color: #818c99;
}

.employee-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #818c99;
    font-size: 14px;
}

.chevron-icon {
    color: #818c99;
}

.pagination {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: auto;
    padding: 16px 0;
}

.page-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    color: #2a5885;
    font-size: 14px;
    cursor: pointer;
}

.page-btn:hover {
    background-color: #f0f2f5;
}

.page-btn.active {
    background-color: #5181b8;
    color: white;
}

.right-panel {
    flex: 1;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
}

/* Сохраняем существующие стили для правой панели */
.employee-card {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
}

.employee-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.skills-charts {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.skill-chart {
    text-align: center;
}



h2,
h3,
h4 {
    color: #2a5885;
    margin-bottom: 10px;
}

p {
    color: #656565;
    margin-bottom: 5px;
    font-size: 13px;
}
</style>