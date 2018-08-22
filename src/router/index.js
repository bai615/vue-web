import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/Index'
import DetailPage from '@/pages/Detail'
import DetailAnaPage from '@/pages/details/Analysis'
import DetailCouPage from '@/pages/details/Count'
import DetailForPage from '@/pages/details/Forecast'
import DetailPubPage from '@/pages/details/Publish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage,
	  redirect: '/detail/analysis',
      children: [
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
    }
  ]
})
