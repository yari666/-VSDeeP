<template>
    <div class="upload-device">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
            <a-form-item label="关键词">
                <a-input placeholder="请输入搜索关键词" />
            </a-form-item>

            <a-form-item label="标签">
                <a-select
                    mode="multiple"
                    placeholder="Please select"
                    :default-value="['a1', 'b2']"
                    @change="handleChange"
                    @popupScroll="popupScroll"
                >
                    <a-select-option
                        v-for="i in 25"
                        :key="(i + 9).toString(36) + i"
                    >
                        {{ (i + 9).toString(36) + i }}
                    </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="创建时间">
                <a-range-picker
                    style="width: 250px"
                    :show-time="{ format: 'HH:mm' }"
                    format="YYYY-MM-DD HH:mm"
                    :placeholder="['开始时间', '结束时间']"
                    @change="onChange"
                    @ok="onOk"
                />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-item>
        </a-form>

        <ul class="imgbox">
            <li
                v-for="(item, index) in resourceData"
                :key="index"
                @click="selectEvent(index)"
            >
                <img :src="item.imgUrl" />
                <a-icon
                    class="icon selected"
                    type="check-circle"
                    theme="twoTone"
                    :two-tone-color="item.selected ? '#52c41a' : '#ccc'"
                />
            </li>
        </ul>

        <div class="next">
            <a-button type="primary" size="large" class="btn"> 导入 </a-button>
            <a-button size="large" class="btn" style="margin-left: 10px">
                下一批
            </a-button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        let obj = {
            imgUrl:
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            selected: true,
        };

        return {
            form: {},
            resourceData: new Array(20).fill(obj),
        };
    },
    created() {
        console.log(this.resourceData);
        this.resourceData = JSON.parse(JSON.stringify(this.resourceData));
    },
    methods: {
        handleSubmit() {},
        handleChange(value) {
            console.log(`Selected: ${value}`);
        },
        popupScroll() {
            console.log("popupScroll");
        },
        selectEvent(index) {
            console.log(this.resourceData[index]);
            this.resourceData[index].selected = !this.resourceData[index]
                .selected;
        },
        onChange() {},
        onOk() {},
    },
};
</script>

<style lang="less" scoped>
ul.imgbox {
    overflow: hidden;
    margin-top: 20px;
    max-height: 50vh;
    overflow-y: scroll;
    li {
        float: left;
        width: 20%;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
        .icon {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 28px;
            &.selected {
                color: #52c41a;
            }
        }
    }
}

.next {
    text-align: center;
    .btn {
        padding: 0 40px;
    }
}
</style>