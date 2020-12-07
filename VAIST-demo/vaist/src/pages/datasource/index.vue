<template>
    <div class="datasource main-content">
        <!-- 面包屑导航 -->
        <a-row>
            <a-col :span="18">
                <a-breadcrumb>
                    <a-breadcrumb-item
                        v-for="(item, index) in breadcrumb"
                        :key="index"
                    >
                        <template v-if="breadcrumbIndex == index">
                            {{ item }}
                        </template>
                        <template v-else>
                            <a @click="hrefEvent(index)">{{ item }}</a>
                        </template>
                    </a-breadcrumb-item>
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