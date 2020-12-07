<template>
    <a-carousel :dots="false" arrows>
        <div
            v-if="0"
            slot="prevArrow"
            slot-scope="props"
            class="custom-slick-arrow arrow-left"
        >
            <a-icon type="left-circle" />
        </div>
        <div
            v-if="0"
            slot="nextArrow"
            slot-scope="props"
            class="custom-slick-arrow arrow-right"
        >
            <a-icon type="right-circle" />
        </div>
        <div class="img-item">
            <a-row type="flex" justify="space-around" align="middle">
                <a-col :span="4" v-for="(item, index) in imgUrl" :key="index">
                    <img :src="item" />
                </a-col>
            </a-row>
        </div>
        <div class="img-item">
            <a-row type="flex" justify="space-around" align="middle">
                <a-col :span="4" v-for="(item, index) in imgUrl" :key="index">
                    <img :src="item" />
                </a-col>
            </a-row>
        </div>
        <div class="img-item">
            <a-row type="flex" justify="space-around" align="middle">
                <a-col :span="4" v-for="(item, index) in imgUrl" :key="index">
                    <img :src="item" />
                </a-col>
            </a-row>
        </div>
        <div class="img-item">
            <a-row type="flex" justify="space-around" align="middle">
                <a-col :span="4" v-for="(item, index) in imgUrl" :key="index">
                    <img :src="item" />
                </a-col>
            </a-row>
        </div>
    </a-carousel>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: [
                "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
                "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
                "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
                "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
                "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
            ],
        };
    },
};
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
    text-align: center;
    overflow: hidden;
    padding: 0 20px;
}

.ant-carousel >>> .custom-slick-arrow {
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: #ccc;
    background-color: transparent;
    z-index: 99;
}

.ant-carousel >>> .custom-slick-arrow:before {
    display: none;
}
.ant-carousel >>> .img-item {
    height: 100%;
}
.ant-carousel >>> .img-item img {
    width: 100%;
    height: 100%;
}
</style>