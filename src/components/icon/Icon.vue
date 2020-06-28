<template>
  <i class="haitao" :class="[`haitao${type}`, classs ? classs : '']" data-sensors-click @click="$emit('click')" :style="color ? `color:${color}` : ''"></i>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default () {
        return ''
      }
    },
    color: {
      type: String,
      default () {
        return ''
      }
    },
    classs: {
      type: String
    }
  }
}
</script>

