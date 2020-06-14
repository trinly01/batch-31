<style scoped>
</style>

<template>
  <div class="row items-center q-gutter-sm">
    <q-btn @click="decrease" size="xs" round icon="keyboard_arrow_left" />
    <div> {{ quantity }} </div>
    <q-btn @click="increase" size="xs" round icon="keyboard_arrow_right" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  mounted () {
    this.quantity = this.value
  },
  data () {
    return {
      quantity: 1
    }
  },
  methods: {
    increase () {
      this.quantity += 1
      this.$emit('input', this.quantity)
    },
    decrease () {
      if (this.quantity > 1) this.quantity -= 1
      this.$emit('input', this.quantity)
    }
  }
}
</script>
