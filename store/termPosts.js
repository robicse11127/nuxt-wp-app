import axios from 'axios';
import config from '../nuxt.config'

export const state = () => ({
    posts: [],
    totalPosts: '',
    totalPages: '',
    loadmore: false,
    loadmoreText: 'Load More',
    termID: '',
    page: 1,
    perPage: 6
})

// Actions
export const actions = {
    fetchPosts({commit, state}, id) {
        commit('resetState', id)
        // Send Server Request
        axios.get(`${config.api_url}/wp/v2/posts`, {
            params: {
                categories: id,
                per_page: state.perPage,
                page: state.page
            }
        })
        .then( (res) => {
            let posts = res.data;
            commit('setPosts', {posts, id})
            commit('setHeaders', res.headers)
            commit('loadmore')
        })
    },
    fetchMorePosts({commit, state}, id) {
        // Increase Page Count BY One
        commit('increasePageCount')
        // Send Server Request
        axios.get(`${config.api_url}/wp/v2/posts`, {
            params: {
                categories: id,
                per_page: state.perPage,
                page: state.page
            }
        })
        .then( (res) => {
            let posts = res.data;
            commit('setPosts', {posts, id})
            commit('setHeaders', res.headers),
            commit('loadmore')
        })
    }
}

// Mutations
export const mutations = {

    setPosts(state, {posts, id}) {
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
    },

    resetState(state, id) {
        if( id != state.termID ) {
            state.posts = ''
            state.page = 1;
            state.termID = id;
        }else {
            state.termID = id
        }
    }

}