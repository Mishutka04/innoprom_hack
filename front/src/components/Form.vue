<template>
    <div class="form-container">
      <div class="form-wrapper">
        <div class="form-header">
          <div class="logo">
            <img src="" alt="Logo" class="logo-image" />
          </div>
        </div>
        
        <form @submit.prevent="submitForm" class="dynamic-form">
          <div v-for="(field, index) in formFields" :key="index" class="form-group">
            <label :for="field.name" class="form-label">{{ field.name }}</label>
            
            <input
              v-if="field.type === 'text' || field.type === 'email'"
              v-model="formData[field.name]"
              :id="field.name"
              :type="field.type"
              class="form-input"
              :placeholder="field.placeholder || ''"
            />
            
            <textarea
              v-else-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              :id="field.name"
              class="form-textarea"
              :placeholder="field.placeholder || ''"
            ></textarea>
            
            <select
              v-else-if="field.type === 'select'"
              v-model="formData[field.name]"
              :id="field.name"
              class="form-select"
            >
              <option value="" disabled selected>Выберите значение</option>
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
  
            <div v-else-if="field.type === 'checkbox'" class="form-checkbox-group">
              <input
                type="checkbox"
                v-model="formData[field.name]"
                :id="field.name"
                class="form-checkbox"
              />
              <label :for="field.name" class="form-checkbox-label">{{ field.label || field.name }}</label>
            </div>
          </div>
  
          <div class="form-footer">
            <button type="submit" class="btn btn-submit">Отправить</button>
          </div>
        </form>
  
        <div v-if="responseMessage" class="response-message" :class="{ error: isError }">
          {{ responseMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const formFields = ref([])
  const formData = ref({})
  const responseMessage = ref('')
  const isError = ref(false)
  
  const fetchForm = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/form/3/')
      const fields = response.data.schema.fields
      formFields.value = fields
      formData.value = fields.reduce((acc, field) => {
        acc[field.name] = field.type === 'checkbox' ? false : ''
        return acc
      }, {})
    } catch (error) {
      console.error('Ошибка при загрузке формы:', error)
      responseMessage.value = 'Ошибка при загрузке формы'
      isError.value = true
    }
  }
  
  const submitForm = async () => {
    try {
      await axios.post('http://localhost:8000/api/dynamicforms/', formData.value)
      responseMessage.value = 'Данные успешно отправлены!'
      isError.value = false
    } catch (error) {
      responseMessage.value = 'Ошибка при отправке данных.'
      isError.value = true
    }
  }
  
  onMounted(() => {
    fetchForm()
  })
  </script>
  
  <style scoped>
  .form-container {
    min-height: 100vh;
    background-color: #2196f3;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M10 0l2.5 5 5-2.5-2.5 5 5 2.5-5 2.5 2.5 5-5-2.5-2.5 5-2.5-5-5 2.5 2.5-5-5-2.5 5-2.5-2.5-5 5 2.5z'/%3E%3C/svg%3E");
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  
  .form-wrapper {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    padding: 2rem;
  }
  
  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .logo-image {
    width: 40px;
    height: 40px;
  }
  
  .dynamic-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }
  
  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .form-footer {
    margin-top: 1.5rem;
  }
  
  .btn-submit {
    width: 100%;
    background-color: #2196f3;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-submit:hover {
    background-color: #1e88e5;
  }
  
  .response-message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    text-align: center;
    background-color: #4caf50;
    color: white;
  }
  
  .response-message.error {
    background-color: #ef4444;
  }
  
  .form-checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-checkbox {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.25rem;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .form-checkbox:checked {
    background-color: #2196f3;
    border-color: #2196f3;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23ffffff'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd' /%3E%3C/svg%3E");
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .form-checkbox-label {
    font-size: 0.875rem;
    color: #374151;
    cursor: pointer;
  }
  
  @media (max-width: 640px) {
    .form-wrapper {
      padding: 1rem;
    }
  
    .btn-submit {
      width: 100%;
    }
  }
  </style>