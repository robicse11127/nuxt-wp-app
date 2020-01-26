<template>
    <div>
        <div v-for="page in pages" :key="page.id">
            <section v-html="page.content.rendered"></section>
            
        </div>
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
                    // { href: 'http://localhost/wp-react/wp-includes/css/dist/block-library/style.min.css?ver=5.2.5' }
                ],
                script: [
                    
                ]
            }
        },
        methods: {
            fetchPage: function() {
                axios.get( 'http://localhost/wp-react/wp-json/wp/v2/pages', {
                    params: {
                        slug: this.$route.params.slug
                    }
                })
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