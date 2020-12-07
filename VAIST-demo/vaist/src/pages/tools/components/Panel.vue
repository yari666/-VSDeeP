<template>
    <div class="panel-container">
        <div class="photo-background">
            <img src="@/assets/img/draw/draw.jpg" alt="" />
        </div>
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
.panel-container {
    flex: 1;
    background-color: #3f3f3f;
    .photo-background {
        display: inline-block;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>