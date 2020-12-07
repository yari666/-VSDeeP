<template>
    <div class="container">
        <menu-bar></menu-bar>
        <div class="main">
            <!-- 左侧工具 -->
            <tool-left></tool-left>
            <!-- 工具背景图 -->
            <tool-background></tool-background>
            <!-- 工具画布 -->
            <tool-canvas></tool-canvas>
            <!-- 右侧工具 -->
            <tool-right></tool-right>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import MenuBar from "./components/MenuBar";
import ToolLeft from "./components/ToolLeft";
import ToolRight from "./components/ToolRight";
import ToolCanvas from "./components/Canvas";
import ToolBackground from "./components/Background";
export default {
    components: {
        MenuBar,
        ToolLeft,
        ToolRight,
        ToolCanvas,
        ToolBackground,
    },
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions(["toolSetMould"]),
        init() {
            this.toolSetMould("Rectangle");
            // this.toolSetMould("Circle");
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    background: #2f2f2c;
    height: 100%;
    overflow: hidden;
    .main {
        flex: 1;
        display: flex;
        align-items: stretch;
        position: relative;
    }
}
</style>