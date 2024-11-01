import { createRouter, createWebHashHistory } from 'vue-router';
import Form from './components/Form.vue';
import Search from './components/Search.vue'
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: 'product1', path: '/form/', component: Form },
        { name: 'product21', path: '/search/', component: Search },


        
        // { name: 'test', path: '/test/', component: AdminPanel },
        
        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: "/",
        // }

    ]
})