<template>
    <div class="detail main-content">
        <a-button icon="double-left">返回</a-button>

        <a-row class="row" :gutter="50">
            <a-col :span="12">
                <left-con></left-con>
            </a-col>

            <a-col :span="12">
                <right-con></right-con>
            </a-col>
        </a-row>
    </div>
</template>

<style lang="less" scoped>
.row {
    margin-top: 20px;
    height: 100%;
}
</style>

<script>
import leftCon from "./left";
import rightCon from "./right";

export default {
    components: { leftCon, rightCon },
};
</script>