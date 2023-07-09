<template>
    <div class="top-menu">
        <nav>
            <ul>
                <li v-for="menuItem in menuItems" :key="menuItem.id" :class="{ active: isActive(menuItem.route) }">
                    <router-link :to="menuItem.route">{{ menuItem.label }}</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import { useRoute } from 'vue-router';

    export default {
        name: 'menu-view',
        setup() {
            const route = useRoute();

            const menuItems = [
                { id: 1, label: 'Home', route: '/' },
                { id: 2, label: 'Searching Algorithm', route: '/search' },
                { id: 3, label: 'Sorting Algorithm', route: '/sort' },
                // Add more menu items for other algorithms
            ];

            const isActive = (routePath) => {
                return route.path === routePath;
            };

            return {
                menuItems,
                isActive,
            };
        },
    };
</script>

<style>
    .top-menu {
        background-color: #f0f0f0;
    }

    nav ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    nav ul li {
        display: inline-block;
        padding: 10px;
    }

    nav ul li.active {
        background-color: #ccc;
    }
</style>
