<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="昵称">
            <a-input v-model="form.nickName" />
        </a-form-model-item>

        <a-form-model-item label="姓名">
            <a-input v-model="form.name" disabled />
        </a-form-model-item>

        <a-form-model-item label="联系方式">
            <a-input v-model="form.tel" disabled />
        </a-form-model-item>

        <!-- <a-form-model-item label="电子邮箱">
            <a-input v-model="form.email" disabled />
        </a-form-model-item> -->

        <!-- <a-form-model-item label="状态">
            <a-input v-model="form.status" disabled />
        </a-form-model-item> -->

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
                nickName: "",
                name: "李明达",
                tel: "15190037688",
                email: "342342423@163.com",
                status: "可用",
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