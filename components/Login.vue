<template lang="pug">
  v-menu(:close-on-content-click='false', offset-y='')
    template(v-slot:activator='{ on }')
      v-btn(color='primary', dark='', v-on='on')
        | Sign up
    v-list
      v-list-tile
        v-text-field(v-model='form.username', label='User name:')
      v-list-tile
        v-text-field(v-model='form.password', type='password', label='Password:')
      v-list-tile
        v-btn(@click='login')
          | Sign in
        v-btn(to='/register')
          | Register
        v-btn(href='/api/auth/google')
          | Google
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),
  methods: {
    login() {
      this.$store.dispatch('login', this.form)
    }
  }
}
</script>

<style scoped>

</style>
