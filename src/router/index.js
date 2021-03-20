import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Show from '../views/Show.vue'
import Signup from '../views/Signup.vue'

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
    component: Post
  },
  {
    path: '/show/:postid',
    name: 'Show',
    component: Show,
    props: route => ({ postid: String(route.params.postid) })
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
