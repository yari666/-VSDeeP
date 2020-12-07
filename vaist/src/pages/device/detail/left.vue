<template>
    <div class="info">
        <h2>设备信息</h2>
        <a-divider />

        <template>
            <a-form-model
                :model="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <!-- vedio -->
                <a-form-model-item :wrapper-col="{ span: 20, offset: 0 }">
                    <video
                        style="width: 100%; height: 320px"
                        ref="video"
                        controls
                    ></video>
                </a-form-model-item>

                <a-form-model-item label="Device slider">
                    <a-slider id="test" :default-value="30" />
                </a-form-model-item>

                <!-- tag -->
                <a-form-model-item label="Device tag">
                    <a-tag color="pink"> 安全帽 </a-tag>
                    <a-tag color="red"> 人 </a-tag>
                    <a-tag color="orange"> 升降机 </a-tag>
                    <a-tag color="green"> 车辆 </a-tag>
                    <a-tag color="cyan"> 人头 </a-tag>
                    <a-tag color="blue"> 建筑 </a-tag>
                    <a-tag color="purple"> 车辆 </a-tag>
                </a-form-model-item>

                <!-- list -->
                <a-form-model-item :wrapper-col="{ span: 20, offset: 0 }">
                    <a-list item-layout="horizontal" :data-source="data">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-list-item-meta
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            >
                                <a slot="title" href="https://www.antdv.com/">{{
                                    item.title
                                }}</a>
                                <a-avatar
                                    slot="avatar"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </a-form-model-item>
            </a-form-model>
        </template>
    </div>
</template>

<script>
const data = [
    {
        title: "Ant Design Title 1",
    },
    {
        title: "Ant Design Title 2",
    },
    {
        title: "Ant Design Title 3",
    },
    {
        title: "Ant Design Title 4",
    },
];

import Hls from "hls.js";

export default {
    data() {
        return {
            data,
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
    mounted() {
        this.getStream();
    },
    methods: {
        onPlayerPlay(player) {
            alert("play");
        },
        onPlayerPause(player) {
            alert("pause");
        },
        onSubmit() {
            console.log("submit!", this.form);
        },
        videoPause() {
            if (this.hls) {
                this.$refs.video.pause();
                this.hls.destroy();
                this.hls = null;
            }
        },
        getStream() {
            this.$nextTick(() => {
                if (Hls.isSupported()) {
                    var video = this.$refs.video;
                    this.hls = new Hls();
                    var m3u8Url = decodeURIComponent(
                        "http://58.210.158.219:8099/hls/CHL0001/CHL0001.m3u8"
                    );
                    this.hls.loadSource(m3u8Url);
                    this.hls.attachMedia(video);
                    this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
                        video.play();
                    });
                }
            });
        },
        beforeDestroy() {
            this.videoPause();
        },
    },
};
</script>

<style lang="less" scoped>
.info {
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