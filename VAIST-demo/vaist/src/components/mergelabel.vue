<template>
    <div class="mergelabel">
        <a-button type="dashed" style="width: 40%" @click="addDomain">
            <a-icon type="plus" /> 点击新增合并
        </a-button>
        <em class="tip"> （ 说明：如有合并需求，可在此做标签合并 ）</em>
        <div class="formbox">
            <a-form
                v-for="(item, index) in form"
                :key="index"
                layout="inline"
                :form="item"
                style="margin-bottom: 20px"
            >
                <a-form-model-item label="标签名">
                    <a-input
                        v-model="item.name"
                        style="width: 100px"
                        placeholder="标签名"
                    />
                </a-form-model-item>

                <a-form-model-item label="标签颜色">
                    <a-button class="color" size="small"> </a-button>
                    <color-picker style="margin-left: 8px"></color-picker>
                </a-form-model-item>

                <a-form-model-item label="选中标签">
                    <div class="tagsbox">
                        <a-tag color="pink" closable> pink </a-tag>
                        <a-tag color="red" closable> red </a-tag>
                        <a-tag color="orange" closable> orange </a-tag>
                        <a-tag color="green" closable> green </a-tag>
                        <a-tag color="orange" closable> orange </a-tag>
                        <a-tag color="green" closable> green </a-tag>
                    </div>
                </a-form-model-item>

                <a-form-model-item>
                    <a-button type="primary" size="small"> 选择标签 </a-button>

                    <a-button
                        type="danger"
                        size="small"
                        style="margin-left: 30px"
                    >
                        删除
                    </a-button>
                </a-form-model-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import tags from "./tags";
import colorPicker from "@/components/colorpicker";

export default {
    data() {
        return {
            color: "red",
            form: [{ name: "合并标签1" }, { name: "合并标签2" }],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                },
            },
            formItemLayoutWithOutLabel: {
                wrapperCol: {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 24, offset: 0 },
                },
            },
            dynamicValidateForm: {
                domains: [],
            },
        };
    },
    components: { tags, colorPicker },
    methods: {
        removeDomain(item) {
            let index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: "",
                key: Date.now(),
            });
        },
    },
};
</script>

<style lang="less" scoped>
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}
.dynamic-delete-button:hover {
    color: #777;
}
.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
.formbox {
    margin-top: 10px;
    padding: 10px;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    .color {
        margin-top: 8px;
        width: 24px;
    }
}
.tagsbox {
    max-width: 240px;
    height: 40px;
    overflow-y: scroll;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
}
.tip {
    font-style: normal;
    color: #999;
}
</style>
