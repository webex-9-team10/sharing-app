import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Show from '../views/Show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
    props: route => ({
       lat: String(route.params.lat) ,
       lng: String(route.params.lng) 
    })
  },
  {
    path: '/show/:postid',
    name: 'Show',
    component: Show,
    props: route => ({ postid: String(route.params.postid) })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
