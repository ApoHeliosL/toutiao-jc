// 路由表
export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/',
        component: () => import('@/views/layout'),
        children: [
            {
                path: '/home',// 默认子路由
                name: 'home',
                component: () => import('@/views/home')
            },
            {
                path: '/qa',// 默认子路由
                name: 'qa',
                component: () => import('@/views/qa')
            },
            {
                path: '/film',// 默认子路由
                name: 'film',
                component: () => import('@/views/film')
            },
            {
                path: '/mine',// 默认子路由
                name: 'mine',
                component: () => import('@/views/mine')
            }
        ]
    }
]

