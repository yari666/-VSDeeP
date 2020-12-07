<template>
    <div class="listbox">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
            <a-form-item label="关键词">
                <a-input placeholder="请输入搜索关键词" />
            </a-form-item>

            <a-form-item label="创建时间">
                <a-range-picker
                    :show-time="{ format: 'HH:mm' }"
                    format="YYYY-MM-DD HH:mm"
                    :placeholder="['开始时间', '结束时间']"
                    @change="onChange"
                    @ok="onOk"
                />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-item>
        </a-form>

        <div class="table">
            <a-table :columns="columns" :data-source="data">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <div slot="label">
                    <a-tag color="pink"> 安全帽 </a-tag>
                    <a-tag color="red"> 人 </a-tag>
                    <a-tag color="orange"> 升降机 </a-tag>
                    <a-tag color="green"> 车辆 </a-tag>
                    <a-tag color="cyan"> 人头 </a-tag>
                    <a-tag color="blue"> 建筑 </a-tag>
                    <a-tag color="purple"> 车辆 </a-tag>
                </div>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "名称",
        dataIndex: "name",
        scopedSlots: { customRender: "name" },
    },
    {
        title: "标签",
        key: "label",
        scopedSlots: { customRender: "label" },
    },
    {
        title: "标注情况",
        key: "lableRate",
        dataIndex: "lableRate",
    },
    {
        title: "创建时间",
        key: "createTime",
        dataIndex: "createTime",
    },
];

const data = [
    {
        key: "1",
        name: "苏州第五建筑局",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
    },
    {
        key: "2",
        name: "地铁三号线",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
    },
    {
        key: "3",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
    },
];

export default {
    data() {
        return {
            data,
            columns,
            form: {},
            bind: false, //解除权限
            bindLength: 0,

            visible: false,
            confirmLoading: false,

            showDevice: false,
            showFile: false,

            showCopy: false,
            showMove: false,
            showTask: false,
        };
    },
    props: ["breadcrumbIndex"],
    computed: {
        rowSelection() {
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(
                        `selectedRowKeys: ${selectedRowKeys}`,
                        "selectedRows: ",
                        selectedRows
                    );
                    this.bindEvent(selectedRows.length);
                },
                getCheckboxProps: (record) => ({
                    props: {
                        disabled: record.name === "Disabled User",
                        name: record.name,
                    },
                }),
            };
        },
    },
    methods: {
        onChange(value, dateString) {
            console.log("Selected Time: ", value);
            console.log("Formatted Selected Time: ", dateString);
        },
        onOk(value) {
            console.log("onOk: ", value);
        },
        bindEvent(length) {
            console.log(length);
            this.bindLength = length;
            this.bind = length;
        },
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

        showUploadDevice() {
            this.showDevice = true;
        },
        showUploadFile() {
            this.showFile = true;
        },
        copyEvent() {
            this.showCopy = true;
        },
        moveEvent() {
            this.showMove = true;
        },
        taskEvent() {
            this.showTask = true;
        },
    },
};
</script>

<style lang="less" scoped>
.table {
    margin-top: 20px;
}
</style>
