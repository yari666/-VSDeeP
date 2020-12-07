<template>
    <div class="background-container">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <img :src="item.url" @load="imgLoad($event, item)" alt="" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            list: [],
        };
    },
    computed: {
        ...mapGetters(["image"]),
    },
    mounted() {
        this.getImageList();
    },
    methods: {
        ...mapMutations({
            selcetedImage: "TOOL_SELECT_IMAGE",
            selcetedElement: "TOOL_SELECT_ELEMENT",
        }),
        //选择图片
        selected(item) {
            this.selcetedImage(item);
            this.selcetedElement(this.image);
        },
        //图片加载
        imgLoad({ currentTarget = {} }, item) {
            let {
                offsetWidth: width,
                offsetHeight: height,
                offsetLeft: X,
                offsetTop: Y,
            } = currentTarget;
            Object.assign(item, { width, height });
            Object.assign(item.styles, { X, Y });
        },
        //获取图片
        getImageList() {
            let list = [
                {
                    id: 1,
                    type: "Image",
                    url: "http://hb.xhs-sz.com/img/img-top-bg-szyq-1.png",
                    width: 0,
                    height: 0,
                    styles: {
                        X: 0,
                        Y: 0,
                        Scale: 1,
                    },
                },
                {
                    id: 2,
                    type: "Image",
                    url: "http://hb.xhs-sz.com/img/img-top-bg-szyq-3.png",
                    width: 0,
                    height: 0,
                    styles: {
                        X: 0,
                        Y: 0,
                        Scale: 1,
                    },
                },
                {
                    id: 3,
                    type: "Image",
                    url: "http://hb.xhs-sz.com/img/img-top-bg-szyq-2.png",
                    width: 0,
                    height: 0,
                    styles: {
                        X: 0,
                        Y: 0,
                        Scale: 1,
                    },
                },
            ];
            this.list.push(...list);
            this.selected(list[0]);
        },
    },
};
</script>

<style lang="less" scoped>
.background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px 175px 10px 50px;
    box-sizing: border-box;
    overflow: hidden;
    z-index: -1000;
    ul {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
}
</style>