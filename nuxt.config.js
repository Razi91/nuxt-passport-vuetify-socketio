const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')

let isDev = false

const conf = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  css: [
    'vuetify/dist/vuetify.min.css',
    '~/assets/style/style.scss'
  ],
  router: {
    middleware: ['ssr-cookie']
  },

  plugins: [
    // '@/plugins/vuetify',
    '@/plugins/socket'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  devModules: [
    '@nuxtjs/vuetify'
  ],
  axios: {
    browserBaseURL: '/'
  },

  vuetify: {
    theme: {
      dark: true
    }
  },

  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {},
    extend (config, ctx) {
      isDev = ctx.isDev
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    WS_URL: process.env.DEVTYPE === 'frontend' ? 'http://localhost:3001' : '/'
  },
  server: {
    port: process.env.DEVTYPE === 'backend' ? 3001 : 3000
  }
}

if (process.env.DEVTYPE === 'frontend') {
  console.log('Frontend dev')
  conf.modules.push('@nuxtjs/proxy')
  conf.proxy = {
    // '/api': {
    //   target: 'http://localhost:3001'
    // },
    '/socket': {
      target: 'http://localhost:3001'
    }
  }
  // conf.axios.proxy = true
  // conf.axios.proxyHeaders = false
  // conf.axios.credentials = false
}

module.exports = conf
