<!--接收任务列表-->

<template>
    <div class="arrange">
        <a-row>
            <a-col :span="18">
                <a-form layout="inline" :form="form" @submit="handleSubmit">
                    <a-form-item label="关键词">
                        <a-input placeholder="请输入搜索关键词" />
                    </a-form-item>

                    <a-form-item label="标注类型">
                        <a-select
                            style="width: 150px"
                            @change="handleChange"
                            placeholder="请选择"
                        >
                            <a-select-option value="分类">
                                分类
                            </a-select-option>
                            <a-select-option value="检测">
                                检测
                            </a-select-option>
                            <a-select-option value="分割">
                                分割
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="状态">
                        <a-select
                            style="width: 150px"
                            @change="handleChange"
                            placeholder="请选择"
                        >
                            <a-select-option value="未开始"
                                >未开始</a-select-option
                            >
                            <a-select-option value="进行中"
                                >进行中</a-select-option
                            >
                            <a-select-option value="已完成"
                                >已完成</a-select-option
                            >
                            <a-select-option value="暂停中"
                                >暂停中</a-select-option
                            >
                            <a-select-option value="已归档"
                                >已归档</a-select-option
                            >
                        </a-select>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit"
                            >查询</a-button
                        >
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>

        <div>
            <a-list
                item-layout="vertical"
                size="large"
                :pagination="pagination"
                :data-source="listData"
            >
                <a-list-item
                    slot="renderItem"
                    key="item.title"
                    slot-scope="item, index"
                >
                    <template v-for="{ type, text } in actions" slot="actions">
                        <span
                            :key="type"
                            :class="type == 'filter' ? 'selected' : ''"
                        >
                            <a-icon :type="type" style="margin-right: 8px" />
                            {{ text }}
                        </span>
                    </template>

                    <a-list-item-meta :description="item.taskSource">
                        <a
                            slot="title"
                            class="title"
                            @click="openDetail(index)"
                            >{{ item.taskName }}</a
                        >
                        <a-avatar
                            slot="avatar"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                    </a-list-item-meta>

                    <div class="tools" slot="extra">
                        <a-row
                            type="flex"
                            justify="space-between"
                            align="bottom"
                        >
                            <a-col :span="6" class="status-box">
                                <template v-if="item.taskStatus == '未开始'">
                                    <a-progress
                                        type="circle"
                                        :percent="0"
                                        :width="68"
                                    />
                                    <span>未开始</span>
                                </template>
                                <template
                                    v-else-if="item.taskStatus == '进行中'"
                                >
                                    <a-progress
                                        type="circle"
                                        :percent="75"
                                        :width="68"
                                    />
                                    <span>进行中</span>
                                </template>
                                <template
                                    v-else-if="item.taskStatus == '已完成'"
                                >
                                    <a-progress
                                        type="circle"
                                        :percent="100"
                                        :width="68"
                                    />
                                    <span>已完成</span>
                                </template>
                                <template
                                    v-else-if="item.taskStatus == '已归档'"
                                >
                                    <a-progress
                                        type="circle"
                                        :percent="75"
                                        :width="68"
                                    />
                                    <span>已归档</span>
                                </template>
                                <template
                                    v-else-if="item.taskStatus == '暂停中'"
                                >
                                    <a-progress
                                        type="circle"
                                        :percent="75"
                                        :width="68"
                                        status="exception"
                                    />
                                    <span>暂停中</span>
                                </template>
                            </a-col>

                            <a-col :span="4">
                                <div class="fr">
                                    <div>截至日期：{{ item.taskEndTime }}</div>
                                    <div>
                                        剩余天数：{{ item.taskRemainTime }}
                                    </div>

                                    <a-button type="danger"> 删除 </a-button>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            form: {},
            listData: [
                {
                    taskName: "标注任务1",
                    taskStatus: "未开始",
                    taskEndTime: "2020-12-01",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                },
                {
                    taskName: "标注任务2",
                    taskStatus: "进行中",
                    taskEndTime: "2020-12-01",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                },
                {
                    taskName: "标注任务3",
                    taskStatus: "已完成",
                    taskEndTime: "2020-12-01",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                },
                {
                    taskName: "标注任务4",
                    taskStatus: "暂停中",
                    taskEndTime: "2020-12-01",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                },
                {
                    taskName: "标注任务3",
                    taskStatus: "暂停中",
                    taskEndTime: "2020-12-01",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                },
                {
                    taskName: "标注任务4",
                    taskStatus: "进行中",
                    taskEndTime: "2020-12-01",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                },
            ],
            actions: [
                { type: "filter", text: "经过AI" },
                { type: "tool", text: "描边" },
                { type: "user", text: "王晓曦" },
            ],
            pagination: {
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
            },
            visible: false,
            confirmLoading: false,
        };
    },
    methods: {
        handleSubmit() {},
        handleChange() {},
        openDetail(index) {
            console.log(index);
            this.$router.push({ path: "/task/detail" });
        },
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
    },
};
</script>

<style lang="less" scoped>
.list-box {
    height: calc(~"100vh - 300px");
    overflow-y: scroll;
    position: relative;
    cursor: pointer;
    .ant-list-pagination {
        position: fixed;
        right: 40px;
    }
}
.title {
    color: #1890ff;
    text-decoration: underline;
}
.selected {
    color: #1890ff;
}
.tools {
    .status-box {
        text-align: center;
        padding-top: 5px;
        span {
            margin-top: 5px;
        }
    }
    .fr {
        line-height: 26px;
        white-space: nowrap;
        .btns {
            margin-top: 10px;
        }
    }
}
</style>