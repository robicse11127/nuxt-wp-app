<template>
	<div class="page-content">
		<b-row>
			<b-col class="col-md-4" v-for="post in posts" :key="post.id">
				<div class="entry">
					<nuxt-link :to="'/'+post.slug" class="entry__thumb-link">
						<div class="entry__thumb" :style="{backgroundImage:'url('+post.featured_image_src.full+')'}"> 
						</div>
					</nuxt-link>
					<div class="entry__text">
						<h2 class="entry__title"> <nuxt-link :to="'/'+post.slug"> {{wordLimiter(post.title.rendered, 10)}} </nuxt-link></h2>
						<p v-html="wordLimiter(post.excerpt.rendered, 10)">...</p>
					</div>
					<div class="more-wrap"> <nuxt-link :to="'/'+post.slug">Read More</nuxt-link></div>
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-col md="12" class="text-center" v-if="loadMore">
				<b-button variants="info" @click="fetchMorePosts">Load More</b-button>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import axios from 'axios';
	import config from '../nuxt.config';

	export default {
		name: 'Home',
		head() {},
		data() {
			return {
				// posts: [],
				totalPosts: '',
				totalPages: '',
				page: 1,
				perPage: 3,
				loadMore: false
			}
		},
		mounted() {
			this.fetchPosts();
			this.showLoadMore();
		},
		computed: {
			posts() {
				return this.$store.state.posts.posts;
			}
		},
		methods: {
			fetchPosts() {
				this.$store.dispatch('posts/fetchPosts', {
					per_page: this.perPage,
					page: this.page
				})
				// axios.get( `${config.api_url}/wp/v2/posts`, {
				// 	params: {
				// 		per_page: this.perPage,
				// 		page: this.page
				// 	}
				// })
				// .then( (res) => {
				// 	if( '' == this.posts ) {
				// 		this.posts = res.data
				// 	}else {
				// 		res.data.map( (item, index) => {
				// 			this.posts = [...this.posts, item]
				// 		} )
				// 	}
				// 	this.totalPosts = res.headers['x-wp-total']
				// 	this.totalPages = res.headers['x-wp-totalpages']
				// })
				// .catch( (e) => {

				// })
			},
			fetchMorePosts() {
				this.page += 1
				this.fetchPosts();
				this.showLoadMore();
			},
			showLoadMore() {
				if( this.page > this.totalPages  ) {
					this.loadMore = true;
				}else {
					this.loadMore = false;
				}
			},
			wordLimiter(sentence, limit) {
				return sentence.split(/\s+/).slice(0,limit).join(' ')
			}
		}
	}
</script>

<style scoped>
.entry-wraped {
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
	margin: 50px 0px;
}
.entry {
    margin-bottom: 30px;
    box-shadow: 0 2px 5px rgba(0,0,0,.05);
    position: relative;
	
    background-color: #fff;
}
.entry__thumb {
    background-color: #efefef;
    overflow: hidden;
    text-align: center;
    position: relative;
	width: 100%;
	height: 200px;
	display: block;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
.entry__text {
    margin-top: 2rem;
    padding: 0 30px;
	height: 300px;
	color: #596a89;
	font-size: 18px;
}
.entry__title {
	font-size: 24px;
	line-height: 1.2;
	margin-bottom: 20px;
}
.entry__title a {
	color: #0d121c;
}
.entry__title a:hover {
	text-decoration: none;
}
.entry .more-wrap {
    width: 100%;
    font-family: "IBM Plex Sans",sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .25rem;
    padding: .8rem 2.8rem;
    color: #2364aa;
    position: absolute;
    left: 0;
    bottom: 2rem;
    right: auto;
    top: auto;
}
</style>