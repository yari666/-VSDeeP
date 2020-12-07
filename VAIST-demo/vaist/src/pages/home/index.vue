<template>
    <div class="home">
        <map-con class="map" :positionList="map"></map-con>
        <div class="con">
            <h4 class="project">共 {{ total }} 个工地项目</h4>
            <div class="tabs">
                <ul>
                    <li
                        :class="tabIndex == i ? 'active' : ''"
                        v-for="(el, i) in tab"
                        :key="i"
                        @click="changeTab(i)"
                    >
                        {{ el }}
                    </li>
                </ul>
            </div>

            <div class="dataset">
                <div class="title">{{ subtitle }}</div>
                <ul>
                    <li
                        :class="index < 3 ? 'bb' : ''"
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <span>{{ item.name }}</span
                        ><b>{{ item.value }}</b>
                    </li>
                </ul>
            </div>

            <div class="dangerdata">
                <div class="title">风险统计</div>
                <ul>
                    <li v-for="(item, index) in level" :key="index">
                        <span
                            :class="
                                index == 0
                                    ? 'danger'
                                    : index == 1
                                    ? 'warning'
                                    : index == 2
                                    ? 'offline'
                                    : index == 3
                                    ? 'online'
                                    : ''
                            "
                            >{{ item.name }}</span
                        ><b>{{ item.value }}</b>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import mapCon from "@/components/map";

import { get } from "@/utils/fetch.js";

export default {
    components: {
        mapCon,
    },
    data() {
        return {
            tab: ["今日", "本周", "月度", "季度", "年度"],
            tabIndex: 0,
            items: [],
            level: [],
            map: [],
            total: 0,
            subtitle: "",
            imgs: [
                "",
                "http://xhs.feieee.com/icon/icon1.png",
                "http://xhs.feieee.com/icon/icon2.png",
                "http://xhs.feieee.com/icon/icon3.png",
                "http://xhs.feieee.com/icon/icon4.png",
            ],
            timer: null,
        };
    },
    created() {
        this.getData();
        let _this = this;
    },
    mounted() {
        this.changeData();
    },
    beforeRouteLeave(to, from, next) {
        this.$destroy();
        next();
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        changeData() {
            // 定时器
            let _this = this;
            this.timer = setInterval(() => {
                setTimeout(function () {
                    _this.getData(); //清洗台帐
                }, 0);
            }, 20000);
        },
        getData() {
            get("http://api.feieee.com/api/index?date=" + this.tabIndex).then(
                (res) => {
                    if (res) {
                        res = JSON.parse(JSON.stringify(res));
                        // console.log(res);
                        this.items = res.items;
                        this.level = res.level;
                        this.total = res.total;
                        this.subtitle = res.sub_title;
                        let arr = [];
                        res.map.forEach((_) => {
                            arr.push({
                                lng: _.location.split(",")[0],
                                lat: _.location.split(",")[1],
                                name: _.name,
                                imgUrl: this.imgs[_.level],
                            });
                        });
                        this.map = arr;
                    }
                }
            );
        },
        changeTab(i) {
            this.tabIndex = i;
            this.getData();
        },
    },
};
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: calc(~"100vh - 100px");
    padding: 16px;
    box-sizing: border-box;

    .map {
        float: left;
        width: 70%;
        height: calc(~"100vh - 120px");
        border-radius: 10px;
    }
    .con {
        float: right;
        width: calc(~"30% - 16px");
        height: calc(~"100vh - 120px");
        margin-left: 16px;
        background: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 24px;
        overflow: hidden;
        h4.project {
            background-color: #f1f1f1;
            border: 1px solid #d9d9d9;
            line-height: 45px;
            height: 45px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            font-size: 18px;
            font-weight: 700;
        }
        .tabs {
            margin-top: 40px;
            overflow: hidden;
            li {
                width: calc(~"20% - 10px");
                line-height: 36px;
                height: 36px;
                margin: 0 5px;
                box-sizing: border-box;
                text-align: center;
                white-space: nowrap;
                cursor: pointer;
                border-radius: 4px;
                color: rgba(0, 0, 0, 0.65);
                background-color: #fff;
                border: 1px solid #d9d9d9;
                float: left;
                &.active {
                    color: #fff;
                    background-color: #1890ff;
                    border-color: #1890ff;
                }
            }
        }

        .title {
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 20px;
            &::before {
                content: "";
                width: 5px;
                height: 5px;
                border-radius: 5px;
                display: inline-block;
                vertical-align: 4px;
                margin-right: 10px;
                background: #666;
            }
        }
        .dataset {
            overflow: hidden;
            margin-top: 40px;
            li {
                float: left;
                width: 33.333333%;
                min-height: 100px;
                text-align: center;
                font-size: 26px;
                padding: 20px 0;
                border-right: 1px solid #d9d9d9;
                &:nth-child(3n) {
                    border-right: none;
                }
                &.br {
                    border-right: 1px solid #d9d9d9;
                }
                &.bb {
                    border-bottom: 1px solid #d9d9d9;
                }
                span {
                    display: block;
                    font-size: #333;
                    font-weight: 700;
                    font-size: 20px;
                    white-space: nowrap;
                }
                b {
                    color: #1890ff;
                }
            }
        }

        .dangerdata {
            margin-top: 40px;
            overflow: hidden;
            li {
                width: calc(~"25% - 16px");
                text-align: center;
                margin: 0 8px;
                box-sizing: border-box;
                float: left;
                span {
                    display: block;
                    width: 100%;
                    line-height: 40px;
                    height: 40px;
                    white-space: nowrap;
                    cursor: pointer;
                    border-radius: 4px;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    &.danger {
                        background: #d70a25;
                    }
                    &.warning {
                        background: #f39a35;
                    }
                    &.offline {
                        background: #8184fc;
                    }
                    &.online {
                        background: #1fbfbe;
                    }
                }
            }
        }
    }
}
</style>