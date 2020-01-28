<template>
    <div>
        <article v-for="page in pages" :key="page.id">
            <div class="page__entry" v-html="page.content.rendered">
                
            </div>
        </article>
    </div>
</template>

<script>
    import axios from 'axios';
    import GridPicker from '../../../components/builder/GridPicker';
    import Draggable from 'vuedraggable';
    export default {
        components: {
            Draggable
        },
        name: 'Page',
        data() {
            return {
                pages: [],
                dragging: false,
                grids: []
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
                })
                .catch( (e) => {

                })
            }
        }
    }
</script>

<style>
.page__entry {
    margin: 50px;
    word-wrap: break-word;
}
.builder__grid {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba( 255,255,255,0.3 );
    width: 100%;
    min-height: 100px;
    margin: 15px 0px;
}
</style>