import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Login from '@/pages/login'
import Home from '@/pages/home/index'
import Task from '@/pages/task/index'
import TaskArrange from '@/pages/task/arrange/index'
import TaskReceive from '@/pages/task/receive/index'
import TaskDetail from '@/pages/task/detail/index'

import Device from '@/pages/device/index'
import DeviceDetail from '@/pages/device/detail/index'

import User from '@/pages/user/index'

import Dataset from '@/pages/dataset/index'
import Datasource from '@/pages/datasource/index'

import Tools from '@/pages/tools/index'


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
                component: Home,
            },
            {
                path: '/task',
                name: 'Task',
                component: Task,
                children: [
                    {
                        // 任务--发布列表
                        path: '/',
                        name: 'TaskArrange',
                        component: TaskArrange
                    },
                    {
                        // 任务--发布列表
                        path: 'arrange',
                        name: 'TaskArrange',
                        component: TaskArrange
                    },
                    {
                        // 任务--接收列表
                        path: 'receive',
                        name: 'TaskReceive',
                        component: TaskReceive
                    }
                ]
            },
            {
                // 任务--任务详情
                path: '/task/detail',
                name: 'TaskDetail',
                component: TaskDetail
            },
            {
                path: '/device',
                name: 'Device',
                component: Device
            },
            {
                // 设备详情
                path: '/device/detail',
                name: 'DeviceDetail',
                component: DeviceDetail
            },
            {
                path: '/user',
                name: 'User',
                component: User
            },
            {
                path: '/dataset',
                name: 'Dataset',
                component: Dataset
            },
            {
                path: '/datasource',
                name: 'Datasource',
                component: Datasource
            },
            {
                path: '/tools',
                name: 'Tools',
                component: Tools
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }

];

const router = new Router({ routes });

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
    // to将要访问的路径
    // from 代表从哪个路径跳转而来
    // next() 放行    next(/login) 强行跳转

    // if (to.path === '/login') {
    //     return next()
    // }

    // const token = window.localStorage.getItem('token')
    // if (!token) {
    //     return next('/login')
    // }

    next()
})

export default router;