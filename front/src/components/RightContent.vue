<template>
    <div class="content">
        <div class="content-block">
            <template v-if="selectedEmployee">
                <div class="content-header">
                    <button class="back-button" @click="handleBackButtonClick">
                        ← {{ selectedEmployee.name }}
                    </button>
                </div>

                <div class="tabs">
                    <button class="tab-button" :class="{ active: activeTab === 'text' }" @click="activeTab = 'text'">
                        Текстовое представление
                    </button>
                    <button class="tab-button" :class="{ active: activeTab === 'matrix' }"
                        @click="activeTab = 'matrix'">
                        Матрица компетенций
                    </button>
                </div>

                <div v-if="activeTab === 'text'">

                    <div class="profile-section" v-if="skills && Object.keys(skills).length > 0">
                        <div class="profile-info">
                            <img src="../assets/user.png" :alt="selectedEmployee.name" class="profile-avatar">
                            <div class="profile-details">
                                <h2>{{ selectedEmployee.name }}</h2>
                                <p>{{ selectedEmployee.position }}</p>
                            </div>
                            <div class="profile-rating">
                                <div>{{ selectedEmployee.rating }}
                                    <span class="star-icon">★</span>
                                </div>

                                <div class="bnt-user">
                                    <ButtonUser :data_id="selectedEmployee.id"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="description-section" v-if="selectedEmployee.user_card">
                        <h3>Краткое описание</h3>
                        <p>{{ selectedEmployee.user_card.description }}</p>
                    </div>

                    <div class="reviewers-section" v-if="skills && Object.keys(skills).length > 0">
                        <div class="reviewer-avatars">
                            <img v-for="(reviewer, index) in selectedEmployee.reviewers.slice(0, 3)" :key="index"
                                src="../assets/user.png" :alt="'Reviewer ' + (index + 1)" class="reviewer-avatar">
                            <div class="more-reviewers">+5</div>
                        </div>
                        <span class="review-count">
                            Оценка на основе 8 отзывов
                        </span>


                    </div>

                    <div class="skills-section" v-if="skills && Object.keys(skills).length > 0">
                        <div v-for="(item, index) in skills">
                            <h1>Hard Skill</h1>
                            <div class="skill-item" v-for="(card, index) in item" v-if="item">
                                <div class="skill-header">
                                    <h4>{{ card.skill }}</h4>
                                    <div class="star-rating">
                                        <span v-for="i in 5" :key="i" class="star"
                                            :class="{ filled: i <= card.star }">★</span>
                                    </div>
                                </div>
                                <p>{{ card.description }}</p>
                            </div>

                        </div>
                    </div>
                    <template v-else>
                        <div class="placeholder-state">
                            <div class="placeholder-icon">
                                <img src="../assets/error.png" alt="Placeholder bear">
                            </div>
                            <p class="placeholder-text">У данного пользователя нету оценок компетенций. <b>Запустите
                                    его, чтобы получить данные!</b> </p>
                        </div>
                    </template>
                </div>
                <template v-else>
                    <div v-for="(item, index) in skills" v-if="skills && Object.keys(skills).length > 0">
                        <CompetencyRadarChart :skills="item" :id="index" />
                    </div>
                    <template v-else>
                        <div class="placeholder-state">
                            <div class="placeholder-icon">
                                <img src="../assets/error.png" alt="Placeholder bear">
                            </div>
                            <p class="placeholder-text">У данного пользователя нету данных по его компетенциям.
                                <b>Запустите процесс анализа, чтобы получить метрики компетенций!</b> </p>
                        </div>
                    </template>

                </template>
            </template>
            <template v-else>
                <div class="placeholder-state">
                    <div class="placeholder-icon">
                        <img src="../assets/error.png" alt="Placeholder bear">
                    </div>
                    <p class="placeholder-text">Сотрудник еще не выбран</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import CompetencyRadarChart from './CompetencyRadarChart.vue';
import { defineEmits } from 'vue';
import ButtonCSV from './ButtonCSV.vue'
import ButtonPdf from './ButtonPdf.vue'
import ButtonUser from './ButtonUser.vue'
const emit = defineEmits(['clearSelectedEmployee']);

const activeTab = ref('text');
const props = defineProps({
    selectedEmployee: {
        type: [Array, Object],
        required: true
    },
    skills: {
        type: [Array, Object],
        required: true
    },
    metodology: {
        type: [Array, Object],
        required: true
    }


});


const handleBackButtonClick = () => {
    emit('clearSelectedEmployee'); // Emit event to parent
};


</script>
<style>
.bnt-user {
    justify-content: end;
    align-items: end;
    display: flex;
    margin-top: 20px;
}
</style>