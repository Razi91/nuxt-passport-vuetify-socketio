import axios from '@nuxtjs/axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.user) {
      commit('SET_USER', req.user)
    }
  },
  async login({ commit }, { username, password }) {
    if (!username || !password) throw new Error('Username and password are required')
    try {
      const { data } = await this.$axios.post('/api/auth/login', { username, password })
      console.log(data)
      commit('SET_USER', data)
    } catch (error) {
      console.error(error)
      throw new Error('Wrong username or password')
    }
  },
  async register({ commit }, { username, password, email }) {
    if (!username || !password) throw new Error('Email and password are required')
    try {
      const { data } = await this.$axios.post('/api/auth/register', { username, password, email })
      commit('SET_USER', data)
    } catch (error) {
      console.log(axios, error)
      switch (error.response.status || 500) {
        case 409:
          throw new Error('Such email is already registered')
        case 500:
          throw new Error('Internal server error')
      }
    }
  },
  async logout({ commit }) {
    const { data } = await this.$axios.post('/api/auth/logout')
    if (data.ok) commit('SET_USER', null)
  },
  async changePassword({ commit }, { currentPassword, newPassword }) {
    if (!currentPassword || !newPassword) throw new Error('All fields are required')
    try {
      await axios.patch('/api/auth', { currentPassword, newPassword })
      commit('SET_USER', null)
    } catch (error) {
      throw new Error('Wrong password')
    }
  }
}

export const getters = {
  user(state) {
    return state.authUser
  }
}
