<template>
    <div
        class="canvas-container"
        @mousewheel.ctrl.exact.prevent="mousewheel"
        @DOMMouseScroll.ctrl.exact.prevent="mousewheel"
        @mousedown.stop="mousedown"
        @mouseup.stop="mouseup"
        @mousemove.stop="mousemove"
        @click="selectedElement(image)"
    >
        <!-- svg容器 -->
        <svg
            class="svg-background"
            :transform="'scale(' + image.styles.Scale + ')'"
            xlinkns="http://www.w3.org/1999/xlink"
        >
            <!-- 图片背景容器 -->
            <svg
                ref="svgImage"
                @click.stop.prevent="mouseclick($event, image)"
                @mousedown.stop="mousedown"
                @mouseup.stop="mouseup"
                @mousemove.stop="mousemove"
                :width="image.width"
                :height="image.height"
                :x="image.styles.X"
                :y="image.styles.Y"
                overflow="hidden"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                :viewBox="imgViewBox"
            >
                <!-- 背景图 -->
                <g>
                    <image
                        x="0"
                        y="0"
                        :width="image.width"
                        :height="image.height"
                        :xlink:href="image.url"
                    ></image>
                </g>
                <!-- 圆形容器 -->
                <g>
                    <circle
                        v-for="(item, index) in circleList"
                        :key="index"
                        :cx="item.styles.X"
                        :cy="item.styles.Y"
                        :r="item.radius"
                        :fill="item.fill"
                        stroke="#fff"
                        :transform="item.translate"
                        :stroke-width="element.id === item.id ? '2' : '0'"
                        @click.stop="selectedElement(item)"
                    />
                </g>
                <g>
                    <rect
                        v-for="(item, index) in rectList"
                        @click.stop="selectedElement(item)"
                        :key="index"
                        :x="item.styles.X"
                        :y="item.styles.Y"
                        :width="item.styles.Width"
                        :height="item.styles.Height"
                        :transform="item.translate"
                        :stroke-width="item.StrokeWidth"
                        :stroke="item.Stroke"
                        :fill="item.Stroke"
                        fill-opacity="0.3"
                    ></rect>
                </g>
                <g v-if="rect">
                    <rect
                        :x="rect.styles.X"
                        :y="rect.styles.Y"
                        :width="rect.styles.Width"
                        :height="rect.styles.Height"
                        :transform="rect.translate"
                        :stroke-width="rect.StrokeWidth"
                        :stroke="rect.Stroke"
                        :fill="rect.Stroke"
                        fill-opacity="0.3"
                    />
                </g>
                <g v-if="squares.length">
                    <rect
                        v-for="(item, index) in squares"
                        @mousedown.stop="mousedown($event, index + 1)"
                        @mouseup.stop="mouseup($event, index + 1)"
                        @mousemove.stop="mousemove($event, index + 1)"
                        :key="index"
                        :x="item.X"
                        :y="item.Y"
                        :width="item.Width"
                        :height="item.Height"
                        :transform="item.translate"
                        :style="item.styles"
                        :stroke-width="item.StrokeWidth"
                        :stroke="item.Stroke"
                        :fill="item.Stroke"
                        fill-opacity="0.01"
                    />
                </g>
            </svg>
        </svg>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { throttle } from "@/utils";
export default {
    components: {},
    props: {},
    data() {
        return {
            elementList: [],
            circleList: [],
            rectList: [],
            coords: null, //创建初始鼠标点状态
            rect: null, //矩形绘制模板
        };
    },
    computed: {
        ...mapGetters(["toolType", "mould", "element", "image"]),
        //图片窗口样式
        imgViewBox() {
            return `0 0 ${this.image.width} ${this.image.height}`;
        },
        //相对偏移
        translate() {
            return `translate(-${this.image.styles.X},-${this.image.styles.Y})`;
        },
        //九宫格
        squares() {
            return this.drawSquares(this.element);
        },
    },
    mounted() {
        this.initEvent();
    },
    methods: {
        ...mapMutations({
            selected: "TOOL_SELECT_ELEMENT",
            setValues: "TOOL_SET_VALUES",
        }),
        //事件注册
        initEvent() {
            //键盘方向监听
            document.addEventListener("keydown", this.keydown);
        },
        //鼠标滚动 + ctrl
        mousewheel(el) {
            //图片缩放
            this.zoom(el);
        },
        //鼠标按下
        mousedown(el, index) {
            //设置鼠标相对图片边界距离坐标
            this.createCoords(el, index);
        },
        //鼠标弹起
        mouseup(el) {
            if (this.toolType == "draw") {
                let type = this.mould.type;
                let { index } = this.coords;
                if (type == "Rectangle") {
                    if (index > 0) {
                    } else {
                        this.createRect();
                    }
                }
            }
            this.coords = null; //置空坐标
            this.rect = null; //置空矩形模板
        },
        //鼠标移动
        mousemove(el) {
            if (!this.coords) return;
            throttle(() => {
                if (this.toolType == "select") {
                    let type = this.element.type;
                    //拖动图片
                    if (type == "Image") {
                        this.drag(el);
                    }
                } else {
                    let { index } = this.coords;
                    let type = this.mould.type;
                    if (type == "Circle") {
                        //拖动圆形
                        this.drag(el);
                    } else if (type == "Rectangle") {
                        if (index > 0) {
                            //拖动九宫格
                            this.drag(el, index);
                        } else {
                            //矩形模板实时绘制
                            this.drawRect(el);
                        }
                    }
                }
            }, 200)();
        },
        //鼠标点击
        mouseclick(el, item) {
            let type = this.mould.type;
            if (this.toolType == "draw") {
                if (type == "Circle") {
                    this.createCircle(el);
                }
            }
        },
        //键盘按下事件
        keydown(el) {
            let { keyCode, ctrlKey } = el;
            let { X, Y } = this.element.styles;
            //方向
            if ([37, 38, 39, 40].includes(keyCode)) {
                this.direction({ keyCode, X, Y });
            } else if ([90].includes(keyCode) && ctrlKey) {
                this.revoke();
            }
        },
        selectedElement(item) {
            this.selected(item);
        },
        //创建初始鼠标点状态
        createCoords(el, index) {
            if (!this.coords) {
                let { offsetX, offsetY } = el;
                let { styles } = this.element;
                this.coords = {
                    index,
                    X: offsetX,
                    Y: offsetY,
                    elementStyles: Object.assign({}, styles),
                };
            }
        },
        //创建圆形
        createCircle(el) {
            let { offsetX, offsetY } = el;
            let { type, styles } = this.mould; //形状模板
            let id = this.circleList.length;
            this.circleList.push({
                id,
                type,
                radius: styles.Radius,
                fill: styles.Fill,
                stroke: styles.Stroke,
                translate: this.translate,
                styles: { X: offsetX, Y: offsetY },
            });
            this.selectedElement(this.circleList[id]);
        },
        //创建矩形
        createRect() {
            if (!this.rect) return;
            let { type, Stroke, StrokeWidth, styles } = this.rect || {};
            let id = this.rectList.length;
            this.rectList.push({
                id,
                type,
                Stroke,
                StrokeWidth,
                translate: this.translate,
                styles: Object.assign({}, styles),
            });
            this.selectedElement(this.rectList[id]);
        },
        //绘制矩形
        drawRect(el) {
            let { offsetX, offsetY } = el; //相对svg容器-鼠标的坐标
            let { X, Y } = this.coords || {};
            let { type, styles } = this.mould; //形状模板
            let Width = Math.abs(offsetX - X);
            let Height = Math.abs(offsetY - Y);
            //宽高大于5才允许绘制
            if (Width > 1 && Height > 1) {
                X = X > offsetX ? X - Width : X;
                Y = Y > offsetY ? Y - Height : Y;
                this.rect = {
                    type,
                    Stroke: styles.Stroke,
                    StrokeWidth: styles.StrokeWidth,
                    translate: this.translate,
                    styles: { X, Y, Width, Height },
                };
            }
        },
        //转换成九宫格
        drawSquares(element) {
            let { X, Y, Width, Height } = element.styles || {};
            if (!Width || !Height) return [];
            let w = +(Width / 3).toFixed(4);
            let h = +(Height / 3).toFixed(4);
            let newArr = [];
            for (let i = 0; i < 9; i++) {
                let x, y, cursor;
                if (i == 0) {
                    x = X;
                    y = Y;
                    cursor = "nw-resize";
                } else if (i == 1) {
                    x = X + w;
                    y = Y;
                    cursor = "n-resize";
                } else if (i == 2) {
                    x = X + w * 2;
                    y = Y;
                    cursor = "ne-resize";
                } else if (i == 3) {
                    x = X;
                    y = Y + h;
                    cursor = "w-resize";
                } else if (i == 4) {
                    x = X + w;
                    y = Y + h;
                    cursor = "move";
                } else if (i == 5) {
                    x = X + w * 2;
                    y = Y + h;
                    cursor = "e-resize";
                } else if (i == 6) {
                    x = X;
                    y = Y + h * 2;
                    cursor = "sw-resize";
                } else if (i == 7) {
                    x = X + w;
                    y = Y + h * 2;
                    cursor = "s-resize";
                } else if (i == 8) {
                    x = X + w * 2;
                    y = Y + h * 2;
                    cursor = "se-resize";
                } else {
                    cursor = "default";
                }
                newArr.push({
                    X: x,
                    Y: y,
                    Width: w,
                    Height: h,
                    Stroke: element.Stroke,
                    StrokeWidth: element.StrokeWidth,
                    translate: this.translate,
                    styles: { cursor },
                });
            }
            return newArr;
        },
        //缩放
        zoom(el) {
            let { deltaY } = el;
            let { Scale } = this.image.styles;
            let num = deltaY < 0 ? 0.1 : -0.1;
            let value = +(Scale + num).toFixed(1);
            value = value <= 0.1 || value > 10 ? Scale : value;
            this.setValues({
                el: "image",
                attr: { Scale: value },
            });
        },
        //拖动
        drag(el, index) {
            let { offsetX, offsetY } = el;
            let { type } = this.element;
            let { X: mX, Y: mY, elementStyles } = this.coords;
            let { X, Y, Width, Height } = elementStyles || {};
            let diffX = offsetX - mX;
            let diffY = offsetY - mY;
            if (type == "Image") {
                this.setValues({
                    el: "image",
                    attr: {
                        X: X + diffX,
                        Y: Y + diffY,
                    },
                });
            } else if (type == "Circle") {
                this.setValues({
                    el: "element",
                    attr: {
                        X: X + diffX,
                        Y: Y + diffY,
                    },
                });
            } else if (type == "Rectangle") {
                let _X = X,
                    _Y = Y,
                    _Width = Width,
                    _Heigtht = Height;
                if (index === 1) {
                    _X = X + diffX;
                    _Y = Y + diffY;
                    _Width = Width - diffX;
                    _Heigtht = Height - diffY;
                } else if (index === 2) {
                    _Y = Y + diffY;
                    _Heigtht = Height - diffY;
                } else if (index === 3) {
                    _Y = Y + diffY;
                    _Width = Width + diffX;
                    _Heigtht = Height - diffY;
                } else if (index === 4) {
                    _X = X + diffX;
                    _Width = Width - diffX;
                } else if (index === 5) {
                    _X = X + diffX;
                    _Y = Y + diffY;
                } else if (index === 6) {
                    _Width = Width + diffX;
                } else if (index === 7) {
                    _X = X + diffX;
                    _Width = Width - diffX;
                    _Heigtht = Height + diffY;
                } else if (index === 8) {
                    _Heigtht = Height + diffY;
                } else if (index === 9) {
                    _Width = Width + diffX;
                    _Heigtht = Height + diffY;
                }
                this.setValues({
                    el: "element",
                    attr: {
                        X: _X,
                        Y: _Y,
                        Width: Math.abs(_Width),
                        Height: Math.abs(_Heigtht),
                    },
                });
            }
        },
        //方向
        direction({ keyCode, X, Y }) {
            let key, value;
            if (keyCode == 37) {
                //向左
                key = "X";
                value = X - 1;
            } else if (keyCode == 38) {
                //向上
                key = "Y";
                value = Y - 1;
            } else if (keyCode == 39) {
                //向右
                key = "X";
                value = X + 1;
            } else if (keyCode == 40) {
                //向下
                key = "Y";
                value = Y + 1;
            }
            this.setValues({ el: "element", attr: { [key]: value } });
        },
        //撤销
        revoke() {
            let type = this.mould.type;
            let item,
                array = [];
            if (type == "Circle") {
                array = this.circleList;
            } else if (type == "Rectangle") {
                array = this.rectList;
            }
            array.pop();
            if (array.length) {
                item = array[array.length - 1];
            } else {
                item = this.image;
            }
            this.selectedElement(item);
        },
    },
};
</script>

<style lang="less" scoped>
.canvas-container {
    flex: 1;
    display: flex;
    position: relative;
    height: 100%;
    background-color: #3f3f3f;
    overflow: hidden;
    .svg-background {
        flex: 1;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #3f3f3f;
        transition: 0.3s;
        svg {
            z-index: 100;
        }
        circle {
            cursor: pointer;
        }
        image {
            transition: 0.3s;
        }
    }
}
</style>