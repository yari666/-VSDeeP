<template>
    <div class="copyto">
        <a-form-model
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="数据集名称">
                <a-input v-model="form.name" disabled />
            </a-form-model-item>

            <a-form-model-item label="复制位置">
                <a-cascader
                    :options="options"
                    change-on-select
                    placeholder="请选择要复制到的位置"
                    @change="onChange"
                />
            </a-form-model-item>

            <a-form-model-item label="是否带标注">
                <a-switch @change="onSwitchChange" />
            </a-form-model-item>

            <a-form-model-item label="标签合并" v-show="showMergeLabel">
                <merge-label></merge-label>
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 21, offset: 3 }">
                <a-button type="primary" @click="onSubmit"> 确定 </a-button>
                <a-button style="margin-left: 10px"> 取消 </a-button>
            </a-form-model-item>
        </a-form-model>

        <!-- 弹框 -->
        <!-- <a-modal
            :footer="null"
            title="标签合并"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="showMergeLabel"
            v-if="showMergeLabel"
            @ok="handleOk"
        >
            <merge-label></merge-label>
        </a-modal> -->
    </div>
</template>


<script>
import labelTags from "@/components/tags";
import mergeLabel from "@/components/mergelabel";

export default {
    components: { labelTags, mergeLabel },
    data() {
        return {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
            form: {
                name: "待标注数据集1-1-1",
            },

            showMergeLabel: false,
            showMerge: false,

            options: [
                {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                        {
                            value: "hangzhou",
                            label: "Hangzhou",
                            children: [
                                {
                                    value: "xihu",
                                    label: "West Lake",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "jiangsu",
                    label: "Jiangsu",
                    children: [
                        {
                            value: "nanjing",
                            label: "Nanjing",
                            children: [
                                {
                                    value: "zhonghuamen",
                                    label: "Zhong Hua Men",
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!", this.form);
        },
        onChange(value) {
            console.log(value);
        },
        onSwitchChange(value) {
            console.log(value);
            this.showMergeLabel = value;
        },
        handleOk() {},
    },
};
</script>

<style lang="less" scoped>
span.add {
    display: table;
    float: left;
    width: 50px;
    height: 40px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    .plus {
        font-size: 28px;
        color: #aaa;
        line-height: 50px;
    }
}
.tip {
    font-style: normal;
    color: #999;
}
</style>

