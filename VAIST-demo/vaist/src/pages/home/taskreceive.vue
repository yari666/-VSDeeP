<template>
    <div>
        <a-row
            style="margin-top: 10px; padding: 0 40px 0 20px"
            type="flex"
            justify="space-between"
        >
            <a-col :span="20">
                <div class="progress">
                    <span>2020.11.05数据集任务</span>
                    <a-progress class="fr" :percent="30" />
                </div>
                <div class="progress">
                    <span>2020.11.05数据集任务</span
                    ><a-progress class="fr" :percent="50" status="active" />
                </div>
                <div class="progress">
                    <span>2020.11.05数据集任务</span
                    ><a-progress class="fr" :percent="70" status="exception" />
                </div>
                <div class="progress">
                    <span>2020.11.05数据集任务</span
                    ><a-progress class="fr" :percent="100" />
                </div>
                <div class="progress">
                    <span>2020.11.05数据集任务</span
                    ><a-progress class="fr" :percent="50" :show-info="false" />
                </div>
            </a-col>
            <a-col :span="3">
                <a-progress type="circle" :percent="75" />
            </a-col>
        </a-row>
    </div>
</template>

<style lang="less" scoped>
.progress {
    width: 100%;
    overflow: hidden;
    line-height: 2.9vh;
    span {
        float: left;
        width: 25%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .fr {
        width: 75%;
    }
}
</style>