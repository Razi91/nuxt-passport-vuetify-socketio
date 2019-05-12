<template lang="pug">
  v-layout
    v-flex(text-xs-center='')
      img.mb-5(src='/v.png', alt='Vuetify.js')
      blockquote.blockquote
        | “First, solve the problem. Then, write the code.”
        footer
          small
            em —John Johnson
</template>
<script>
export default {
  fetch({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/')
    }
  }
}
</script>
