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
						<div class="entry__terms">
							<span class="entry__term" v-for="term in post.post_terms" :key="term.id">
								<nuxt-link :to="'/category/'+term.id">{{term.name}}</nuxt-link>
							</span>
						</div>
						<h2 class="entry__title"> <nuxt-link :to="'/'+post.slug"> {{wordLimiter(post.title.rendered, 8)}} </nuxt-link></h2>
						
						<p v-html="wordLimiter(post.excerpt.rendered, 10)">...</p>
					</div>
					<div class="more-wrap"> <nuxt-link :to="'/'+post.slug">Read More</nuxt-link></div>
					<div class="entry__meta">
						<span class="entry__author"><strong>By: </strong>{{post.author_details.user_nicename}}</span>
						<span class="entry__on"><strong>On: </strong>{{post.published_on}}</span>
					</div>
				</div>
			</b-col>
		</b-row>
		<b-row>
			<b-col md="12" class="text-center" v-if="loadMore">
				<b-button variants="info" class="btn-loadmore" @click="fetchMorePosts">{{loadmoreText}}</b-button>
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
				loadmoreText: 'Load More',
			}
		},
		mounted() {
			this.fetchPosts();
		},
		computed: {
			posts() {
				return this.$store.state.posts.posts;
			},

			loadMore() {
				return this.$store.state.posts.loadmore;
			},
		},
		methods: {
			fetchPosts() {
				this.$store.dispatch('posts/fetchPosts')
			},
			fetchMorePosts() {
				this.loadmoreText = 'Loading...';
				this.$store.dispatch('posts/fetchMorePosts')
				.then( () => {
					this.loadmoreText = 'Load More';
				})
			},
			wordLimiter(sentence, limit) {
				return sentence.split(/\s+/).slice(0,limit).join(' ')
			},
			
		}
	}
</script>

<style>
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
	transition: all 0.3s ease-in-out;
	overflow: hidden;
}
.entry__text {
	position: relative;
    margin-top: 2rem;
    padding: 0 30px;
	height: 220px;
	color: #596a89;
	font-size: 18px;
	z-index: 0;
}
.entry__title {
	font-size: 22px;
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
    letter-spacing: .1rem;
    
}
.entry .more-wrap a {
	display: inline-block;
	color: #fff;
	background: #35495e;
	text-decoration: none;
	padding: 12px 25px;
	transition: all 0.3s ease-in-out;
	border-radius: 0 30px 30px 0;
}
.entry .more-wrap a:hover {
	background-color: #42b883;
}
.btn-loadmore {
	background: #35495e;
	padding: 12px 25px;
	border-radius: 0px;
	font-size: 14px;
	color: #fff;
	transition: all 0.3s ease-in-out;
	border: 0px;
	box-shadow: 0 2px 5px rgba(0,0,0,.05);
	text-transform: uppercase;
	letter-spacing: .1rem;
	font-weight: 600;
}
.btn-loadmore:hover {
	background-color: #42b883;
}
.entry__terms {
	position: absolute;
	top: -50px;
	right: 5px;
	width: auto;
	border-radius: 30px;
	background-color: #35495e;
	color: #fff;
	z-index: 100;
	box-shadow: 0 2px 5px rgba(0,0,0,.05);
	padding: 8px 15px;
	font-size: 13px;
	font-weight: 600;
}
.entry__terms span {
	margin: 0px 3px;
}
.entry__terms span a {
	color: #fff;
}
.entry__meta {
	padding: 12px 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f9f9f9;
}
</style>