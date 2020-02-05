<template>
    <div>
        
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
                this.$store.commit('auth/resetToken');
                // Redirect to Home If Logged Out
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>