<template>
  <div>
    <q-toolbar class="bg-orange text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>
      <q-toolbar-title>Ordering App</q-toolbar-title>
      <q-btn @click="showCart = !showCart" flat round dense icon="shopping_cart" >
        <q-badge v-show="cartQty" color="red" floating>
          {{ cartQty }}
        </q-badge>
        <q-dialog v-model="showCart" position="bottom">
          <cart v-model="cart" />
        </q-dialog>
      </q-btn>
      <q-btn v-if="user" @click="$dbCon.logout()" >
        {{ user.name }} | Logout
      </q-btn>
      <q-btn v-else @click="login"  >
        Login
      </q-btn>
    </q-toolbar>
    <div style="height: calc(100vh - 50px); overflow: auto;">
      <div class="row q-gutter-sm q-pa-md justify-center">
        <q-card v-for="(item, i) in items" :key="item._id" class="col-xs-12 col-sm-4">
          <q-img style="height: 128px;" :src="`https://picsum.photos/id/${i}/300/200`">
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
            <q-btn @click="addToCart(item)" color="orange" no-caps >Add to Cart</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div style="position: absolute; bottom: 80px; right: 72px; position: fixed;">
        <q-btn @click="addItem" style="position: fixed;" fab icon="add" color="accent" />
      </div>
    </div>
  </div>
</template>

<script>

// const Store = {
//   name: '',
//   users: [
//     {
//       displayName: '',
//       email: '',
//       password: ''
//     }
//   ]
// }

import qty from 'components/qty.vue'
import cart from 'pages/cart.vue'

import { cloneDeep, sumBy } from 'lodash'

export default {
  components: { qty, cart },
  mounted () {
    this.itemsService = this.$dbCon.wingsService('items')
    this.itemsService.on('dataChange', (messages) => {
      console.log('items', messages)
      this.items = messages
    })
    this.itemsService.init()

    this.$dbCon.on('login', (authResult, params, context) => {
      console.log(authResult)
      this.user = authResult.user
      this.itemsService.reset()
    })
    this.$dbCon.on('logout', (authResult, params, context) => {
      console.log(authResult)
      this.user = false
      this.itemsService.reset()
    })
    this.$dbCon.authenticate()
  },
  data () {
    return {
      user: false,
      showCart: false,
      cart: [],
      items: [
        {
          _id: 1,
          name: 'Hotdog',
          qty: 1,
          stocks: 10,
          price: 20.00,
          rating: 3
        },
        {
          _id: 2,
          name: 'Burger',
          qty: 1,
          stocks: 10,
          price: 25.00,
          rating: 5
        },
        {
          _id: 3,
          name: 'Pancit Palabok',
          qty: 1,
          stocks: 10,
          price: 15.00,
          rating: 1
        }
      ]
    }
  },
  computed: {
    cartQty () {
      return sumBy(this.cart, 'qty')
    }
  },
  methods: {
    async login () {
      await this.$dbCon.authenticate({
        email: 'admin@admin',
        password: 'admin',
        strategy: 'local'
      })
    },
    addItem () {
      this.itemsService.create({
        name: 'Burger',
        qty: 1 + 1,
        stocks: 15,
        price: 20,
        rating: 5
      })
    },
    pesoCurrencyFormat (price) {
      return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price)
    },
    addToCart (obj) {
      const itemInCart = this.cart.find(function (item) {
        return item._id === obj._id
      })

      console.log(itemInCart)

      if (itemInCart) { // if already exists
        console.log(itemInCart.qty, obj.qty)
        itemInCart.qty = itemInCart.qty + obj.qty
      } else {
        this.cart.push(cloneDeep(obj))
      }

      console.log(this.cart)
    }
  }
}
</script>
