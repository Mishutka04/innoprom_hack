<template>
    <button class="btn-primary" @click="cd">
        Подробнее
    </button>
</template>
<script setup>
import { defineProps } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
function cd() {
    router.push('/profile/' + props.data_id)
}
const props = defineProps({
    data_id: {
        type: Number,
        required: true
    },
});
console.log(props.data_id)
</script>
<style>
.btn-primary {
    width: 100%;
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
</style>