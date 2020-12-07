<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="任务名称">
            <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="数据集">
            <a-select v-model="form.date1" placeholder="请选择任务所属数据集">
                <a-select-opt-group>
                    <span slot="label"><a-icon type="user" />Manager</span>
                    <a-select-option value="jack"> Jack </a-select-option>
                    <a-select-option value="lucy"> Lucy </a-select-option>
                </a-select-opt-group>
                <a-select-opt-group label="Engineer">
                    <a-select-option value="Yiminghe">
                        yiminghe
                    </a-select-option>
                </a-select-opt-group>
            </a-select>
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

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit"> 确定 </a-button>
            <a-button style="margin-left: 10px"> 取消 </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                name: "标注任务2010/11/09标注任务",
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