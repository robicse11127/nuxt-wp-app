<template>
    <div>
        <section v-html="pages"></section>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'page',
        data() {
            return {
                pages: []
            }
        },
        mounted() {
            this.fetchPage()
        },
        head() {
            return {
                title: 'About Me',
                link: [
                    { rel: "stylesheet", href: '/elementor/elementor-icons.min.css' },
                    { rel: "stylesheet", href: '/elementor/common.min.css' },
                    { rel: "stylesheet", href: '/elementor/animations.min.css' },
                    { rel: "stylesheet", href: '/elementor/frontend.min.css' },
                    { rel: "stylesheet", href: '/elementor/global.css' },
                    
                ]
            }
        },
        methods: {
            fetchPage: function() {
                axios.get( 'http://localhost/wp-react/wp-json/wp/v2/elementor/pages/content/33')
                .then( (res) => {
                    this.pages = res.data
                    console.log(res.data)
                })
                .catch( (e) => {

                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>