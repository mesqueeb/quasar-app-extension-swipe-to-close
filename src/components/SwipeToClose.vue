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
    <div class="swipe-line"></div>
    <slot />
  </div>
</template>

<style lang="stylus">
.swipe-line
  width: 50%;
  height: 12px!important;
  background: #888;
  margin: 12px auto;
  border-radius: 6px;
  opacity: .75;
  cursor: grabbing
.ext-swipe-to-close {
  transition: all 300ms;
  position: relative;
  box-shadow: none!important

  > div:not(.ext-swipe-to-close__swipe-disable-line) {
    height: inherit;
    min-height: fit-content;
  }

  &.--swiping {
    transition: all 0ms;
  }

  &__swipe-disable-line {
    width: 100%;
    position: absolute;
    height: 2px;
    background: black;
    top: -15px;
  }
}

.q-dialog__inner--maximized {
  .ext-swipe-to-close {
    &__swipe-disable-line {
      top: 1px !important;
    }
  }
}
</style>

<script>
import { isElementInViewport } from '../helpers/domHelpers'
import { TouchPan } from 'quasar'

export default {
  props: {
    value: Boolean,
    direction: String, // not yet supported,
    close: false
  },
  data () {
    return {
      swiping: false,
      translateY: 0,
      position: 'open',
      bottom: 0
    }
  },
   computed:
  {
    style () {
      return { transform: `translateY(${this.translateY}px)` }
    },
  },
  directives: {
    TouchPan
  },
  methods:
  {
    handlePan (details) {
      // if the modal is longer than the screen & content is scrolled, disable swipe to close
      const topVisible = isElementInViewport(document.getElementById('js-swipe-disable-line'))
      if(!topVisible) return
      this.bottom = this.$el.clientHeight - 36
      details.evt.preventDefault()
      details.evt.stopPropagation()
      // enable `swiping` to disable transitions while touching the element
      if (details.isFirst) this.swiping = true
      this.translateY = details.offset.y < 0 && this.translateY >0 ? (this.$el.clientHeight+details.offset.y) : details.offset.y
      this.translateY = this.translateY < 0 ? 0 : this.translateY
      this.translateY = this.translateY > this.bottom ? this.bottom : this.translateY
      if (details.isFinal) {
        // disable `swiping` to enable transitions
        this.swiping = false
        const relativeSwipeDistance = this.translateY / this.$el.clientHeight
        // if swiped < 25% distance reset the modal
        if (relativeSwipeDistance > 0.75) {
          this.translateY = this.bottom
          return
        } else if (relativeSwipeDistance < 0.25) {
            this.translateY = 0
            return
        }
        // bring the modal all the way down
        // this.translateY = this.$q.screen.height-1000
        // setTimeout(_ => this.$emit('input', false), 100)
        // reset modal p  o s  i t  i   o n after transition
        if (details.direction === 'up') {
          this.translateY = 0
          this.position = 'open'
        } else {
          if(this.close) {
            this.translateY = this.bottom, 300
            setTimeout(_ => this.translateY = 0, 300)
            setTimeout(_ => this.$emit('input', false), 100)
          } else {
            this.translateY = this.bottom, 300
          }
          this.position = 'closed'
        }
      }
    },
  }  
}
</script>