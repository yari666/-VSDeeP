import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
// import Meeting from '@/pages/meeting/index'
// import MeetingDetail from '@/pages/meeting/detail/index'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/pages/home/index'),
            },
            {
                path: '/truck_wash',
                name: 'truckWash',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'car'
                }
            },
            {
                path: '/truck_wash/:id',
                name: 'truckWashDetail',
                component: () => import('@/pages/meeting/detail/index'),
            },
            {
                path: '/soil_cover',
                name: 'soilCover',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'line'
                }
            },
            {
                path: '/soil_cover/:id',
                name: 'soilCoverDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/edge_spray',
                name: 'edgeSpray',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'sound'
                }
            },
            {
                path: '/edge_spray/:id',
                name: 'edgeSprayDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/helmet',
                name: 'helmet',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'robot'
                }
            },
            {
                path: '/helmet/:id',
                name: 'helmetDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/person_count',
                name: 'personCount',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'usergroup-add'
                }
            },
            {
                path: '/person_count/:id',
                name: 'personCountDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/truck_close',
                name: 'truckClose',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'car'
                }
            },
            {
                path: '/truck_close/:id',
                name: 'truckCloseDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/meeting',
                name: 'Meeting',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'morningicon'
                }
            },
            {
                path: '/meeting/:id',
                name: 'MeetingDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/online',
                name: 'Online',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'eye'
                }

            },
            {
                path: '/online/:id',
                name: 'OnlineDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/offline',
                name: 'Offline',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'eye-invisible'
                }
            },
            {
                path: '/offline/:id',
                name: 'OfflineDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/watercar',
                name: 'Watercar',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'car'
                }
            },
            {
                path: '/watercar/:id',
                name: 'WatercarDetail',
                component: () => import('@/pages/meeting/detail/index')
            },
            {
                path: '/truck_close',
                name: 'TruckClose',
                component: () => import('@/pages/meeting/index'),
                meta: {
                    icon: 'car'
                }
            },
            {
                path: '/truck_close/:id',
                name: 'TruckCloseDetail',
                component: () => import('@/pages/meeting/detail/index')
            }
        ]
    }
];

const router = new Router({ routes });

// 挂在路由导航守卫
// router.beforeEach((to, from, next) => {
//     // to将要访问的路径
//     // from 代表从哪个路径跳转而来
//     // next() 放行    next(/login) 强行跳转

//     if (to.path === '/login') {
//         return next()
//     }

//     const token = window.localStorage.getItem('token')
//     if (!token) {
//         return next('/login')
//     }

//     next()
// })

export default router;
