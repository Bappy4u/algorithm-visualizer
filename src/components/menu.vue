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
                { id: 4, label: 'Linked List', route: '/linked-list' },
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
        background-color: #333;

        display: flex;
        align-items: center;

    }

    nav ul {
        list-style-type: none;
        margin: 0 20px;
        padding: 0;
        display: flex;
        height: 100%;
        max-width: 90vw;
    }

    nav ul li {
        margin-right: 10px;
        opacity: 0;
        transform: translateY(-20px);
        animation: slideIn 0.5s forwards;
        animation-delay: calc(var(--index) * 0.1s);
        height: 100%;
    }

    nav ul li a {
        color: #fff;
        text-decoration: none;
        padding: 15px;
        transition: color 0.3s, background-color 0.3s;
        height: 100%;
        display: flex;
        align-items: center;
    }

    nav ul li a:hover {
        color: #ffcc00;
        background-color: #444;
    }

    nav ul li.active a {
        color: #ffcc00;
        background-color: #444;
    }

    @keyframes slideIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
