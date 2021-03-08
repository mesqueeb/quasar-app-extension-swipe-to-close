# Quasar extension: Swipe to close ⛸

> ARCHIVED:
> When I need similar functionality again in the future I will
> recreate a new project that is framework agnostic.

A Quasar extension that allows you to close dialogs by swiping.

### My extensions

- [swipe-to-close](https://github.com/mesqueeb/quasar-app-extension-swipe-to-close)  ⛸
- [draggable](https://github.com/mesqueeb/quasar-app-extension-draggable) 🚡

### Installation

```
quasar ext add swipe-to-close
```

### Demo

- [live demo](https://quasar-app-extension-swipe-to-close.netlify.com/)
- [demo github repository](https://github.com/mesqueeb/quasar-app-extension-swipe-to-close-demo)

**GIF** (might take a while to load...)

![gif](https://github.com/mesqueeb/quasar-app-extension-swipe-to-close/blob/media/swipe-to-scroll.gif)

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

> Please note currently it only supports `position="bottom"` or no position.

If there's interest for other dialog positions and swipe directions, **let me know in an issue!**
