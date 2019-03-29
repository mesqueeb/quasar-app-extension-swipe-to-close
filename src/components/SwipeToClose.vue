<template>
<div
  :class="['ext-swipe-to-close', {'--swiping': swiping}]"
  :style="style"
  v-touch-pan.vertical.mouse.mightPrevent.mouseMightPrevent="handlePan"
>
  <div class="__swipe-disable-line" id="js-swipe-disable-line"></div>
  <slot />
</div>
</template>

<style lang="stylus" scoped>

.ext-swipe-to-close
  transition all 300ms
  &.--swiping
    transition all 0ms
  .__swipe-disable-line
    width 100%
    height 1px
    background transparent
    margin-top -1px

</style>

<script>
import { isElementInViewport } from '../helpers/domHelpers'

export default {
  props: {
    value: Boolean,
    direction: String, // not yet supported
  },
  data () {
    return {
      swiping: false,
      translateY: 0
    }
  },
  computed:
  {
    style () {
      return {transform: `translateY(${this.translateY}px)`}
    },
  },
  methods:
  {
    handlePan (details) {
      const topVisible = isElementInViewport(document.getElementById('js-swipe-disable-line'))
      if (details.direction === 'up' || !topVisible) return
      details.evt.preventDefault()
      details.evt.stopPropagation()
      if (details.isFirst) this.swiping = true
      this.translateY = details.offset.y
      if (details.isFinal) {
        if (this.translateY > 180) this.$emit('input', false)
        this.swiping = false
        this.translateY = 0
      }
    },
  }
}
</script>
