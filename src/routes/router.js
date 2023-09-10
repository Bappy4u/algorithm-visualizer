import { createRouter, createWebHistory } from 'vue-router';
import SearchView from './../algorithms/search/Search.vue';
import homeView from './../algorithms/algorithms.vue';
import BfsView from './../algorithms/BFS/BFS.vue';
import SortView from './../algorithms/sort/Sort.vue';

const routes = [
    { path: '/', component: homeView },
    { path: '/search', component: SearchView },
    { path: '/BFS', component: BfsView },
    { path: '/sort', component: SortView },
    // Add more routes for other algorithm components
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
