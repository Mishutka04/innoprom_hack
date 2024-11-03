<template>
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
</template>

<script setup>

</script>

<style scoped>

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


</style>