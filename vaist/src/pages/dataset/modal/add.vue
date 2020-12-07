<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="数据集名称">
            <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item label="标注类型">
            <a-select v-model="form.region" placeholder="请选择标注类型">
                <a-select-option value="分类"> 分类 </a-select-option>
                <a-select-option value="检测"> 检测 </a-select-option>
                <a-select-option value="分割"> 分割 </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item label="标 签">
            <div class="tagsbox"><label-tags></label-tags></div>
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
                name: "",
                region: "",
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

