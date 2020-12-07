<template>
    <div>
        <a-row
            class="main-content"
            style="min-height: auto; margin-bottom: 0px"
            v-if="searchList.length"
        >
            <a-col :span="18">
                <a-form layout="inline" @submit="getData">
                    <a-form-item label="项目名称">
                        <a-select
                            style="width: 300px"
                            @change="handleChange"
                            placeholder="请选择"
                        >
                            <a-select-option
                                v-for="i in searchList"
                                :key="i.id"
                                :value="i.id"
                            >
                                {{ i.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit"
                            >查询</a-button
                        >
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>

        <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="listData"
            class="main-content"
            style="cursor: pointer; margin-top: 2px"
        >
            <a-list-item
                slot="renderItem"
                key="item.record_id"
                slot-scope="item, index"
            >
                <span slot="actions">
                    <a-icon type="calendar" style="margin-right: 8px" />
                    {{ item.txt4 }}
                </span>

                <img
                    slot="extra"
                    width="230"
                    height="130"
                    alt="logo"
                    :src="item.img_url"
                    @click="toDetail(item.record_id)"
                />
                <a-list-item-meta :description="item.txt2">
                    <a
                        style="color: #1890ff"
                        slot="title"
                        @click="toDetail(item.record_id)"
                        >{{ item.txt1 }}</a
                    >
                    <a-avatar slot="avatar"
                        ><i
                            class="morningicon"
                            v-if="$route.meta.icon == 'morningicon'"
                        ></i
                        ><a-icon v-else :type="$route.meta.icon"
                    /></a-avatar>
                </a-list-item-meta>
                {{ item.txt3 }}
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { get } from "@/utils/fetch.js";

export default {
    data() {
        return {
            iconType: "car",
            listData: [],
            searchList: [],
            fisrtRequest: true,
            projectId: "",
            currentPage: 1,
            pagination: {
                onChange: (page) => {
                    console.log(page);
                    this.currentPage = page;
                    this.getData();
                },
                pageSize: 4,
                total: 0,
                showTotal: (total) => {
                    return `共 ${total} 条`;
                },
            },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        handleChange(id) {
            this.projectId = id;
        },
        getData() {
            // 车辆冲洗 http://api.feieee.com/api/truck_wash

            // 裸土覆盖 http://api.feieee.com/api/soil_cover

            // 临边喷淋 http://api.feieee.com/api/edge_spray

            // 安全帽识别 http://api.feieee.com/api/helmet

            // 电梯超员 http://api.feieee.com/api/person_count

            // 晨会交底 http://api.feieee.com/api/meeting

            // 在线设备 http://api.feieee.com/api/online

            // 离线设备 http://api.feieee.com/api/offline

            get(
                `http://api.feieee.com/api${this.$route.path}?page_index=${this.currentPage}&page_size=${this.pagination.pageSize}&projectid=${this.projectId}`
            ).then((res) => {
                if (res) {
                    this.listData = res.list;
                    this.pagination.total = res.total;

                    if (res.projectid_list && res.projectid_list.length) {
                        this.searchList = res.projectid_list;
                    }
                }
            });
        },
        toDetail(id) {
            this.$router.push({ path: this.$route.path + "/" + id });
        },
    },
};
</script>

<style lang="less" scoped>
.avatar {
    width: 50px;
    height: 50px;
    display: inline-block;
    background: url(../../assets/img/mao.svg) center no-repeat;
}
.morningicon {
    margin-left: 7px;
}
</style>
