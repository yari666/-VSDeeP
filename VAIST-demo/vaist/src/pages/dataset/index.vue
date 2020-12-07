<template>
    <div class="dataset main-content">
        <!-- 面包屑导航 -->
        <a-row>
            <a-col :span="18">
                <a-breadcrumb :routes="routes">
                    <template
                        slot="itemRender"
                        slot-scope="{ route, params, routes, paths }"
                    >
                        <span
                            v-if="routes.indexOf(route) === routes.length - 1"
                        >
                            {{ route.breadcrumbName }}
                        </span>
                        <router-link v-else :to="paths.join('/')">
                            {{ route.breadcrumbName }}
                        </router-link>
                    </template>
                </a-breadcrumb>
            </a-col>

            <a-col :span="6">
                <a-button-group class="fr">
                    <a-button
                        v-for="(item, index) in tabList"
                        :key="index"
                        :type="tabIndex == index ? 'primary' : ''"
                        @click="changeTab(index)"
                        >{{ item }}</a-button
                    >
                </a-button-group>
            </a-col>
        </a-row>

        <a-divider />
        <!-- 内容 -->
        <div class="content">
            <list-box
                :breadcrumbIndex="breadcrumbIndex"
                v-show="tabIndex == 0"
            ></list-box>
            <file-box
                :breadcrumbIndex="breadcrumbIndex"
                v-show="tabIndex == 1"
            ></file-box>
        </div>
    </div>
</template>

<script>
import listBox from "./listbox/index";
import fileBox from "./filebox/index";

export default {
    data() {
        return {
            tabList: ["列表模式", "文件模式"],
            tabIndex: 0,
            breadcrumb: ["数据集", "数据集1", "数据集1-1", "数据集1-1-1"], //面包屑导航
            breadcrumbIndex: 0, //当前位置

            routes: [
                {
                    path: "index",
                    breadcrumbName: "home",
                },
                {
                    path: "first",
                    breadcrumbName: "first",
                    children: [
                        {
                            path: "/general",
                            breadcrumbName: "General",
                        },
                        {
                            path: "/layout",
                            breadcrumbName: "Layout",
                        },
                        {
                            path: "/navigation",
                            breadcrumbName: "Navigation",
                        },
                    ],
                },
                {
                    path: "second",
                    breadcrumbName: "second",
                },
            ],
        };
    },
    components: { listBox, fileBox },
    created() {
        this.breadcrumbIndex = this.breadcrumb.length + 1;
    },
    methods: {
        hrefEvent(index) {
            this.breadcrumbIndex = index;
            this.breadcrumb.length = index + 1;
        },
        changeTab(index) {
            this.tabIndex = index;
        },
    },
};
</script>