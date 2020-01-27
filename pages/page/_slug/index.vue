<template>
    <div>
        
        
        <section class="builder__wrapper">
            <Draggable 
            :grid="grids"
            @start="dragging = true"
            @end="dragging = false"
            >
                <div v-for="grid in grids" :key="grid.id" v-html="grid.element"></div>
            </Draggable>
        </section>
        <section class="builder__grid-picker">
            <b-row>
                <b-col md="12">
                    <b-button variant="outline-info" @click="addGrid('one')">Add 1/1</b-button>
                    <b-button variant="outline-info" @click="addGrid('half')">Add 1/2</b-button>
                    <b-button variant="outline-info" @click="addGrid('one-third')">Add 1/3</b-button>
                    <b-button variant="outline-info" @click="addGrid('one-forth')">Add 1/4</b-button>
                    <b-button variant="outline-info" @click="addGrid('one-sixth')">Add 1/6</b-button>
                </b-col>
            </b-row>
        </section>
        <!-- <article v-for="page in pages" :key="page.id">
            <div class="page__entry" v-html="page.content.rendered">
                
            </div>
        </article> -->
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
                    console.log(res.data)
                })
                .catch( (e) => {

                })
            },
            addGrid(column) {
                if( 'one' == column ) {
                    this.grids.push({element: '<div class="row"><div class="col-md-12"><div class="builder__grid">Add Content</div></div></div>'})
                }else if( 'half' == column ) {
                    this.grids.push({element: '<div class="row"><div class="col-md-6"><div class="builder__grid">Add Content</div></div><div class="col-md-6"><div class="builder__grid">Add Content</div></div></div>'})
                }else if( 'one-third' == column ) {
                    this.grids.push({element: '<div class="row"><div class="col-md-4"><div class="builder__grid">Add Content</div></div><div class="col-md-4"><div class="builder__grid">Add Content</div></div><div class="col-md-4"><div class="builder__grid">Add Content</div></div></div>'})
                }else if( 'one-forth' == column ) {
                    this.grids.push({element: '<div class="row"><div class="col-md-3"><div class="builder__grid">Add Content</div></div><div class="col-md-3"><div class="builder__grid">Add Content</div></div><div class="col-md-3"><div class="builder__grid">Add Content</div></div><div class="col-md-3"><div class="builder__grid">Add Content</div></div></div>'})
                }else if( 'one-sixth' == column ) {
                    this.grids.push({element: '<div class="row"><div class="col-md-2"><div class="builder__grid">Add Content</div></div><div class="col-md-2"><div class="builder__grid">Add Content</div></div><div class="col-md-2"><div class="builder__grid">Add Content</div></div><div class="col-md-2"><div class="builder__grid">Add Content</div></div><div class="col-md-2"><div class="builder__grid">Add Content</div></div><div class="col-md-2"><div class="builder__grid">Add Content</div></div></div>'})
                }
            },
            addOneColumn() {}
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