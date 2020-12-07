<template>
    <div>
        <a-steps :current="current">
            <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
            />
        </a-steps>

        <!-- 内容 -->
        <div class="steps-content" :class="current != 0 ? 'pt30' : ''">
            <template v-if="current == 0">
                <a-form-model
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item label="添加码" prop="license">
                        <a-input placeholder="请输入添加码" />
                    </a-form-model-item>
                </a-form-model>
            </template>
            <device-form v-if="current == 1" :openType="openType"></device-form>
            <template v-if="current == 2">
                <a-result status="success" title="添加成功"> </a-result>
            </template>
        </div>

        <!-- 下一步 -->
        <div class="steps-action">
            <a-button
                v-if="current < steps.length - 1"
                type="primary"
                @click="next"
            >
                下一步
            </a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="$message.success('Processing complete!')"
            >
                完成
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
                上一步
            </a-button>
        </div>
    </div>
</template>


<script>
import deviceForm from "./deviceform";

export default {
    data() {
        return {
            current: 0,
            steps: [
                {
                    title: "添加码验证",
                    content: "First-content",
                },
                {
                    title: "填写信息",
                    content: "Second-content",
                },
                {
                    title: "完成",
                    content: "Last-content",
                },
            ],

            labelCol: { span: 6 },
            wrapperCol: { span: 14 },

            license: "",
            rules: {
                license: {
                    required: true,
                    message: "请输入license",
                    trigger: "blur",
                },
            },
            openType: "add",
        };
    },
    components: { deviceForm },
    methods: {
        next() {
            this.current++;
        },
        prev() {
            this.current--;
        },
    },
};
</script>
<style scoped>
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
.steps-content.pt30 {
    padding-top: 20px;
}

.steps-action {
    margin-top: 24px;
}
.success {
    font-size: 30px;
}
</style>
