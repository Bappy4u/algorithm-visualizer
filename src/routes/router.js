import { createRouter, createWebHistory } from 'vue-router';
import SearchView from './../algorithms/search/Search.vue';
import homeView from './../algorithms/algorithms.vue';
import SortView from './../algorithms/sort/Sort.vue';
import LinkedList from './../algorithms/linked-list/Linked-List.vue';

const routes = [
    { path: '/', component: homeView },
    { path: '/search', component: SearchView },
    { path: '/sort', component: SortView },
    { path: '/linked-list', component: LinkedList },
    // Add more routes for other algorithm components
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
