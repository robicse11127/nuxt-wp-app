import axios from 'axios';
import config from '../nuxt.config'

export const state = () => ({
    posts: [],
    totalPosts: '',
    totalPages: '',
    loadmore: false,
    loadmoreText: 'Load More',
    page: 1,
    perPage: 6
})

// Actions
export const actions = {
    fetchPosts({commit, state}) {
        // Send Server Request
        axios.get(`${config.api_url}/wp/v2/posts`, {
            params: {
                per_page: state.perPage,
                page: state.page
            }
        })
        .then( (res) => {
            commit('setPosts', res.data)
            commit('setHeaders', res.headers)
            commit('loadmore')
        })
    },
    fetchMorePosts({commit, state}) {
        // Increase Page Count BY One
        commit('increasePageCount')
        // Send Server Request
        axios.get(`${config.api_url}/wp/v2/posts`, {
            params: {
                per_page: state.perPage,
                page: state.page
            }
        })
        .then( (res) => {
            commit('setPosts', res.data)
            commit('setHeaders', res.headers),
            commit('loadmore')
        })
    }
}

// Mutations
export const mutations = {
    setPosts(state, posts) {
        state.posts = '';
        if( state.posts == '' ) {
            state.posts = posts
        }else {
            posts.map((item, index) => {
                state.posts = [...state.posts, item];
            }) 
        }
    },

    setHeaders(state, headers) {
        state.totalPosts = headers['x-wp-total']
        state.totalPages = headers['x-wp-totalpages']
    },

    increasePageCount(state) {
        state.page += 1;
    },

    loadmore(state) {
        if(state.page >= state.totalPages) {
            state.loadmore = false
        }else {
            state.loadmore = true
        }
    }

}