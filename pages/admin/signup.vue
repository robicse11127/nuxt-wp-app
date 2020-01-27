<template>
    <div>
        <b-row>
            <b-col class="text-center mt-5"><ScreenLogo /></b-col>
        </b-row>
        <b-row>
            <b-col md="6" offset-md="3" class="mt-5">
                <b-card header="Signup" class="" header-tag="h2">
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
                            <label for=""><strong>Email:</strong> </label>
                            <input v-model="form.email" type="email" name="email" id="" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <b-row>
                                <b-col md="12"><b-button block type="submit" variant="info">Submit</b-button></b-col>
                                <b-col md="12" class="text-center mt-2">Already have an account? Please <nuxt-link to="/admin/login">Login</nuxt-link></b-col>
                            </b-row>
                        </div>
                        <div class="form-group text-center" v-if="form.success">
                            <strong class="text-success">{{form.success}}</strong>
                        </div>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import ScreenLogo from '../../components/Logo'
    export default {
        name: 'Signup',
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
                const registerData = {
                    username: this.form.username,
                    email: this.form.email,
                    password: this.form.password
                }

                axios.post( `http://localhost/wp-react/wp-json/wp/v2/users/register`, registerData, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then( (res) => {
                    if( 200 == res.data.code ) {
                        this.form.success = res.data.message;
                        // Loggedin Data
                        const loginData = {
                            username: this.form.username,
                            password: this.form.password
                        }
                        // Reset Form
                        this.formReset();
                        axios.post(`http://localhost/wp-react/wp-json/jwt-auth/v1/token`, loginData)
                        .then( (res) => {
                            if( 'undefined' == res.data.token ) {
                                this.form.error = res.data.message;
                                this.form.isLoading = false
                            }else {
                                localStorage.setItem( 'token', res.data.token );
                                localStorage.setItem( 'userNiceName', res.data.user_nicename );
                                // Resetting Form Data
                                this.form.isLoggedIn = true;
                                this.form.userNiceName = res.data.user_nicename;
                                this.form.email = res.data.user_email
                                this.form.token = res.data.token
                            }
                        })
                        .catch( (err) => {
                            this.form.error = err.response.data;   
                        })
                    }
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