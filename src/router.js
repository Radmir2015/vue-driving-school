import Vue from 'vue'
import Router from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'about',
            alias: '/about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // component: Home
        //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // },
        {
            path: '/docs',
            name: 'docs',
            component: () => import(/* webpackChunkName: "docs" */ './views/Documents.vue')
        },
        {
            path: '/events',
            name: 'events',
            component: () => import(/* webpackChunkName: "events" */ './views/Events.vue')
        },
    ],
    scrollBehavior: function (to, from, savedPosition) {
        // console.log(to)
        let scrollTo = 0;
        if (to.hash) {
            scrollTo = to.hash;
            // console.log(to, document.querySelector(to.hash))
            // return window.scrollTo({
            //     top: document.querySelector(to.hash).offsetTop,
            //     behavior: 'smooth'
            // })
            // return document.querySelector(to.hash).scrollIntoView({ block: 'center', behavior: 'smooth' })
        } else {
            scrollTo = (savedPosition && savedPosition.y) || 0;
            // return savedPosition || { x: 0, y: 0 }
        }

        // let scrollTemp = scrollTo
        try {
            return goTo(scrollTo)
        } catch {
            console.log('Not found the element to scroll to')
            return scrollTo
        }
        // return scrollTemp
    }
})