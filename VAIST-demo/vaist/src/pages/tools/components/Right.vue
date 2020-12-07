<template>
    <div class="right-container">
        <h3>Rectangle</h3>
        <ul>
            <li>
                <span>X</span>
                <input type="number" value="600" />
            </li>
            <li>
                <span>Y</span>
                <input type="number" value="600" />
            </li>
            <li>
                <span>X</span>
                <input type="number" value="600" />
            </li>
            <li>
                <span>X</span>
                <input type="number" value="600" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        classs: {
            type: String,
            default: "",
        },
        options: () => {
            return [];
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.right-container {
    padding: 0 10px 0 15px;
    color: #ccc;
    h3 {
        height: 30px;
        line-height: 30px;
        padding-bottom: 5px;
        color: #fff;
        margin: 0;
        font-size: 14px;
        font-weight: normal;
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
            flex-direction: column;
            width: 70px;
            height: 70px;
            margin: 0 5px 5px 0;
            box-sizing: border-box;
            padding: 5px 7px;
            cursor: pointer;
            background: #3f3f3c;
            border-radius: 3px;

            -webkit-font-smoothing: antialiased;
            span {
                display: block;
                line-height: 16px;
                font-size: 14px;
            }
            input[type="number"] {
                text-align: center;
                height: 30px;
                line-height: 30px;
                font-size: 24px;
                outline: none;
                border: none;
                margin-top: 5px;
                color: #4F80FF;
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
        }
    }
}
</style>