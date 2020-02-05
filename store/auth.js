export const state = () => ({
    token: '',
    isLoggedIn: false
})

export const mutations = {

    // Update Token
    updateToken(state, token) {
        state.token = token;
        if(state.token != '') {
            state.isLoggedIn = true
        }
    },

    // Reset Token
    resetToken(state) {
        state.token = '';
        state.isLoggedIn = false;
    }
}