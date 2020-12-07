<template>
    <div>
        <div class="tagsbox">
            <template v-for="tag in tags">
                <a-tooltip v-if="tag.length > 10" :key="tag" :title="tag">
                    <a-tag
                        :key="tag"
                        color="pink"
                        :closable="true"
                        @close="() => handleClose(tag)"
                    >
                        {{ `${tag.slice(0, 20)}...` }}
                    </a-tag>
                </a-tooltip>
                <a-tag
                    v-else
                    :key="tag"
                    color="blue"
                    :closable="true"
                    @close="() => handleClose(tag)"
                >
                    {{ tag }}
                </a-tag>
            </template>
        </div>
        <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
        />
        <a-tag
            v-else
            style="background: #fff; borderstyle: dashed"
            @click="showInput"
        >
            <a-icon type="plus" /> 添加标签
        </a-tag>
    </div>
</template>

<style lang="less" scoped>
.tagsbox {
    padding: 4px 11px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
}
</style>

<script>
export default {
    data() {
        return {
            tags: ["Unremovable", "Tag 2", "Tag 3Tag"],
            inputVisible: false,
            inputValue: "",
        };
    },
    methods: {
        handleClose(removedTag) {
            const tags = this.tags.filter((tag) => tag !== removedTag);
            console.log(tags);
            this.tags = tags;
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(function () {
                this.$refs.input.focus();
            });
        },

        handleInputChange(e) {
            this.inputValue = e.target.value;
        },

        handleInputConfirm() {
            const inputValue = this.inputValue;
            let tags = this.tags;
            if (inputValue && tags.indexOf(inputValue) === -1) {
                tags = [...tags, inputValue];
            }
            console.log(tags);
            Object.assign(this, {
                tags,
                inputVisible: false,
                inputValue: "",
            });
        },
    },
};
</script>
