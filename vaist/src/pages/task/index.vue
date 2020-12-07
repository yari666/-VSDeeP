<template>
    <div class="task main-content">
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="发布任务列表">
                <arrange></arrange>
            </a-tab-pane>
            <a-tab-pane key="2" tab="接收任务列表" force-render>
                <receive></receive>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import Arrange from "./arrange/index";
import Receive from "./receive/index";

export default {
    data() {
        return {};
    },
    components: { Arrange, Receive },
    methods: {
        callback(key) {
            console.log(key);
        },
    },
};
</script>
