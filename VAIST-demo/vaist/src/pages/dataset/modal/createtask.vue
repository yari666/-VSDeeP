<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="数据集名称">
            <a-input v-model="form.name" disabled />
        </a-form-model-item>

        <a-form-model-item label="任务名称">
            <a-input v-model="form.taskName" />
        </a-form-model-item>

        <a-form-model-item label="标注人">
            <a-select v-model="form.region" placeholder="请选择任务标注人">
                <a-select-option value="shanghai"> 刘明达 </a-select-option>
                <a-select-option value="beijing">
                    Jsting Burds
                </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item label="是否经AI">
            <a-switch v-model="form.delivery" />
        </a-form-model-item>

        <a-form-model-item label="备注">
            <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 17, offset: 5 }">
            <a-button type="primary" @click="onSubmit"> 确定 </a-button>
            <a-button style="margin-left: 10px"> 取消 </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
export default {
    data() {
        return {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
            form: {
                name: "数据集11",
                taskName: "",
                region: undefined,
                date1: undefined,
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!", this.form);
        },
    },
};
</script>