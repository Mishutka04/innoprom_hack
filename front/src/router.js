import { createRouter, createWebHashHistory } from 'vue-router';
import Form from './components/Form.vue';
import Main from './components/Main.vue'
import Profile from './components/Profile.vue';
import Auth from './components/Auth.vue';
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: 'product1', path: '/form/:user_given_id/:methodology_id', component: Form },
        { name: 'product21', path: '/search/', component: Main },
        { name: 'prsoduct21', path: '/profile/:id', component: Profile },
        { name: 'prsoduct221', path: '/auth/', component: Auth },
        {
            path: '/:pathMatch(.*)*',
            redirect: "/search/",
        }


        // { name: 'test', path: '/test/', component: AdminPanel },

        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: "/",
        // }

    ]
})