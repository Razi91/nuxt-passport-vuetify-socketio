<template lang="pug">
  v-app(dark)
    v-navigation-drawer(v-model='drawer', :mini-variant='miniVariant', :clipped='clipped', fixed, app)
      v-list
        v-list-item(v-for='(item, i) in items', :key='i', :to='item.to', router, exact)
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text='item.title')
    v-app-bar(:clipped-left='clipped', fixed, app)
      v-app-bar-nav-icon(@click='drawer = !drawer')
      v-btn(icon='', @click.stop='miniVariant = !miniVariant')
        v-icon {{ `chevron_${miniVariant ? 'right' : 'left'}` }}
      v-btn(icon='', @click.stop='clipped = !clipped')
        v-icon web
      v-btn(icon='', @click.stop='fixed = !fixed')
        v-icon remove
      v-toolbar-title(v-text='title')
      v-spacer
      Login(v-if='user == null')
      UserMenu(v-else)
      v-btn(icon='', @click.stop='rightDrawer = !rightDrawer')
        v-icon menu
    v-content
      v-container
        nuxt
    v-navigation-drawer(v-model='rightDrawer', :right='right', temporary='', fixed='')
      v-list
        v-list-item(@click.native='right = !right')
          v-list-item-action
            v-icon(light='')
              | compare_arrows
          v-list-item-title Switch drawer (click me)
    v-footer(:fixed='fixed', app='')
      span © 2019

</template>

<script>
import { mapGetters } from 'vuex'
import Login from '../components/Login'
import UserMenu from '../components/UserMenu'

export default {
  components: { Login, UserMenu },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
