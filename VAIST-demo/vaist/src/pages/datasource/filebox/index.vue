<template>
    <div class="filebox">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
            <a-form-item label="关键词">
                <a-input v-model="form.name" placeholder="请输入搜索关键词" />
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
            <ul class="imgbox">
                <li v-for="(item, index) in data" :key="index">
                    <div class="box">
                        <div class="con">
                            <div class="image" v-if="item.type == 'image'">
                                <img
                                    v-if="item.type == 'image'"
                                    :src="item.imgUrl"
                                />
                            </div>

                            <div class="file" v-if="item.type == 'file'"></div>
                            <div
                                class="vedio"
                                v-if="item.type == 'vedio'"
                            ></div>
                        </div>
                    </div>
                </li>
            </ul>

            <a-pagination
                class="fr"
                v-model="current"
                :total="50"
                show-less-items
            />
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
        type: "file",
        selected: false,
    },
    {
        key: "2",
        name: "地铁三号线",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "file",
        selected: false,
    },
    {
        key: "3",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "image",
        selected: false,
        imgUrl:
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        key: "4",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
    {
        key: "5",
        name: "苏州第五建筑局",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "file",
        selected: false,
    },
    {
        key: "6",
        name: "地铁三号线",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "file",
        selected: false,
    },
    {
        key: "7",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "image",
        selected: false,
        imgUrl:
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        key: "8",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
    {
        key: "9",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
    {
        key: "10",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
    {
        key: "11",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "image",
        selected: false,
        imgUrl:
            "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        key: "12",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
    {
        key: "13",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
    {
        key: "14",
        name: "科士达摄像头",
        label: "设备",
        lableRate: "70%",
        createTime: "202-11-12",
        type: "vedio",
        selected: false,
    },
];

export default {
    data() {
        return {
            data,
            columns,
            form: {
                name: "",
            },
            bingList: [],
            bind: false,
            bindLength: 0,

            visible: false,
            confirmLoading: false,

            showDevice: false,
            showFile: false,

            showCopy: false,
            showMove: false,
            showTask: false,

            current: 1,
        };
    },
    props: ["breadcrumbIndex"],
    methods: {
        onChange(value, dateString) {
            console.log("Selected Time: ", value);
            console.log("Formatted Selected Time: ", dateString);
        },
        onOk(value) {
            console.log("onOk: ", value);
        },
        selectEvent(index) {
            this.data[index].selected = !this.data[index].selected;
            let arr = [];
            this.data.forEach((item) => {
                if (item.selected == true) {
                    arr.push(item);
                }
            });
            console.log(arr.length);
            this.bindEvent(arr.length);
        },
        bindEvent(length) {
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
ul.imgbox {
    margin-top: 20px;
    overflow: hidden;
    li {
        width: 10%;
        padding: 10px;
        float: left;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;

        .box {
            width: 100%;
            height: 0;
            padding-top: 100%;
            border: 1px dashed #ccc;
            background: #fafafa;
            position: relative;
            & > div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .file {
                width: 100%;
                height: 100%;
                background: url(../../../assets/img/File.svg) center no-repeat;
            }
            .vedio {
                width: 100%;
                height: 100%;
                background: url(../../../assets/img/video.svg) center no-repeat;
            }
            .image {
                width: 100%;
                height: 100%;
                background: url(../../../assets/img/image.svg) center no-repeat;
            }
            img {
                width: 100%;
                height: 100%;
            }
            .icon {
                position: absolute;
                right: 5px;
                top: 5px;
                font-size: 26px;
                &.selected {
                    color: #52c41a;
                }
            }
        }
    }
}
</style>
