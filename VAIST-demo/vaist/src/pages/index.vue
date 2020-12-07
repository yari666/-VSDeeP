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
                <a-menu-item
                    key="home"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.15)"
                >
                    <router-link to="/home">
                        <a-icon type="home" />
                        <span>首页</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="online">
                    <router-link to="/online">
                        <a-icon type="eye" />
                        <span>在线设备</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item
                    key="offline"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.15)"
                >
                    <router-link to="/offline">
                        <a-icon type="eye-invisible" />
                        <span>离线设备</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="truck_wash">
                    <router-link to="/truck_wash">
                        <a-icon type="car" />
                        <span>车辆冲洗</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="truck_close">
                    <router-link to="/truck_close">
                        <a-icon type="car" />
                        <span>密闭运输</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="soil_cover">
                    <router-link to="/soil_cover">
                        <a-icon type="line" />
                        <span>裸土覆盖</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="edge_spray">
                    <router-link to="/edge_spray">
                        <a-icon type="sound" />
                        <span>临边喷淋</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item
                    key="watercar"
                    style="border-bottom: 1px solid rgba(255, 255, 255, 0.15)"
                >
                    <router-link to="/watercar">
                        <a-icon type="car" />
                        <span>洒水车</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="helmet">
                    <router-link to="/helmet">
                        <a-icon type="robot" />
                        <span>安全帽识别</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="person_count">
                    <router-link to="/person_count">
                        <a-icon type="usergroup-add" />
                        <span>电梯人数超员</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="meeting">
                    <router-link to="/meeting">
                        <i class="morningicon"></i>
                        <span>晨会交底</span>
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
                <h2 class="fl" style="line-height: 56px">
                    {{ title }}
                </h2>
                <a-space size="large" class="fr">
                    <div class="user"><a-icon type="user" />{{ userName }}</div>
                    <a-icon type="setting" />
                </a-space>
            </a-layout-header>
            <a-layout-content>
                <keep-alive
                    ><router-view :key="$route.fullPath"></router-view
                ></keep-alive>

                <p class="copyright">©Copyright 2020 苏ICP备2020065822号-1</p>
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
            title: "",
        };
    },
    computed: {
        uuid() {
            return this.$store.state.uuid;
        },
    },
    created() {
        // this.getUser();

        this.getTitle();
    },
    methods: {
        getUser() {
            get(`/user/${this.uuid}`).then((res) => {
                if (res.is_successful && res.data) {
                    this.userName = res.data.username;
                }
            });
        },
        getTitle() {
            get(`http://api.feieee.com/api/title`).then((res) => {
                this.title = res.title;
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
    background: url("http://xhs.feieee.com/logo.svg") 10px center no-repeat;
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
.morningicon {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 8px;
    background: url(../assets/img/morning.svg) center 10px no-repeat;
    opacity: 0.75;
}
.copyright {
    color: #999;
    text-align: center;
}
.ant-form-item {
    margin-bottom: 0px;
}
</style>

