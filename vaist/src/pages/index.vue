<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu
                theme="dark"
                mode="inline"
                :defaultSelectedKeys="[$route.path]"
                :selectedKeys="[this.$route.path.split('/')[1]]"
            >
                <a-menu-item key="home">
                    <router-link to="/home">
                        <a-icon type="home" />
                        <span>首页</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="user">
                    <router-link to="/user">
                        <a-icon type="team" />
                        <span>成员管理</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="device">
                    <router-link to="/device">
                        <a-icon type="dashboard" />
                        <span>设备管理</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="dataset">
                    <router-link to="/dataset">
                        <a-icon type="profile" />
                        <span>数据集列表</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="task">
                    <router-link to="/task">
                        <a-icon type="solution" />
                        <span>任务管理</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="datasource">
                    <router-link to="/datasource">
                        <a-icon type="database" />
                        <span>数据源</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="tools">
                    <router-link to="/tools">
                        <a-icon type="database" />
                        <span>标注工具</span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                    class="trigger fl"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)"
                />
                <a-space size="large" class="fr">
                    <div class="user"><a-icon type="user" />{{ userName }}</div>
                    <a-icon type="setting" />
                </a-space>
            </a-layout-header>
            <a-layout-content>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { get } from "@/utils/fetch.js";

export default {
    data() {
        return {
            collapsed: false,
            userName: "",
        };
    },
    computed: {
        uuid() {
            return this.$store.state.uuid;
        },
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            get(`/user/${this.uuid}`).then((res) => {
                if (res.is_successful && res.data) {
                    this.userName = res.data.username;
                }
            });
        },
    },
};
</script>

<style lang="less">
.main-content {
    background: #fff;
    margin: 24px 16px;
    padding: 24px;
    min-height: 280px;
}
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: url(../assets/img/logo.svg) center no-repeat;
    margin: 16px;
}

.ant-layout {
    height: 100%;
}
.ant-layout-header {
    .fr {
        margin-right: 16px;
        font-size: 16px;
        color: #666;
        .user {
            i {
                margin-right: 5px;
            }
        }
    }
}
</style>

