<template>
    <div class="resourcepermission">
        <a-row>
            <a-col :span="18">
                <a-form layout="inline" :form="form" @submit="handleSubmit">
                    <a-form-item label="关键词">
                        <a-input placeholder="请输入搜索关键词" />
                    </a-form-item>

                    <a-form-item label="种类">
                        <a-select
                            style="width: 150px"
                            @change="handleChange"
                            placeholder="请选择"
                        >
                            <a-select-option value="人">人</a-select-option>
                            <a-select-option value="设备">设备</a-select-option>
                            <a-select-option value="算法">算法</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit"
                            >查询</a-button
                        >
                    </a-form-item>
                </a-form>
            </a-col>

            <a-col :span="6">
                <div class="frbtns">
                    <a-button type="primary" @click="showModal">添加</a-button>
                    <a-button
                        type="danger"
                        style="margin-left: 10px"
                        :disabled="!bind"
                        >解除权限</a-button
                    >
                </div>
            </a-col>
        </a-row>

        <div class="table">
            <a-table
                :row-selection="rowSelection"
                :columns="columns"
                :data-source="data"
            >
                <a slot="name" slot-scope="text">{{ text }}</a>
                <a slot="read">
                    <template>
                        <a-radio-group name="radioGroup" :default-value="1">
                            <a-radio :value="1"> 只读 </a-radio>
                            <a-radio :value="2"> 读写 </a-radio>
                        </a-radio-group>
                    </template>
                </a>
            </a-table>
        </div>

        <!-- 弹框 -->
        <a-modal
            :footer="null"
            title="添加权限"
            width="40%"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="visible"
            v-if="visible"
            @ok="handleOk"
        >
            <add-rp></add-rp>
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "资源名称",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "资源种类",
        key: "type",
        dataIndex: "type",
    },
    {
        title: "资源描述",
        key: "desc",
        dataIndex: "desc",
    },
    {
        title: "读写权限",
        key: "read",
        scopedSlots: { customRender: "read" },
    },
];

const data = [
    {
        key: "1",
        id: 1,
        name: "科士达摄像头",
        type: "设备",
        desc: "科士达摄像头用于某某建设局某某工地",
    },
    {
        key: "2",
        id: 2,
        name: "获取人数",
        type: "算法",
        desc: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
    {
        key: "3",
        id: 3,
        name: "黄健华",
        type: "人",
        desc: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    },
];

import addRp from "./add";

export default {
    components: { addRp },
    data() {
        return {
            data,
            columns,
            form: {},
            bind: false, //解除权限
            visible: false,
            confirmLoading: false,
        };
    },
    computed: {
        rowSelection() {
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(
                        `selectedRowKeys: ${selectedRowKeys}`,
                        "selectedRows: ",
                        selectedRows
                    );
                    this.bindEvent(selectedRows.length != 0);
                },
                getCheckboxProps: (record) => ({
                    props: {
                        disabled: record.name === "Disabled User", // Column configuration not to be checked
                        name: record.name,
                    },
                }),
            };
        },
    },
    methods: {
        bindEvent(flag) {
            console.log(flag);
            this.bind = flag;
        },
        handleChange() {},
        handleSubmit() {},
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
    },
};
</script>

<style lang="less" scoped>
.table {
    margin-top: 20px;
}
</style>
