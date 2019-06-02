<template lang="pug">
  v-menu(:close-on-content-click='false', offset-y)
    template(v-slot:activator='{ on }')
      v-btn(color='primary' dark text flast v-on='on')
        | User
    v-list
      v-list-item(href='api/auth/logout')
        v-list-item-title
          | Log out

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>

</style>
