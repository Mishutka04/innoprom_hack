import { createRouter, createWebHashHistory } from 'vue-router';
import Form from './components/Form.vue';
import Search from './components/Search.vue'
import Main from './components/Main.vue'
import Profile from './components/Profile.vue'
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: 'product1', path: '/form/', component: Form },
        { name: 'product21', path: '/search/', component: Main },
        { name: 'prsoduct21', path: '/profile/', component: Profile },


        
        // { name: 'test', path: '/test/', component: AdminPanel },
        
        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: "/",
        // }

    ]
})