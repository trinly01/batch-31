// import something here
import wings from 'wings4'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }/* { app, router, Vue ... } */) => {
  // something to do
  Vue.prototype.$dbCon = wings('http://localhost:3030')
  Vue.use(Chartkick.use(Chart))
}
