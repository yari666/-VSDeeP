<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="数据集名称">
            <a-input v-model="form.name" disabled />
        </a-form-model-item>

        <a-form-model-item label="移动位置">
            <a-cascader
                :options="options"
                change-on-select
                placeholder="请选择要移动到的位置"
                @change="onChange"
            />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 17, offset: 5 }">
            <a-button type="primary" @click="onSubmit"> 确定 </a-button>
            <a-button style="margin-left: 10px"> 取消 </a-button>
        </a-form-model-item>
    </a-form-model>
</template>


<script>
import labelTags from "@/components/tags";

export default {
    components: { labelTags },
    data() {
        return {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
            form: {
                name: "待标注数据集1-1-1，待标注数据集1-2...",
            },

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
    },
};
</script>

