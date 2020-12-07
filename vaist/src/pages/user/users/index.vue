<template>
    <div class="user">
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
                <div slot="nickName">昵称</div>
                <div slot="name">姓名</div>
                <div slot="tel">联系方式</div>
                <div slot="email">邮箱</div>
                <div slot="status">状态</div>
                <div slot="operation">
                    <a-button type="primary" @click="showEdit">编辑</a-button>
                    <a-button type="primary" @click="rePermission"
                        >资源权限</a-button
                    >
                    <a-button type="danger" @click="del">删除</a-button>
                </div>
            </a-table>
        </div>

        <!-- 弹框 -->
        <a-modal
            title="添加成员"
            :footer="null"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="visible"
            v-if="visible"
            @ok="handleOk"
        >
            <add-user></add-user>
        </a-modal>

        <a-modal
            title="编辑成员"
            :footer="null"
            okText="确定"
            cancelText="取消"
            :maskClosable="false"
            v-model="editvisible"
            v-if="editvisible"
            @ok="editOk"
        >
            <user-form :openType="openType"></user-form>
        </a-modal>

        <a-modal
            title="资源权限"
            okText="确定"
            width="50%"
            cancelText="取消"
            :maskClosable="false"
            v-model="showRePermission"
            v-if="showRePermission"
            @ok="rpOk"
        >
            <resource-permission></resource-permission>
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "序号",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "昵称",
        dataIndex: "nickName",
        key: "nickName",
    },
    {
        title: "姓名",
        key: "name",
        dataIndex: "name",
    },
    {
        title: "联系方式",
        key: "tel",
        dataIndex: "tel",
    },
    // {
    //     title: "邮箱",
    //     key: "email",
    //     dataIndex: "email",
    // },
    // {
    //     title: "状态",
    //     key: "status",
    //     dataIndex: "status",
    // },
    {
        title: "操作",
        key: "operation",
        scopedSlots: { customRender: "operation" },
    },
];

const data = [
    {
        key: "1",
        id: 1,
        status: "可用",
        nickName: "小明",
        email: "303859212@qq.com",
        name: "李志达",
        tel: "15190037586",
    },
    {
        key: "2",
        id: 2,
        status: "不可用",
        nickName: "小明",
        email: "303859212@qq.com",
        name: "李志达",
        tel: "15190037586",
    },
    {
        key: "3",
        id: 3,
        status: "可用",
        nickName: "小明",
        email: "303859212@qq.com",
        name: "李志达",
        tel: "15190037586",
    },
];

import addUser from "./adduser";
import userForm from "./userform";
import resourcePermission from "./resourcepermission/index";

import { get } from "@/utils/fetch.js";

export default {
    data() {
        return {
            data: [],
            columns,
            page_index: 1,
            page_size: 10,
            total_data: 0,

            visible: false,
            confirmLoading: false,
            form: {},
            editvisible: false,
            openType: "edit",

            showRePermission: false,
        };
    },
    components: { addUser, userForm, resourcePermission },
    created() {
        this.getUserList();
    },
    computed: {
        uuid() {
            return this.$store.state.uuid;
        },
    },
    methods: {
        getUserList() {
            get(`/user/${this.uuid}/employee`, {
                page_size: 10,
                page_index: 1,
                uuid: this.uuid,
                order_by: "AVAILABLE_ASC",
                assignable_to: "",
            }).then((res) => {
                if (res.is_successful) {
                    let arr = [];
                    res.data.items.forEach((_, i) => {
                        arr.push({
                            key: i,
                            id: i,
                            status: _.status,
                            nickName: _.nickName,
                            email: _.email,
                            name: _.name,
                            tel: _.mobile,
                        });
                    });

                    this.data = arr;
                }
            });
        },

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
        del() {},
        rePermission() {
            this.showRePermission = true;
        },
        rpOk() {
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
.fr {
    margin-top: 4px;
}
</style>