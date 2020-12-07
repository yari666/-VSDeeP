<template>
    <div class="info">
        <h2>
            {{ leftCaption.cn
            }}<a-button class="fr" @click="$router.back(-1)">
                <a-icon type="left" />返回
            </a-button>
        </h2>

        <a-divider />

        <template>
            <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
                <template v-for="item in temData">
                    <!-- vedio -->
                    <a-form-model-item
                        :wrapper-col="{ span: 20, offset: 0 }"
                        v-if="item.component == 'video'"
                        :key="item.order"
                        :label="item.caption.cn"
                    >
                        <video
                            v-if="item.value.split('.')[1] == 'm3u8'"
                            class="videlStyle"
                            ref="video"
                            controls
                        ></video>
                        <video
                            v-else
                            :src="item.value"
                            class="videlStyle"
                            controls="controls"
                            ref="video"
                        >
                            您的浏览器不支持 video 标签。
                        </video>
                    </a-form-model-item>

                    <!-- slider -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'slider'"
                        :key="item.order"
                    >
                        <a-slider
                            id="test"
                            :default-value="item.value"
                            disabled
                        />
                    </a-form-model-item>
                    <!-- tag -->
                    <a-form-model-item
                        v-else-if="item.component == 'tag'"
                        :label="item.caption.cn"
                        :key="item.order"
                    >
                        <a-tag
                            v-for="(tag, tagi) in item.value"
                            color="blue"
                            :key="tagi"
                        >
                            {{ tag }}
                        </a-tag>
                    </a-form-model-item>

                    <!-- file -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'file'"
                        :key="item.order"
                    >
                        <a-button type="primary" @click="openFile(item.value)">
                            点击下载文件
                        </a-button>
                    </a-form-model-item>

                    <!-- list -->
                    <a-form-model-item
                        v-else-if="item.component == 'list'"
                        :label="item.caption.cn"
                        :wrapper-col="{ span: 20, offset: 0 }"
                        :key="item.order"
                    >
                        <a-list
                            item-layout="horizontal"
                            :data-source="item.value"
                            v-if="item.value && item.value.length"
                        >
                            <a-list-item
                                slot="renderItem"
                                slot-scope="listItem"
                                style="padding: 10px"
                            >
                                <a-list-item-meta :description="listItem">
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-form-model-item>

                    <!-- text -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'text'"
                        :key="item.order"
                    >
                        {{ item.value }}
                    </a-form-model-item>

                    <!-- input -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'input'"
                        :key="item.order"
                    >
                        <a-input v-model="item.value" disabled />
                    </a-form-model-item>

                    <!-- select -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'select'"
                        :key="item.order"
                    >
                        <a-select
                            v-model="item.value"
                            placeholder="请选择"
                            disabled
                        >
                            <template
                                v-for="(selectItem, selectIndex) in item.type"
                            >
                                <a-select-option
                                    :key="selectIndex"
                                    :value="selectItem"
                                >
                                    {{ selectItem }}
                                </a-select-option>
                            </template>
                        </a-select>
                    </a-form-model-item>

                    <!-- date -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'date'"
                        :key="item.order"
                    >
                        <a-date-picker
                            :default-value="item.value"
                            show-time
                            type="date"
                            placeholder="Pick a date"
                            style="width: 100%"
                            disabled
                        />
                    </a-form-model-item>

                    <!-- time -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'time'"
                        :key="item.order"
                    >
                        <a-time-picker
                            :default-value="item.value"
                            :disabled="true"
                        />
                    </a-form-model-item>

                    <!-- progress -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'progress'"
                        :key="item.order"
                    >
                        <a-progress :percent="99" status="active" />
                    </a-form-model-item>

                    <!-- image -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'images'"
                        :key="item.order"
                    >
                        <img class="videlStyle" :src="item.value" />
                    </a-form-model-item>

                    <!-- checkbox -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'checkbox'"
                        :key="item.order"
                    >
                        <a-checkbox-group v-model="item.value">
                            <template
                                v-for="(checkItem, checkIndex) in item.type"
                            >
                                <a-checkbox
                                    :value="checkItem"
                                    :key="checkIndex"
                                    :name="checkItem"
                                >
                                    {{ checkItem }}
                                </a-checkbox>
                            </template>
                        </a-checkbox-group>
                    </a-form-model-item>

                    <!-- radio -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'radio'"
                        :key="item.order"
                    >
                        <a-radio-group v-model="item.value" disabled>
                            <template
                                v-for="(selectItem, selectIndex) in item.type"
                            >
                                <a-radio :value="selectItem" :key="selectIndex">
                                    {{ selectItem }}
                                </a-radio>
                            </template>
                        </a-radio-group>
                    </a-form-model-item>

                    <!-- button -->
                    <a-form-model-item
                        :label="item.caption.cn"
                        v-else-if="item.component == 'button'"
                        :key="item.order"
                    >
                        <template v-for="(btn, btnIndex) in item.value">
                            <a-button
                                :key="btnIndex"
                                :style="
                                    'margin-right: 10px; background:' +
                                    btn[2] +
                                    ';'
                                "
                                @click="buttonEvent(btn[0], btn[1])"
                            >
                                {{ btn[0] }}
                            </a-button>
                        </template>
                    </a-form-model-item>
                </template></a-form-model
            ></template
        >

        <!-- 弹框内容 -->
        <a-modal
            :title="ModalTitle"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            okText="确定"
            cancelText="取消"
        >
            <p>{{ ModalText }}</p>
        </a-modal>
    </div>
</template>


<script>
import Hls from "hls.js";
import { get } from "@/utils/fetch.js";

export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            temData: [],

            // 弹框
            ModalTitle: "",
            ModalText: "",
            visible: false,
        };
    },
    props: ["tempData", "leftCaption"],
    created() {
        this.temData = this.tempData;
    },
    mounted() {
        this.getStream();
    },

    methods: {
        buttonEvent(name, url) {
            this.ModalTitle = name;
            get(url).then((res) => {
                if (res) {
                    this.visible = true;
                    this.ModalText = res;
                }
            });
        },
        openFile(value) {
            window.open(value);
        },
        handleOk(e) {
            this.visible = false;
        },
        handleCancel(e) {
            this.visible = false;
        },

        onPlayerPlay(player) {
            alert("play");
        },
        onPlayerPause(player) {
            alert("pause");
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
                    if (video) {
                        this.hls = new Hls();
                        var m3u8Url = decodeURIComponent(video.currentSrc);
                        this.hls.loadSource(m3u8Url);
                        this.hls.attachMedia(video);
                        this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
                            video.play();
                        });
                    }
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
.videlStyle {
    width: 720px;
    height: auto;
}
@media screen and (max-width: 1080px) {
    .videlStyle {
        width: 100%;
        height: auto;
    }
}
</style>