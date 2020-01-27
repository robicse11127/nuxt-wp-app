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
						<h2 class="entry__title"> <nuxt-link :to="'/'+post.slug"> {{post.title.rendered}} </nuxt-link></h2>
						<p v-html="post.excerpt.rendered.split(/\s+/).slice(0,15).join(' ')">...</p>
					</div>
					<div class="more-wrap"> <nuxt-link :to="'/'+post.slug">Read More</nuxt-link></div>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'Home',
		data: function() {
			return {
				posts: []
			}
		},
		mounted: function() {
			this.fetchPosts();
		},
		methods: {
			fetchPosts: function() {
				axios.get( 'http://localhost/wp-react/wp-json/wp/v2/posts', {
					params: {
						per_page: 10,
						page: 1
					}
				})
				.then( (res) => {
					this.posts = res.data
				})
				.catch( (e) => {

				})
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