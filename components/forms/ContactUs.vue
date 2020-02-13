<template>
    <div>
        <b-row>
            <b-col md="5">
                <h2>Contact With Us</h2>
                <div class="error" v-if="errors.length">
                    <li v-for="error in errors" :key="error.index">
                        {{error}}
                    </li>
                </div>
                <div class="form-group">
                    <label for="name">Name*</label>
                    <input v-model="form.name" type="text" class="form-control" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="name">Subject*</label>
                    <input v-model="form.subject" type="text" class="form-control" placeholder="Enter subject">
                </div>
                <div class="form-group">
                    <label for="email">Email*</label>
                    <input v-model="form.email" type="email" class="form-control" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="message">Message*</label>
                    <textarea v-model="form.message" class="form-control" rows="5" placeholder="Enter message"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" @click.prevent="submitForm" class="btn btn-primary">Send email</button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../../nuxt.config';
    export default {
        name: 'contact-us',
        data() {
            return {
                url: `${config.api_url}/wp/v2/contact-forms`,
                form: {
                    name: '',
                    subject: '',
                    email: '',
                    message: ''
                },
                errors: []
            }
        },
        methods: {
            submitForm() {
                axios.post( this.url, this.form)
                .then( (res) => {
                    console.log(res);
                    this.errors = []
                })
                .catch( (err) => {
                    this.errors = err.response.data.message
                })
            }
        }
    }
</script>

<style>

</style>