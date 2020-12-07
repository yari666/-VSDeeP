<template>
    <div class="detail main-content">
        <!-- <a-button icon="double-left">返回</a-button> -->

        <a-row class="row" :gutter="50">
            <a-col :span="24" v-if="leftData.length">
                <left-con
                    :tempData="leftData"
                    :leftCaption="leftCaption"
                ></left-con>
            </a-col>

            <a-col :span="0" v-if="rightData.length">
                <right-con></right-con>
            </a-col>
        </a-row>
    </div>
</template>

<style lang="less" scoped>
.row {
    margin-top: 20px;
    height: 100%;
}
</style>

<script>
import leftCon from "./left";
import rightCon from "./right";

import { get } from "@/utils/fetch.js";
import moment from "moment";

export default {
    components: { leftCon, rightCon },
    data() {
        return {
            id: null,
            leftData: [],
            leftCaption: {
                cn: "",
            },
            rightData: [],
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getDetail();
    },
    methods: {
        getDetail() {
            get(`http://api.feieee.com/api${this.$route.path}`).then((res) => {
                if (res && res.value) {
                    this.leftCaption.cn = res.caption.cn;

                    for (let i in res.value) {
                        if (
                            res.value[i].component == "time" ||
                            res.value[i].component == "date"
                        ) {
                            res.value[i].value = moment(
                                res.value[i].value
                            ).format("YYYY-MM-DD HH:mm:ss");
                        }
                        this.leftData.push(res.value[i]);
                    }
                    this.leftData = this.leftData.sort(
                        (a, b) => a.order - b.order
                    );
                }
            });
        },
    },
};
</script>