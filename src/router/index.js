import Vue from 'vue'
import Router from 'vue-router'
const cube = () => import(/*webpackChunkName:"main"*/'../page/cube')
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: cube,
            redirect: '/cube'
        },
        {
            path: '/cube',
            component: cube,
            meta: {
                title: '魔方'
            }
        }
    ]})
export default router