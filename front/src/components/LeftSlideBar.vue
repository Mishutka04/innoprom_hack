<template>
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
                <div class="start_analys">
                    <button class="start-button"  @click="">
                        Начать анализ
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
</template>

<script setup>
import { ref, computed } from 'vue'

import { defineEmits } from 'vue';

const emit = defineEmits();




const searchQuery = ref('')
const selectedPosition = ref('')
const selectedDepartment = ref('')
const selectedGender = ref('Любой')


const props = defineProps({
  employee: {
    type: Array,
    required: true
  }
});
const selectEmployee = async (employee) => {
    emit('selectEployye', employee.id);
}
const genders = ['Любой', 'Мужской', 'Женский']


const filteredEmployees = computed(() => {
    return props.employee.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesPosition = !selectedPosition.value || employee.position === selectedPosition.value
        const matchesDepartment = !selectedDepartment.value || employee.department === selectedDepartment.value
        return matchesSearch && matchesPosition && matchesDepartment
    })
})
</script>

<style scoped></style>