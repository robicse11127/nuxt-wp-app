import axios from 'axios';
import config from '../nuxt.config'

export const state = () => ({
    posts: []
})

// Actions
export const actions = {
    fetchPosts({commit}, params) {
        axios.get(`${config.api_url}/wp/v2/posts`, {
            params: params
        })
        .then( (res) => {
            commit('setPosts', res.data)
        })
    }
}

// Mutations
export const mutations = {

    setPosts(state, posts) {
        state.posts = posts
    }

}