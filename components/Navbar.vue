<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-container>
                <b-navbar-brand>
                    <nuxt-link to="/" class="navbar-brand">Nuxt WP</nuxt-link>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item v-for="menu in menus" :key="menu.id">
                            <nuxt-link :to="'/page/'+menu.parent.slug" class="nav-link">{{menu.parent.title}}</nuxt-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto" v-if="!checkLoggedIn">
                        <b-nav-item v-for="signupMenu in signupMenus" :key="signupMenu.id">
                            <nuxt-link :to="'/admin/'+signupMenu.parent.slug" class="nav-link">{{signupMenu.parent.title}}</nuxt-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto" v-else>
                        <nuxt-link :to="'/admin/logout'" class="nav-link">Logout</nuxt-link>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../nuxt.config';
    export default {
        name: 'Navbar',
        data() {
            return {
                menus: [],
                signupMenus: [],
                isLoggedIn: false
            }
        },
        mounted() {
            this.fetchMenus();
        },
        computed: {
            checkLoggedIn() {
                return this.$store.state.auth.isLoggedIn
            }
        },
        methods: {
            fetchMenus() {
                axios.get( `${config.api_url}/wp/v2/menus` )
                .then( (res) => {
                    this.menus = res.data.primary
                    this.signupMenus = res.data.signup
                } )
            },
            
        }
    }
</script>

<style lang="scss" scoped>

</style>