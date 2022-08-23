<template>
  <div>
    <svg-icon iconClass="fullscreen" className="fullscreen" @click="OnClick" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  methods: {
    OnClick() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  color: #fff;
  font-size: 20px;
}
</style>
