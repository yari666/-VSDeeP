<template>
    <div class="home">
        <div class="top">
            <map-con class="map"></map-con>
            <div class="title"><i class="icon"></i>设备分析</div>
            <div class="device online-device">
                <div class="title">在线设备</div>
                <h2>2533</h2>
                <online-device></online-device>
            </div>
            <div class="device offline-device">
                <div class="title">离线设备</div>
                <h2>8823</h2>
                <offline-device></offline-device>
            </div>
        </div>

        <div class="middle">
            <div class="title"><i class="icon"></i>数据分析</div>
            <a-row class="con" type="flex" justify="space-around">
                <a-col :span="4">
                    <dataset></dataset>
                    <span>数据源</span>
                    <h2>5100</h2></a-col
                >
                <a-col :span="4">
                    <datasource></datasource> <span>数据集</span>
                    <h2>7500</h2></a-col
                >
                <a-col :span="4">
                    <dataset-with-label></dataset-with-label
                    ><span>带标签数据源</span>
                    <h2 class="yellow">1560</h2>
                </a-col>
                <a-col :span="4">
                    <datasource-with-label></datasource-with-label
                    ><span>带标签数据集</span>
                    <h2 class="yellow">5600</h2>
                </a-col>
            </a-row>
        </div>

        <div class="bottom">
            <a-row class="con" type="flex" justify="space-between">
                <a-col :span="11"
                    ><div class="title">
                        <i class="icon"></i>发布任务<a class="fr">更多</a>
                    </div>
                    <task-arrange></task-arrange>
                </a-col>
                <a-col :span="11"
                    ><div class="title">
                        <i class="icon"></i>接收任务<a class="fr">更多</a>
                    </div>
                    <task-receive></task-receive>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import mapCon from "@/components/map";
import onlineDevice from "./onlinedevice";
import offlineDevice from "./offlinedevice";
import dataset from "./dataset";
import datasource from "./datasource";
import datasetWithLabel from "./datasetwithlabel";
import datasourceWithLabel from "./datasourcewithlabel";
import taskArrange from "./taskarrange";
import taskReceive from "./taskreceive";

export default {
    components: {
        mapCon,
        onlineDevice,
        offlineDevice,
        dataset,
        datasource,
        datasetWithLabel,
        datasourceWithLabel,
        taskArrange,
        taskReceive,
    },
};
</script>

<style lang="less" scoped>
.home {
    margin: 24px 16px 0;
    .title {
        font-size: 18px;
        .icon {
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-right: 8px;
            mask-image: url(../../assets/img/lefticon.svg);
        }
        .fr {
            font-size: 16px;
            color: #979797;
            text-decoration: underline;
        }
    }
}
.top {
    width: 100%;
    height: calc(~"58vh - 150px");
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
    .title {
        position: absolute;
        top: 15px;
        left: 20px;
        z-index: 10;
        .icon {
            background-color: #104d9c;
        }
    }
    .device {
        width: 280px;
        height: 320px;
        background: rgba(255, 255, 255, 0.78);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        position: absolute;
        bottom: 20px;
        h2 {
            float: right;
            margin: 10px 16px 0 0;
            font-size: 44px;
            font-weight: 700;
            color: #104d9c;
            font-family: "Haettenschweiler";
        }
        .title {
            font-size: 14px;
            position: absolute;
            top: 10px;
            left: 16px;
        }
        &.online-device {
            left: 20px;
        }
        &.offline-device {
            right: 20px;
            h2 {
                color: #5e5e5e;
            }
        }
    }
}

.middle {
    width: 100%;
    height: 20vh;
    overflow: hidden;
    background: #fff;
    padding: 15px 20px;
    margin-top: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
    position: relative;
    .icon {
        background-color: #ffb300;
    }
    .con {
        width: 100%;
    }
    h2 {
        position: absolute;
        top: -20px;
        left: 70%;
        font-size: 36px;
        font-weight: 700;
        color: #27a5de;
        font-family: "Haettenschweiler";
        &.yellow {
            color: #ffb913;
        }
    }
    span {
        font-size: 14px;
        position: absolute;
        top: -20px;
        left: 15%;
        color: #979797;
    }
}

.bottom {
    width: 100%;
    height: 22vh;
    overflow: hidden;
    background: #fff;
    padding: 15px 20px;
    margin-top: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
    .icon {
        background-color: #428ef1;
    }
}
</style>