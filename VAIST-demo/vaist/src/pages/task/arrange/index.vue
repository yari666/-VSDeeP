<!--发布任务列表-->

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

            <a-col :span="6">
                <a-button type="primary" class="frbtns" @click="showModal">
                    添加
                </a-button>
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
                    <div slot="actions">
                        <span :class="item.passAi ? 'selected' : ''">
                            <a-icon type="robot" style="margin-right: 8px" />
                            经过AI
                        </span>
                        <a-divider type="vertical" />
                        <template>
                            <span v-if="0">
                                <a-icon
                                    type="appstore"
                                    style="margin-right: 8px"
                                />
                                分类
                            </span>
                            <span v-if="0">
                                <a-icon
                                    type="border-inner"
                                    style="margin-right: 8px"
                                />
                                检测
                            </span>
                            <span>
                                <a-icon
                                    :component="BreakupSvg"
                                    style="margin-right: 8px"
                                />
                                分割
                            </span>
                        </template>
                        <a-divider type="vertical" />
                        <span>
                            <a-icon type="user" style="margin-right: 8px" />
                            王晓曦
                        </span>
                    </div>
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
                                        :format="() => '| |'"
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

                                    <a-space size="middle" class="btns">
                                        <a-button type="primary">
                                            暂停
                                        </a-button>
                                        <a-button>重置</a-button>
                                        <a-button type="danger">
                                            删除
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </a-list-item>
            </a-list>
        </div>

        <!-- 弹框 -->
        <a-modal
            title="添加任务"
            :footer="null"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="visible"
            @ok="handleOk"
        >
            <add-task></add-task>
        </a-modal>
    </div>
</template>



<script>
import addTask from "./addtask";

const BreakupSvg = {
    template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.21 73.5">
    <g id="图层_2" data-name="图层 2">
    <g id="图层_1-2" data-name="图层 1">
    <path class="cls-1" d="M14.41,61.19a2,2,0,0,1-1.07-3.69l1.92-1.22a2,2,0,0,1,2.13,3.39l-1.91,1.21A2,2,0,0,1,14.41,61.19Z"/>
    <path class="cls-1" d="M21.39,56.78a2,2,0,0,1-1.07-3.69l2-1.25a2,2,0,0,1,2.14,3.39l-2,1.24A2,2,0,0,1,21.39,56.78Z"/>
    <path class="cls-1" d="M28.22,52.47a2,2,0,0,1-1.07-3.7l2.06-1.3a2,2,0,0,1,2.14,3.38l-2.07,1.31A2,2,0,0,1,28.22,52.47Z"/>
    <path class="cls-1" d="M35.46,47.91a2,2,0,0,1-1.07-3.69l2.13-1.34a2,2,0,1,1,2.13,3.38L36.53,47.6A2,2,0,0,1,35.46,47.91Z"/>
    <path class="cls-1" d="M73.17,73.5h-.71c-10.72,0-26.56-7-29.73-8.48L3.13,70.19A2.77,2.77,0,0,1,1.29,65.1L7.87,61A2,2,0,0,1,10,64.33L8.16,65.5l35.21-4.59.53.25c.18.08,17.76,8.34,28.56,8.34h.33a26.69,26.69,0,0,0,17.45-5.3c5.07-3.74,10.05-13.47,11.32-22.15.67-4.53.21-8.13-1.3-10.14a6.35,6.35,0,0,1-1.19-5.84c1.28-4.23,7.12-7.34,11.66-9.17l-8.6-5.74-.23-.57c-.13-.32-3.55-8-16.86-6.35C70.91,6,67.82,18.47,67.82,23.12c0,1.94-1.31,4.85-11,11.73-1.57,1.12-3.34,2.32-5.26,3.58a2,2,0,0,1-2.19-3.35c1.87-1.22,3.6-2.4,5.14-3.49,8.76-6.23,9.28-8.28,9.31-8.5,0-5.6,3.72-20.69,20.72-22.82,14.4-1.8,19.57,5.91,20.78,8.21L115,14.93a2.74,2.74,0,0,1-.61,4.86c-6.27,2.21-10.78,5.13-11.49,7.45a2.37,2.37,0,0,0,.57,2.27c2.18,2.91,2.9,7.44,2.06,13.12-1.43,9.76-7,20.42-12.9,24.79A30.57,30.57,0,0,1,73.17,73.5Z"/><path class="cls-1" d="M43.07,43.26A2,2,0,0,1,42,39.57l2.13-1.34a2,2,0,1,1,2.13,3.38L44.14,43A2,2,0,0,1,43.07,43.26Z"/>
    </g>
    </g>
    </svg>`,
};

export default {
    data() {
        return {
            BreakupSvg,
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
    components: { addTask },
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
.selected {
    color: #1890ff;
}
.title {
    color: #1890ff;
    text-decoration: underline;
}
.breakup {
    width: 100%;
    height: 100%;
    background: url(../../../assets/img/bird.svg) center no-repeat;
    color: red;
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
        .btns {
            margin-top: 10px;
        }
    }
}
</style>