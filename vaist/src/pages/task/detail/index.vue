<template>
    <div class="detail main-content">
        <a-row type="flex" justify="space-around">
            <a-col :span="15">
                <a-list
                    item-layout="vertical"
                    size="large"
                    :data-source="listData"
                >
                    <a-list-item
                        slot="renderItem"
                        key="item.title"
                        slot-scope="item, index"
                    >
                        <a-list-item-meta :description="item.taskSource">
                            <a slot="title">{{ item.taskName }}</a>
                            <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </a-list-item-meta>
                        {{ item.remark }}

                        <template
                            v-for="{ type, text } in actions"
                            slot="actions"
                        >
                            <span
                                :key="type"
                                :class="type == 'filter' ? 'selected' : ''"
                            >
                                <a-icon
                                    :type="type"
                                    style="margin-right: 8px"
                                />
                                {{ text }}
                            </span>
                        </template>
                        <div class="date" slot="actions">
                            <a-icon type="calendar" style="margin-right: 8px" />
                            <span>截至日期：</span>{{ item.taskEndTime
                            }}<a-divider type="vertical" /><a-icon
                                type="carry-out"
                                style="margin: 0 8px"
                            /><span>剩余天数：</span>{{ item.taskRemainTime }}天
                        </div>
                    </a-list-item>
                </a-list>
                <a-space size="middle" class="btns">
                    <a-button type="primary"> 暂停 </a-button>
                    <a-button>重置</a-button>
                    <a-button type="primary" @click="showModal">
                        编辑
                    </a-button>
                </a-space>
            </a-col>
            <a-col :span="5">
                <div class="tools">
                    <a-progress type="circle" :percent="75" :width="150" />
                    <span> 进行中 </span>
                </div>
            </a-col>
        </a-row>

        <a-list
            item-layout="vertical"
            size="large"
            :data-source="listData"
            v-if="0"
        >
            <a-list-item
                slot="renderItem"
                key="item.title"
                slot-scope="item, index"
            >
                <a-list-item-meta :description="item.taskSource">
                    <a slot="title">{{ item.taskName }}</a>
                    <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                </a-list-item-meta>
                {{ item.remark }}
                <div class="date">
                    截至日期：{{ item.taskEndTime
                    }}<a-divider type="vertical" />剩余天数：{{
                        item.taskRemainTime
                    }}
                </div>

                <template v-for="{ type, text } in actions" slot="actions">
                    <span
                        :key="type"
                        :class="type == 'filter' ? 'selected' : ''"
                    >
                        <a-icon :type="type" style="margin-right: 8px" />
                        {{ text }}
                    </span>
                </template>

                <div class="tools" slot="extra">
                    <a-progress type="circle" :percent="75" :width="150" />
                    <span> 进行中 </span>
                </div>
            </a-list-item>
        </a-list>

        <a-divider />

        <div class="img-box">
            <swiper-box></swiper-box>
        </div>

        <div class="begin">
            <a-button type="primary" size="large" class="btn">
                开始标注
            </a-button>
            <a-button size="large" class="btn"> 换一批 </a-button>
        </div>

        <!-- 弹框 -->
        <a-modal
            title="编辑任务"
            :footer="null"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="visible"
            @ok="handleOk"
        >
            <edit-task></edit-task>
        </a-modal>
    </div>
</template>

<script>
import swiperBox from "@/components/swiper";
import editTask from "./edittask";

export default {
    data() {
        return {
            listData: [
                {
                    taskName: "标注任务2010/11/09标注任务1",
                    taskStatus: "进行中",
                    taskEndTime: "2020年11月9日",
                    taskRemainTime: "20",
                    taskSource: "2020年11月9日数据源1",
                    passAi: true,
                    taskMan: "李静怡",
                    remark:
                        "疯狂垃圾分厘卡士大夫卡即使对方飞机阿喀琉斯JFK垃圾发来看是否发送卡快女现场v你先看v那是大多数分解落实到附件为JFK扣税的",
                    avatar:
                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                },
            ],
            actions: [
                { type: "filter", text: "经过AI" },
                { type: "tool", text: "描边" },
                { type: "user", text: "王晓曦" },
            ],
            visible: false,
            confirmLoading: false,
        };
    },
    components: { swiperBox, editTask },
    methods: {
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
.img-box {
    margin-top: 20px;
    padding: 50px 24px;
}

.begin {
    margin: 0 auto;
    width: 30%;
    .btn {
        margin: 0 20px;
        padding: 0 50px;
    }
}

.date {
    span {
        color: #444;
    }
}

.selected {
    color: #1890ff;
}
.tools {
    margin-top: 20px;
    span {
        margin-top: 10px;
        font-size: 20px;
        display: block;
        font-weight: 600;
        width: 150px;
        text-align: center;
    }
}
</style>