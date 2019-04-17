<template>
<div
  :class="['ext-swipe-to-close', {'--swiping': swiping}]"
  :style="style"
  v-touch-pan.vertical.mouse.mightPrevent.mouseMightPrevent="handlePan"
>
  <div
    class="ext-swipe-to-close__swipe-disable-line"
    id="js-swipe-disable-line"
  ></div>
  <slot />
</div>
</template>

<style lang="stylus">

.ext-swipe-to-close
  transition all 300ms
  position relative
  > div:not(.ext-swipe-to-close__swipe-disable-line)
    height inherit
    min-height fit-content
  &.--swiping
    transition all 0ms
  &__swipe-disable-line
    width 100%
    position absolute
    height 1px
    background transparent
    top -15px
.q-dialog__inner--maximized
  .ext-swipe-to-close
    &__swipe-disable-line
      top 1px !important

</style>

<script>
import { TouchPan } from 'quasar'
import { isElementInViewport } from '../helpers/domHelpers'

export default {
  directives: {
    TouchPan
  },
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
      // if the modal is longer than the screen & content is scrolled, disable swipe to close
      const topVisible = isElementInViewport(document.getElementById('js-swipe-disable-line'))
      if (details.direction === 'up' || !topVisible) return
      details.evt.preventDefault()
      details.evt.stopPropagation()
      // enable `swiping` to disable transitions while touching the element
      if (details.isFirst) this.swiping = true
      // translate the element
      this.translateY = details.offset.y
      if (details.isFinal) {
        // disable `swiping` to enable transitions
        this.swiping = false
        const relativeSwipeDistance = this.translateY / this.$el.clientHeight
        // if swiped < 25% distance reset the modal
        if (relativeSwipeDistance < 0.25) {
          this.translateY = 0
          return
        }
        // bring the modal all the way down
        this.translateY = this.$q.screen.height
        setTimeout(_ => this.$emit('input', false), 100)
        // reset modal position after transition
        setTimeout(_ => this.translateY = 0, 300)
      }
    },
  }
}
</script>
