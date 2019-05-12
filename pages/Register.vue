<template>
  <div>
    Register
    <v-text-field v-model="form.username" label="username"/>
    <v-text-field v-model="form.password" label="Password"/>
    <v-text-field v-model="form.repeat" label="Repeat password"/>
    <v-btn :disabled="valid !== true" @click="register" >
      Register
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    form: {
      username: '',
      password: '',
      repeat: ''
    }
  }),
  computed: {
    valid() {
      if (this.form.username.length < 3) {
        return 'Username must be 3 chars length'
      }
      if (this.form.password.length < 5) {
        return 'password must be 5 chars length'
      }
      if (this.form.password !== this.form.repeat) {
        return 'Passwords doesn\'t match'
      }
      return true
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', this.form)
    }
  }
}
</script>

<style scoped>

</style>
