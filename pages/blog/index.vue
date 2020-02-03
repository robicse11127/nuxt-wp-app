<template>
	<div>
		<h2>Posts</h2>
		<div v-for="post in posts" :key="post.id">
			<nuxt-link :to="'/blog/'+post.slug">{{ post.title.rendered }}</nuxt-link>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import config from '../../nuxt.config';
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
				axios.get( `${config.api_url}/wp/v2/posts`, {
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

<style lang="scss" scoped>

</style>