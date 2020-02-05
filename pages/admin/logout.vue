<template>
    <div>
        You are loggeed out.
    </div>
</template>

<script>
    export default {
        name: 'Logout',
        data() {
            return {

            }
        },
        mounted() {
            this.logout();
        },
        methods: {
            logout() {
                localStorage.removeItem('token', '');
                localStorage.removeItem('userNiceName', '');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>