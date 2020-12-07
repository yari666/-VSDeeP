<template>
    <div class="header-container">
        <ul>
            <li>
                <span class="title">编辑</span>
                <div class="list">
                    <p>
                        <span>Undo</span>
                        <span>Ctrl+Z</span>
                    </p>
                    <p>
                        <span>Redo</span>
                        <span>Ctrl+Y</span>
                    </p>
                </div>
            </li>
            <li>
                <span class="title">对象</span>
                <div class="list">
                    <p>
                        <span>Undo</span>
                        <span>Ctrl+Z</span>
                    </p>
                    <p>
                        <span>Redo</span>
                        <span>Ctrl+Y</span>
                    </p>
                </div>
            </li>
            <li>
                <span class="title">预览</span>
                <div class="list">
                    <p>
                        <span>Undo</span>
                        <span>Ctrl+Z</span>
                    </p>
                    <p>
                        <span>Redo</span>
                        <span>Ctrl+Y</span>
                    </p>
                </div>
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
.header-container {
    ul {
        margin: 0;
        padding: 0;
        padding-left: 50px;
        font-size: 0;
        li {
            position: relative;
            display: inline-block;
            line-height: 30px;
            height: 30px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            &:hover {
                color: #333;
                .title,
                .list {
                    display: inline-block;
                    background-color: #fff;
                }
            }
        }
        .title {
            position: relative;
            display: inline-block;
            padding: 0 15px;
            z-index: 1000;
        }
        .list {
            display: none;
            position: absolute;
            top: 30px;
            left: 0;
            padding: 7px 0;
            line-height: normal;
            border-radius: 0 3px 3px 3px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
            p {
                display: flex;
                align-items: center;
                width: 155px;
                padding: 6px 10px 6px 25px;
                margin: 0;
                box-sizing: border-box;
                span {
                    display: block;
                    font-size: 13px;
                    line-height: 20px;
                    &:first-child {
                        flex: 1;
                    }
                    &:last-child {
                        flex: none;
                        padding: 0 5px;
                        background: rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
}
</style>