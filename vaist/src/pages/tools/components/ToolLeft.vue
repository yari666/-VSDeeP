<template>
    <div class="left-container">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <span>{{ item.title }}</span>
                <div>
                    <span
                        class="node"
                        v-for="(node, idx) in item.nodes"
                        :key="idx"
                    >
                        {{ node.title }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.list = this.getclasses();
    },
    methods: {
        //分类
        getclasses() {
            return [
                {
                    key: "one",
                    title: "one",
                    nodes: [
                        {
                            key: "one-1",
                            title: "图片1",
                        },
                        {
                            key: "one-2",
                            title: "图片2",
                        },
                    ],
                },
                {
                    key: "two",
                    title: "two",
                    nodes: [
                        {
                            key: "two-1",
                            title: "图片1",
                        },
                        {
                            key: "two-2",
                            title: "图片2",
                        },
                        {
                            key: "two-3",
                            title: "图片2",
                        },
                    ],
                },
                {
                    key: "three",
                    title: "three",
                    nodes: [
                        {
                            key: "three-1",
                            title: "图片1",
                        },
                        {
                            key: "three-2",
                            title: "图片2",
                        },
                        {
                            key: "three-3",
                            title: "图片3",
                        },
                    ],
                },
            ];
        },
    },
};
</script>

<style lang="less" scoped>
.left-container {
    width: 150px;
    ul {
        padding: 10px;
        li {
            color: #fff;
            span {
                display: block;
            }
            .node {
                margin-left: 10px;
            }
        }
    }
    // ul {
    //     margin: 0;
    //     padding: 0;
    //     font-size: 0;
    //     li {
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         width: 50px;
    //         height: 50px;
    //         cursor: pointer;
    //         animation: 0.3s;
    //         &:hover {
    //             i {
    //                 &.anticon {
    //                     color: #ddd;
    //                 }
    //                 &.donut {
    //                     border-color: #ddd;
    //                 }
    //                 &.rect {
    //                     background-color: #ddd;
    //                 }
    //             }
    //         }
    //         i {
    //             display: block;
    //         }
    //     }
    //     .anticon {
    //         font-size: 24px;
    //         color: #999;
    //     }
    //     .donut {
    //         width: 24px;
    //         height: 24px;
    //         box-sizing: border-box;
    //         border-radius: 50%;
    //         border: 6px solid #999;
    //     }
    //     .rect {
    //         width: 24px;
    //         height: 14px;
    //         background-color: #999;
    //     }
    //     .color {
    //         width: 24px;
    //         height: 24px;
    //         border: 1px solid #ccc;
    //         background: red;
    //     }
    //     .path {
    //         width: 0;
    //         height: 0;
    //         border-right: 12px solid transparent;
    //         border-left: 12px solid transparent;
    //         border-bottom: 12px solid #999;
    //     }
    // }
}
</style>