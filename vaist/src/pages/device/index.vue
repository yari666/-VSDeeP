<!----设备管理----->

<template>
    <div class="device main-content">
        <a-row>
            <a-col :span="18">
                <a-form layout="inline" :form="form" @submit="handleSubmit">
                    <a-form-item label="关键词">
                        <a-input placeholder="请输入搜索关键词" />
                    </a-form-item>

                    <a-form-item label="状态">
                        <a-select
                            style="width: 150px"
                            @change="handleChange"
                            placeholder="请选择"
                        >
                            <a-select-option value="未开始"
                                >未开始</a-select-option
                            >
                            <a-select-option value="进行中"
                                >进行中</a-select-option
                            >
                            <a-select-option value="已完成"
                                >已完成</a-select-option
                            >
                            <a-select-option value="暂停中"
                                >暂停中</a-select-option
                            >
                            <a-select-option value="已归档"
                                >已归档</a-select-option
                            >
                        </a-select>
                    </a-form-item>

                    <a-form-item label="设备型号">
                        <a-select
                            style="width: 150px"
                            @change="handleChange"
                            placeholder="请选择"
                        >
                            <a-select-option value="分类">
                                分类
                            </a-select-option>
                            <a-select-option value="检测">
                                检测
                            </a-select-option>
                            <a-select-option value="分割">
                                分割
                            </a-select-option>
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
                <a-button type="primary" class="frbtns" @click="showModal">
                    添加
                </a-button>
            </a-col>
        </a-row>

        <div class="table">
            <a-table :columns="columns" :data-source="data">
                <div slot="status">状态</div>
                <div slot="deviceName" slot-scope="record">
                    <router-link to="/device/detail">{{
                        record.deviceName
                    }}</router-link>
                </div>
                <div slot="deviceModel">设备型号</div>
                <div slot="address" slot-scope="record">
                    <div class="address">
                        <span>{{ record.area }}</span>
                        <p>{{ record.address }}</p>
                    </div>
                </div>
                <div slot="userInfo" slot-scope="record">
                    <div class="userInfo">
                        <div>{{ record.constructionCompany }}</div>
                        <span
                            >{{ record.userName }}
                            <a-divider type="vertical" />
                            {{ record.userPhone }}</span
                        >
                    </div>
                </div>
                <div slot="operation">
                    <a-button type="primary" @click="showEdit">编辑</a-button>
                </div>
            </a-table>
        </div>

        <!-- 弹框 -->
        <a-modal
            title="添加设备"
            :footer="null"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="visible"
            v-if="visible"
            @ok="handleOk"
        >
            <add-device></add-device>
        </a-modal>

        <a-modal
            title="编辑设备"
            :footer="null"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="editvisible"
            v-if="editvisible"
            @ok="editOk"
        >
            <device-form :openType="openType"></device-form>
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "设备名称(公司)",
        key: "deviceName",
        scopedSlots: { customRender: "deviceName" },
    },
    {
        title: "设备型号",
        key: "deviceModel",
        dataIndex: "deviceModel",
    },
    {
        title: "地址",
        key: "address",
        scopedSlots: { customRender: "address" },
    },
    {
        title: "客户信息",
        key: "userInfo",
        scopedSlots: { customRender: "userInfo" },
    },
    {
        title: "操作",
        key: "operation",
        scopedSlots: { customRender: "operation" },
    },
];

const data = [
    {
        key: "1",
        status: "未启动",
        deviceName: "检测设备-GH32",
        deviceModel: "GHFJ-156767",
        area: "江苏省/苏州市/工业园区",
        address: "国际科技园二期",
        userName: "李志达",
        userPhone: "15190037586",
        constructionCompany: "苏州康宁建筑有限公司",
    },
    {
        key: "2",
        status: "在线",
        deviceName: "检测设备-GH41",
        deviceModel: "升降机",
        area: "江苏省/苏州市/工业园区",
        address: "松涛街12号",
        userName: "李志达",
        userPhone: "15190037586",
        constructionCompany: "苏州康宁建筑有限公司",
    },
    {
        key: "3",
        status: "离线",
        deviceName: "设备-GH12",
        deviceModel: "AIbox",
        area: "江苏省/苏州市/吴中区",
        address: "金鸡湖大道188号",
        userName: "李志达",
        userPhone: "15190037586",
        constructionCompany: "苏州康宁建筑有限公司",
    },
];

import addDevice from "./adddevice";
import deviceForm from "./deviceform";

export default {
    data() {
        return {
            data,
            columns,
            visible: false,
            confirmLoading: false,
            form: {},
            editvisible: false,
            openType: "edit",
        };
    },
    components: { addDevice, deviceForm },
    methods: {
        handleChange() {},
        handleSubmit() {},
        showModal() {
            this.visible = true;
        },
        showEdit() {
            this.editvisible = true;
        },
        handleOk(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        editOk(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.editvisible = false;
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
