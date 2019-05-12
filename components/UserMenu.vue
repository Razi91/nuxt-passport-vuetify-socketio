<template>
  <v-menu :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        flat
        flast
        v-on="on"
      >
        User
      </v-btn>
    </template>
    <v-list>
      <v-list-tile href="api/auth/logout"  >
        <v-list-tile-title >
          Log out
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
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
