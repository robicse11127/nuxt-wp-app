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
    export default {
        name: 'CategoryPosts',
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
                return this.$store.state.termPosts.posts;
            },
            loadMore() {
				return this.$store.state.termPosts.loadmore;
			},
        },
        methods: {
            fetchPosts() {
				this.$store.dispatch('termPosts/fetchPosts', this.$route.params.id)
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

<style lang="scss" scoped>

</style>