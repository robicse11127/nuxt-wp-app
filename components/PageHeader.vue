<template>
    <div>
        <div class="app-page-header" :style="pageHeaderImage">
            <div class="page-header-content">
                <h1 class="title">Nuxt WP Application</h1>
                <p class="text">An application build with Nuxt JS + WP Rest API</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'PageHeader',
        data() {
            return {
                pageHeaderImage: { backgroundImage: 'url(./images/page-header.jpg)' }
            }
        }
    }
</script>

<style scoped>
    .app-page-header {
        width: 100%;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
    }
    .app-page-header::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: -1;
    }
    .page-header-content {
        text-align: center;
        color: #fff;
    }
    .page-header-content .title {
        font-size: 60px;
    }
</style>