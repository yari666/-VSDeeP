<template>
    <div class="left-container">
        <ul>
            <li>
                <i class="donut"></i>
            </li>
            <li>
                <i class="rect"></i>
            </li>
            <li>
                <a-icon type="highlight" />
                <!-- <i class="path"></i> -->
            </li>
            <li>
                <i class="color"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.left-container {
    ul {
        margin: 0;
        padding: 0;
        font-size: 0;
        li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            cursor: pointer;
            animation: 0.3s;
            &:hover {
                i {
                    &.anticon {
                        color: #ddd;
                    }
                    &.donut {
                        border-color: #ddd;
                    }
                    &.rect {
                        background-color: #ddd;
                    }
                }
            }
            i {
                display: block;
            }
        }
        .anticon {
            font-size: 24px;
            color: #999;
        }
        .donut {
            width: 24px;
            height: 24px;
            box-sizing: border-box;
            border-radius: 50%;
            border: 6px solid #999;
        }
        .rect {
            width: 24px;
            height: 14px;
            background-color: #999;
        }
        .color {
            width: 24px;
            height: 24px;
            border: 1px solid #ccc;
            background: red;
        }
        .path {
            width: 0;
            height: 0;
            border-right: 12px solid transparent;
            border-left: 12px solid transparent;
            border-bottom: 12px solid #999;
        }
    }
}
</style>