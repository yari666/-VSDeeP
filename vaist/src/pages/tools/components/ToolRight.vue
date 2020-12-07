<template>
    <div class="right-container">
        <!-- 当前选中的对象 -->
        <div class="element">
            <h3>{{ element.type }}</h3>
            <ul>
                <li
                    v-for="(value, key, index) in element.styles"
                    :key="index"
                    @mousewheel.prevent="mouseWheel($event, 'element', key)"
                    @DOMMouseScroll.prevent="mouseWheel($event, 'element', key)"
                >
                    <span :title="key">{{ key }}</span>
                    <input
                        type="number"
                        :value="value"
                        @change="inputChange($event, 'element', key)"
                    />
                </li>
            </ul>
        </div>
        <!-- 模具 -->
        <div class="mould">
            <div v-if="key" class="colour">
                <h3>Select Color</h3>
                <a-tooltip v-for="(item, index) in colorList" :key="index">
                    <template slot="title">
                        {{ item.key }}
                    </template>
                    <a-tag
                        :color="item.color"
                        @click="selectedColor(item.color)"
                    >
                        <a-icon
                            type="check"
                            v-if="item.color === mould.styles[key]"
                        ></a-icon>
                    </a-tag>
                </a-tooltip>
            </div>
            <h3>Setting {{ mould.type }}</h3>
            <ul>
                <li
                    v-for="(value, key, index) in mould.styles"
                    :key="index"
                    @mousewheel.prevent="mouseWheel($event, 'mould', key)"
                    @DOMMouseScroll.prevent="mouseWheel($event, 'mould', key)"
                >
                    <span :title="key">{{ key }}</span>
                    <div v-if="['Fill', 'Stroke'].includes(key)">
                        <i
                            @click="selectedKey(key)"
                            :style="{ backgroundColor: value }"
                            class="color"
                        ></i>
                    </div>
                    <div v-else>
                        <input
                            v-if="key"
                            type="number"
                            :value="value"
                            @change="inputChange($event, 'mould', key)"
                        />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { throttle } from "@/utils";
export default {
    props: {},
    data() {
        return {
            colorList: [],
            key: "",
        };
    },
    computed: {
        ...mapGetters(["element", "mould"]),
    },
    mounted() {
        this.colorList = this.getColor();
        this.initEvent();
    },
    methods: {
        ...mapMutations({
            setValues: "TOOL_SET_VALUES",
        }),
        initEvent() {},
        //输入框变化
        inputChange({ target = {} }, el, key) {
            let value = this.inputCalc(target, this[el], key);
            this.setValues({ el, attr: { [key]: value } });
            target.value = value;
        },
        //输入框计算
        inputCalc({ value }, el, key) {
            let sum = el.styles[key] || 0;
            return this.checkSum(key, +value) ? sum : value;
        },
        //鼠标滚动
        mouseWheel({ deltaY }, el, key) {
            throttle(() => {
                if (!["Fill", "Stroke"].includes(key)) {
                    let value = this.mouseCalc(deltaY, this[el], key);
                    this.setValues({ el, attr: { [key]: value } });
                }
            }, 200)();
        },
        //鼠标滚动计算
        mouseCalc(deltaY, el, key) {
            let sum = el.styles[key] || 0;
            let num = 0;
            if (key == "Scale") {
                num = deltaY < 0 ? 0.1 : -0.1;
            } else if (["X", "Y".includes(key)]) {
                num = deltaY < 0 ? 1 : -1;
            }
            let value = +(sum + num).toFixed(1);
            return this.checkSum(key, value) ? sum : value;
        },
        //检查数字范围
        checkSum(key, sum) {
            if (key == "Scale") {
                return sum <= 0.1 || sum > 10;
            } else if (["X", "Y".includes(key)]) {
                return sum <= 0;
            }
        },
        //选择颜色属性
        selectedKey(value) {
            this.key = value;
        },
        //选择颜色
        selectedColor(value) {
            this.setValues({ el: "mould", attr: { [this.key]: value } });
            this.key = "";
        },
        //获取颜色列表
        getColor() {
            return [
                {
                    key: "薄暮",
                    color: "#F5222D",
                },
                {
                    key: "火山",
                    color: "#FA541C",
                },
                {
                    key: "日暮",
                    color: "#FAAD14",
                },
                {
                    key: "明青",
                    color: "#13C2C2",
                },
                {
                    key: "极光绿",
                    color: "#52C41A",
                },
                {
                    key: "拂晓蓝",
                    color: "#1890FF",
                },
                {
                    key: "极客蓝",
                    color: "#2F54EB",
                },
                {
                    key: "酱紫",
                    color: "#722ED1",
                },
            ];
        },
    },
};
</script>

<style lang="less" scoped>
.right-container {
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px 15px;
    color: #ccc;
    & > div {
        &:first-child {
            flex: 1;
        }
        h3 {
            height: 30px;
            line-height: 30px;
            padding-bottom: 5px;
            color: #fff;
            margin: 0;
            font-size: 14px;
            font-weight: normal;
        }
    }

    ul {
        width: 150px;
        margin: 0;
        padding: 0;
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        li {
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            width: 70px;
            height: 70px;
            padding: 5px;
            margin: 0 5px 5px 0;
            border-radius: 3px;
            box-sizing: border-box;
            background: #3f3f3c;
            -webkit-font-smoothing: antialiased;
            & > div {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
            span {
                position: absolute;
                top: 5px;
                left: 7px;
                display: block;
                width: 65px;
                line-height: 16px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            input[type="number"] {
                text-align: center;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 24px;
                outline: none;
                border: none;
                margin-top: 15px;
                color: #4f80ff;
                background: #3f3f3c;
                cursor: pointer;
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
                &:focus {
                    background: #333;
                    cursor: auto;
                }
                -moz-appearance: textfield;
            }
            .color {
                display: block;
                margin-top: 15px;
                width: 24px;
                height: 24px;
                border: 1px solid #ccc;
                background: red;
            }
        }
    }

    .colour {
        width: 150px;
        overflow: hidden;
        transition: 0.5s;
        span {
            width: 20px;
            height: 20px;
            border-radius: 2px;
            float: left;
            cursor: pointer;
            margin: 8px 8px 0 0;
            padding-left: 0px;
            padding-right: 0px;
            text-align: center;
            color: #fff;
            font-weight: 700;
        }
        i {
            font-size: 14px;
        }
    }
}
</style>