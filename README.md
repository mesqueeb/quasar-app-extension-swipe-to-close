
# Quasar extension: Swipe to close

> quasar-app-extension-swipe-to-close

A Quasar Framework app extension that allows you to close dialogs by swiping.

### Usage

You just have to wrap your q-dialog contents inside a `q-swipe-to-close` component with the same v-model as the q-dialog.

```html
<template>
  <q-btn @click="showDialog = true">Show dialog</q-btn>
  <!-- add position bottom -->
  <q-dialog v-model="dialogBool" position="bottom">
    <!-- add same v-model -->
    <q-swipe-to-close v-model="dialogBool">
      <div class="dialog-contents">I'm a swipable dialog!</div>
    </q-swipe-to-close>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return { showDialog: false }
  }
}
</script>
```

> Please note currently it only supports `position="bottom"`. If there's interest for other dialog positions and swipe directions, let me know in an issue!
