<template>
    <div class="add">
        <a-button
            class="btn"
            type="primary"
            icon="plus"
            size="large"
            @click="create"
        >
            生成添加码
        </a-button>

        <a-form-model
            layout="inline"
            :model="form"
            style="margin-top: 30px"
            v-show="form.val"
        >
            <a-form-model-item label="添加码">
                <a-input v-model="form.val" size="large" />
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary"> 复制 </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                val: "",
            },
        };
    },
    props: ["openType"],
    mounted() {
        console.log(this.openType);
    },
    methods: {
        create() {
            this.form.val = Math.random() * 100;
        },
    },
};
</script>

<style lang="less" scoped>
.add {
    text-align: center;
    padding-bottom: 50px;
}
.btn {
    margin: 0 auto;
    padding: 0 30px;
}
</style>