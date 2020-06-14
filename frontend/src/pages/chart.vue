<template>
  <div>
    {{ storeRating }}
    <pie-chart :donut="true" :data="storeRating"></pie-chart>
  </div>
</template>

<script>
export default {
  async mounted () {
    await this.$dbCon.authenticate()
    this.itemsService = this.$dbCon.wingsService('items')
    for (let index = 5; index > 0; index--) {
      const val = (await this.itemsService.find({
        query: {
          rating: index,
          $limit: 0
        }
      })).total
      this.storeRating.push([index + 'stars', val])
    }
  },
  data () {
    return {
      storeRating: []
    }
  }
}
</script>
