<template>
    <div>
        <article v-for="post in posts" :key="post.id">
            <div class="post_entry">
                <div class="post_entry-header">
                    <h2 class="title">{{post.title.rendered}}</h2>
                </div>
                <div class="post_feature-image">
                    <img :src="post.featured_image_src.full" :alt="post.slug">
                </div>
                <div class="post_entry-content">
                    <p v-html="post.content.rendered"></p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import config from '../../nuxt.config';
    import axios from 'axios';
    
    export default {
        name: 'Post',
        head() {
            return {
                title: this.title,
				link: [
					{ href: '/wp-block/block.css', rel: 'stylesheet' }
				]
			}
        },
        data() {
            return {
                title: '',
                posts: ''
            }
        },
        mounted() {
            this.fetchSinglePost()
            this.fixTitle();
        },
        methods: {
            fetchSinglePost() {
                axios.get( `${config.api_url}/wp/v2/posts`, {
                    params: {
                        slug: this.$route.params.slug
                    }
                })
                .then( (res) => {
                    this.posts = res.data
                    this.title = res.data.title.rendered
                })
            },
            fixTitle() {
                var str = this.$route.params.slug;
                this.title = str.replace(/-/g, ' ').toUpperCase();
            }
        }
    }
</script>

<style scoped>
.post_entry {
    padding: 60px 50px;
    background: #fff;
    margin: 50px 0px;
    box-shadow: 0 2px 5px rgba(0,0,0,.05);
}
.post_entry-header .title {
    font-size: 40px;
    margin-bottom: 30px;
    color: #0d121c;
}
.post_entry-content {
    font-size: 20px;
    font-weight: 400;
    color: #596a89;
}
</style>