import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const createRouter = () => new Router({
  routes: []
})

const router = createRouter()

export const addContentRouter = () => {
  // TODO: 根据用户判断增加路由信息
  router.addRoutes([
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ])
}

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

router.onReady(() => {
  addContentRouter()
})

router.beforeEach((to, from, next) => {
  if(to.meta.noCheck) {
    next()
    return
  }

  // TODO: 校验用户信息，
  next()
})

router.afterEach(() => {
})


export default router
