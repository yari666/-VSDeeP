<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="设备型号">
            <a-input v-model="form.model" disabled />
        </a-form-model-item>

        <a-form-model-item label="设备名称">
            <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="地址">
            <a-input v-model="form.address" />
        </a-form-model-item>

        <a-form-model-item label="建筑公司">
            <a-input v-model="form.company" />
        </a-form-model-item>

        <a-form-model-item label="工地名称">
            <a-input v-model="form.constructionName" />
        </a-form-model-item>

        <a-form-model-item label="负责人">
            <a-row type="flex" justify="space-between">
                <a-col :span="12">
                    <a-input placeholder="姓名" v-model="form.userName" />
                </a-col>
                <a-col :span="11">
                    <a-input placeholder="联系方式" v-model="form.userPhone" />
                </a-col>
            </a-row>
        </a-form-model-item>

        <a-form-model-item
            v-show="openType == 'edit'"
            :wrapper-col="{ span: 14, offset: 5 }"
        >
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
                model: "GHFJ-156767",
                name: "",
                address: "",
                company: "",
                constructionName: "",
                userName: "",
                userPhone: "",
            },
        };
    },
    props: ["openType"],
    mounted() {
        console.log(this.openType);
    },
    methods: {
        onSubmit() {
            console.log("submit!", this.form);
        },
    },
};
</script>

<style lang="less" scoped>
</style>