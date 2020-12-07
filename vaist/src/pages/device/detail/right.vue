<template>
    <div class="setting">
        <h2>设置修改</h2>
        <a-divider />

        <template>
            <a-form-model
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <!-- text -->
                <a-form-model-item label="Device text">
                    <a-input v-model="form.name" />
                </a-form-model-item>

                <!-- select -->
                <a-form-model-item label="Device select">
                    <a-select
                        v-model="form.region"
                        placeholder="please select your zone"
                    >
                        <a-select-option value="shanghai">
                            Zone one
                        </a-select-option>
                        <a-select-option value="beijing">
                            Zone two
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <!-- date -->
                <a-form-model-item label="Device date">
                    <a-date-picker
                        v-model="form.date1"
                        show-time
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                </a-form-model-item>

                <!-- time -->
                <a-form-model-item label="Device time">
                    <a-time-picker :open="open">
                        <a-button
                            slot="addon"
                            slot-scope="panel"
                            size="small"
                            type="primary"
                        >
                            Ok {{ panel.prefixCls }}
                        </a-button>
                    </a-time-picker>
                </a-form-model-item>

                <!-- download -->
                <a-form-model-item label="Device download">
                    <a-button type="primary" icon="download"
                        >下载文件AAA</a-button
                    >
                </a-form-model-item>

                <!-- progress -->
                <a-form-model-item label="Device progress">
                    <a-progress :percent="99" status="active" />
                </a-form-model-item>

                <!-- image -->
                <a-form-model-item label="Device images">
                    <img
                        width="50%"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                </a-form-model-item>

                <!-- checkbox -->
                <a-form-model-item label="Device checkbox">
                    <a-checkbox-group v-model="form.type">
                        <a-checkbox value="1" name="type"> Online </a-checkbox>
                        <a-checkbox value="2" name="type">
                            Promotion
                        </a-checkbox>
                        <a-checkbox value="3" name="type"> Offline </a-checkbox>
                    </a-checkbox-group>
                </a-form-model-item>

                <!-- radio -->
                <a-form-model-item label="Device radio">
                    <a-radio-group v-model="form.resource">
                        <a-radio value="1"> Sponsor </a-radio>
                        <a-radio value="2"> Venue </a-radio>
                    </a-radio-group>
                </a-form-model-item>

                <!-- button -->
                <a-form-model-item label="Device button">
                    <a-button type="primary" @click="onSubmit">
                        Button A
                    </a-button>
                    <a-button style="margin-left: 10px"> Button B </a-button>
                </a-form-model-item>
            </a-form-model>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            open: false,
            form: {
                name: "",
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

<style lang="less" scoped>
.setting {
    h2 {
        height: 20px;
        line-height: 20px;
    }
    ul {
        width: 100%;
        padding: 0 24px;
        box-sizing: border-box;
    }
}
</style>