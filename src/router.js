import Vue from 'vue'
import Router from 'vue-router'
// import goTo from 'vuetify/es5/services/goto'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // component: Home
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/docs',
            name: 'docs',
            // component: Home
            component: () => import(/* webpackChunkName: "docs" */ './views/Documents.vue')
        },
    ],
    // scrollBehavior: function (to, from, savedPosition) {
    //     console.log(to)
    //     let scrollTo = 0;
    //     if (to.hash) {
    //         scrollTo = to.hash;
    //         console.log(to, document.querySelector(to.hash))
    //         // return window.scrollTo({
    //         //     top: document.querySelector(to.hash).offsetTop,
    //         //     behavior: 'smooth'
    //         // })
    //         // return document.querySelector(to.hash).scrollIntoView({ block: 'center', behavior: 'smooth' })
    //     } else {
    //         scrollTo = savedPosition.y;
    //         // return savedPosition || { x: 0, y: 0 }
    //     }

    //     return goTo(scrollTo)
    // }
})