<template>
    <div class="container">
        <tool-header></tool-header>
        <div class="main">
            <tool-left></tool-left>
            <tool-panel></tool-panel>
            <tool-right></tool-right>
        </div>
    </div>
</template>

<script>
import ToolHeader from "./components/Header";
import ToolLeft from "./components/Left";
import ToolPanel from "./components/Panel";
import ToolRight from "./components/Right";
export default {
    components: {
        ToolHeader,
        ToolLeft,
        ToolPanel,
        ToolRight,
    },
    data() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    background: #2f2f2c;
    height: 100%;
    .main {
        flex: 1;
        display: flex;
        align-items: stretch;
    }
}
</style>