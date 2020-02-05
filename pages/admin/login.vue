<template>
    <div>
        <b-row>
            <b-col class="text-center mt-5"><ScreenLogo /></b-col>
        </b-row>
        <b-row>
            <b-col md="6" offset-md="3" class="mt-5">
                <b-card header="Login" class="" header-tag="h2">
                    <b-form @submit="onSubmit">
                        <div class="form-group">
                            <label for=""><strong>Username:</strong> </label>
                            <input v-model="form.username" type="text" name="username" id="" class="form-control" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <label for=""><strong>Password:</strong> </label>
                            <input v-model="form.password" type="password" name="password" id="" class="form-control" placeholder="">
                        </div>
                        <div class="form-group">
                            <b-row>
                                <b-col md="12"><b-button block type="submit" variant="info">Login</b-button></b-col>
                                <b-col md="12" class="text-center mt-2">Don't have an account? Please <nuxt-link to="/admin/signup">Register</nuxt-link>.</b-col>
                            </b-row>
                        </div>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../nuxt.config';
    import ScreenLogo from '../../components/Logo'
    export default {
        name: 'Login',
        components: {
            ScreenLogo
        },
        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    password: '',
                    userNiceName: '',
                    userEmail: '',
                    isLoading: false,
                    isLogin: false,
                    error: '',
                    success: false
                }
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
                const loginData = {
                    username: this.form.username,
                    password: this.form.password
                }

                axios.post(`${config.api_url}/jwt-auth/v1/token`, loginData)
                .then( (res) => {
                    if( 'undefined' == res.data.token ) {
                        this.form.error = res.data.message;
                        this.form.isLoading = false
                    }else {
                        // Update auth.js store
                        this.$store.commit('auth/updateToken', res.data.token)

                        // Resetting Form Data
                        this.form.isLoggedIn = true;
                        this.form.userNiceName = res.data.user_nicename;
                        this.form.email = res.data.user_email
                        this.form.token = res.data.token

                        // Redirect to Home If Login in is successfull
                        this.$router.push('/')
                    }
                })
                .catch( (err) => {
                    this.form.error = err.response.data;   
                })
            },
            formReset() {
                this.form.username = '';
                this.form.email = '';
                this.form.password = '';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>