<template>
    <div class="dashboard">
      <div class="content">
        <div class="left-panel">
          <div class="search-bar">
            <SearchIcon :size="16" class="search-icon" />
            <input type="text" v-model="filter.search" placeholder="Поиск" />
          </div>
  
          <div class="gender-filter">
            <button 
              v-for="gender in genders" 
              :key="gender.value"
              :class="['gender-btn', { active: filter.gender === gender.value }]"
              @click="filter.gender = gender.value"
            >
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
  
          <div class="department-section">
            <h3>Backend</h3>
            <div class="employee-list">
              <div v-for="employee in filteredEmployees" 
                   :key="employee.id" 
                   class="employee-item"
                   :class="{ selected: selectedEmployee?.id === employee.id }"
                   @click="selectEmployee(employee)">
                <div class="employee-info">
                  <img :src="employee.photo" :alt="employee.name" class="employee-avatar" />
                  <div class="employee-details">
                    <div class="employee-name">{{ employee.name }}</div>
                    <div class="employee-position">{{ employee.position }}</div>
                  </div>
                </div>
                <div class="employee-rating">
                  {{ employee.rating }}
                  <ChevronRightIcon :size="16" class="chevron-icon" />
                </div>
              </div>
            </div>
          </div>
  
          <div class="pagination">
            <button 
              v-for="page in 5" 
              :key="page"
              :class="['page-btn', { active: currentPage === page }]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
        </div>
  
        <div class="right-panel" v-if="selectedEmployee">
          <!-- Существующая карточка сотрудника -->
          <div class="employee-card">
            <img :src="selectedEmployee.photo" :alt="selectedEmployee.name" class="employee-photo">
            <h2>{{ selectedEmployee.name }}</h2>
            <p>Дата рождения: {{ formatDate(selectedEmployee.birthDate) }}</p>
            <p>Департамент: {{ selectedEmployee.department }}</p>
            <p>Стаж работы: {{ selectedEmployee.experience }} лет</p>
            
            <h3>Компетенции</h3>
            <div class="skills-charts">
              <div class="skill-chart">
                <h4>Soft Skills</h4>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <polygon :points="getPolygonPoints(selectedEmployee.softSkills)" 
                          fill="rgba(81, 129, 184, 0.6)" 
                          stroke="#5181b8" 
                          stroke-width="2" />
                  <template v-for="(point, index) in getSkillPoints(selectedEmployee.softSkills)" :key="index">
                    <circle :cx="point.x" :cy="point.y" r="4" fill="#5181b8" />
                    <text :x="point.x" :y="point.y" text-anchor="middle" :dy="point.y > 100 ? 20 : -10">
                      {{ index + 1 }}
                    </text>
                  </template>
                </svg>
              </div>
              <div class="skill-chart">
                <h4>Hard Skills</h4>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <polygon :points="getPolygonPoints(selectedEmployee.hardSkills)" 
                          fill="rgba(81, 129, 184, 0.6)" 
                          stroke="#5181b8" 
                          stroke-width="2" />
                  <template v-for="(point, index) in getSkillPoints(selectedEmployee.hardSkills)" :key="index">
                    <circle :cx="point.x" :cy="point.y" r="4" fill="#5181b8" />
                    <text :x="point.x" :y="point.y" text-anchor="middle" :dy="point.y > 100 ? 20 : -10">
                      {{ index + 1 }}
                    </text>
                  </template>
                </svg>
              </div>
            </div>
            
            <h3>Описание компетенций</h3>
            <p>{{ selectedEmployee.competencyDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { SearchIcon, ChevronRightIcon } from 'lucide-vue-next'
  
  const currentPage = ref(1)
  const filter = ref({
    search: '',
    gender: 'any',
    position: '',
    department: ''
  })
  
  const genders = [
    { label: 'Любой', value: 'any' },
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' }
  ]
  
  const employees = ref([
    { 
      id: 1,
      name: 'Иван Петров',
      position: 'Backend developer',
      department: 'IT',
      gender: 'male',
      rating: 4.7,
      photo: '/placeholder.svg?height=40&width=40',
      birthDate: '1990-05-15',
      experience: 5,
      softSkills: [4, 3, 5, 2, 4],
      hardSkills: [5, 4, 3, 5, 4],
      competencyDescription: 'Отличные технические навыки, но нужно улучшить коммуникацию.'
    },
    { 
      id: 2,
      name: 'Марина Антоненко',
      position: 'Backend developer',
      department: 'IT',
      gender: 'female',
      rating: 4.7,
      photo: '/placeholder.svg?height=40&width=40',
      birthDate: '1988-11-23',
      experience: 7,
      softSkills: [5, 4, 4, 5, 3],
      hardSkills: [3, 4, 5, 3, 4],
      competencyDescription: 'Сильные навыки работы с людьми, рекомендуется развивать аналитические способности.'
    },
    { 
      id: 3,
      name: 'Артём Ка',
      position: 'Backend developer',
      department: 'IT',
      gender: 'male',
      rating: 4.7,
      photo: '/placeholder.svg?height=40&width=40',
      birthDate: '1992-03-08',
      experience: 4,
      softSkills: [3, 5, 4, 4, 5],
      hardSkills: [4, 5, 3, 4, 5],
      competencyDescription: 'Креативный подход к решению задач, необходимо улучшить навыки тайм-менеджмента.'
    }
  ])
  
  const selectedEmployee = ref(null)
  
  const filteredEmployees = computed(() => {
    return employees.value.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(filter.value.search.toLowerCase())
      const matchesGender = filter.value.gender === 'any' || emp.gender === filter.value.gender
      const matchesPosition = !filter.value.position || emp.position.toLowerCase().includes(filter.value.position)
      const matchesDepartment = !filter.value.department || emp.department.toLowerCase().includes(filter.value.department)
      
      return matchesSearch && matchesGender && matchesPosition && matchesDepartment
    })
  })
  
  const selectEmployee = (employee) => {
    selectedEmployee.value = employee
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('ru-RU', options)
  }
  
  const getSkillPoints = (skills) => {
    const size = 200
    const center = size / 2
    const radius = 80
  
    return skills.map((skill, index) => {
      const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2
      const value = skill / 5
      return {
        x: center + radius * value * Math.cos(angle),
        y: center + radius * value * Math.sin(angle)
      }
    })
  }
  
  const getPolygonPoints = (skills) => {
    return getSkillPoints(skills).map(point => `${point.x},${point.y}`).join(' ')
  }
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
  
  
  
  h2, h3, h4 {
    color: #2a5885;
    margin-bottom: 10px;
  }
  
  p {
    color: #656565;
    margin-bottom: 5px;
    font-size: 13px;
  }
  </style>