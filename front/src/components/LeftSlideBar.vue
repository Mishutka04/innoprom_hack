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
                        <option value="Backend">Backend Developer</option>
                        <option value="Front-End">Front-end Developer</option>
                        <option value="Full-Stack">Full-Stack Developer</option>
                        <option value="Team-Lead">Team-Lead</option>
                    </select>

                    <select class="dropdown" v-model="selectedDepartment">
                        <option value="">Департамент</option>
                        <option value="it">Инноваций</option>
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
                    <button class="start-button" @click="showAnalysisModal = true">
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

                    <div class="arrow-right"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Модальное окно анализа -->
    <div v-if="showAnalysisModal" class="modal">
        <div class="modal-content">
            <h3>Выберите направление анализа</h3>
            <select v-model="selectedAnalysisType" class="dropdown">
                <option value="">Выберите направление</option>
                <option v-for="type in metric" :value="type.id">
                    {{ type.name }}
                </option>
            </select>
            <div class="modal-actions">
                <button @click="startAnalysis" :disabled="!selectedAnalysisType" class="start-button">
                    Начать анализ
                </button>
                <button @click="closeModal" class="start-button">Закрыть</button>
            </div>
        </div>
    </div>
    <!-- Модальное окно Ожидания -->
    <div v-if="showWaitModal" class="modal">
        <div class="modal-content">
            <h3>Ожидание</h3>
        </div>
    </div>
    <!-- Модальное окно результатов анализа -->
    <div v-if="showResultModal" class="modal">
        <div class="modal-content">
            <h3>Результат анализа</h3>
            <p v-if="analysisError" class="error-message">{{ analysisError }}</p>
            <p v-else class="success-message">Анализ успешно завершен!</p>
            <button @click="closeModal" class="start-button">Закрыть</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineEmits, defineProps } from 'vue'
import axios from 'axios';
const emit = defineEmits(['selectEployye'])

const searchQuery = ref('')
const selectedPosition = ref('')
const selectedDepartment = ref('')
const selectedGender = ref('Любой')
const showAnalysisModal = ref(false)
const showResultModal = ref(false)
const showWaitModal = ref(false)

const selectedAnalysisType = ref('')
const analysisError = ref(null)

const props = defineProps({
    employee: {
        type: Array,
        required: true
    },
    metric: {
        type: Array,
        required: true
    }
})
import { getCurrentInstance } from 'vue';

// Accessing the global variable
const instance = getCurrentInstance();
const myGlobalVariable = instance.appContext.config.globalProperties.$globalUrl;
const selectEmployee = async (employee) => {
    emit('selectEployye', employee.id)
}

const genders = ['Любой', 'Мужской', 'Женский']
const select_matric_id = ref();
const filteredEmployees = computed(() => {
    return props.employee.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesPosition = !selectedPosition.value || employee.position === selectedPosition.value
        const matchesDepartment = !selectedDepartment.value || employee.department === selectedDepartment.value
        const matchesGender = selectedGender.value === 'Любой' || employee.gender === selectedGender.value
        return matchesSearch && matchesPosition && matchesDepartment && matchesGender
    })
})

const startAnalysis = async () => {
    try {
        showAnalysisModal.value = false
        showWaitModal.value = true
        // Здесь должен быть ваш код для выполнения анализа

        // await new Promise(resolve => setTimeout(resolve, 2000)) // Имитация асинхронной операции
        const data = {
            // Add any necessary fields here, for example:
            id: selectedAnalysisType.value,
        };
        const response = await axios.post(myGlobalVariable + '/generate/metric/', data);

        analysisError.value = null
        showAnalysisModal.value = false
        showResultModal.value = true
        showWaitModal.value = false
    } catch (error) {
        analysisError.value = error.response.data
        showAnalysisModal.value = false
        showResultModal.value = true
        showWaitModal.value = false
    }
}

const closeModal = () => {
    showAnalysisModal.value = false
    showResultModal.value = false
    showWaitModal.value = false
    selectedAnalysisType.value = ''
    analysisError.value = null
}
</script>

<style scoped>
/* Сохраняем существующие стили */

/* Добавляем минимальные стили для модального окна */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.error-message {
    color: red;
}

.success-message {
    color: green;
}
</style>