<template>
  <div class="bg-white" style="height: 700px;">
    <q-toolbar class="bg-orange text-white">
      <q-btn flat round dense icon="shopping_cart" class="q-mr-sm" />
      <q-toolbar-title>Cart</q-toolbar-title>
      <q-btn>
        Place Order
      </q-btn>
    </q-toolbar>
    <div style="height: calc(700px - 50px); overflow: auto;">
      <div class="row q-gutter-sm q-pa-md justify-center">
        <q-card v-for="item in items" :key="item._id" class="col-xs-12 col-sm-4">
          <q-img style="height: 128px;" src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">{{ item.name }}</div>
              <div class="text-subtitle2">
                {{ pesoCurrencyFormat(item.price) }}
                <q-rating
                  :value="item.rating"
                  size="1em"
                  icon="star"
                />
              </div>
            </div>
          </q-img>

          <q-card-actions class="q-gutter-sm">
            <qty v-model="item.qty" />
            <q-space></q-space>
            <q-btn @click="removeItem(item._id)" color="orange" no-caps >remove</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import qty from 'components/qty.vue'
import { findIndex } from 'lodash'

export default {
  props: ['value'],
  components: { qty },
  mounted () {
    this.items = this.value
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    pesoCurrencyFormat (price) {
      return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price)
    },
    removeItem (_id) {
      const ind = findIndex(this.items, ['_id', _id])
      this.items.splice(ind, 1)
    }
  }
}
</script>
