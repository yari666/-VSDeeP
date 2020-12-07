<template>
    <div class="user main-content">
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="我添加的成员">
                <my-user></my-user>
            </a-tab-pane>
            <a-tab-pane key="2" tab="添加我的成员" force-render>
                <my-owner></my-owner>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import myUser from "./users/index";
import myOwner from "./owner/index";

import { get } from "@/utils/fetch.js";

export default {
    data() {
        return {};
    },
    components: { myUser, myOwner },
};
</script>
