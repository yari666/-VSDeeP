<template>
    <div class="login">
        <div class="main">
            <p class="logo"></p>

            <div class="formbox">
                <ul class="tab">
                    <li
                        v-for="(item, index) in tab"
                        :key="index"
                        :class="index == tabIndex ? 'active' : ''"
                        @click="tabChange(index)"
                    >
                        <span>{{ item }}</span>
                    </li>
                </ul>

                <!-- 登录 -->
                <div v-if="tabIndex == 0">
                    <a-form-model
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-form-model-item ref="mobile" prop="mobile">
                            <a-input
                                v-model="form.mobile"
                                @blur="
                                    () => {
                                        $refs.mobile.onFieldBlur();
                                    }
                                "
                                placeholder="请输入手机号"
                                size="large"
                            >
                                <a-icon slot="prefix" type="mobile" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item ref="password" prop="password">
                            <a-input
                                v-model="form.password"
                                @blur="
                                    () => {
                                        $refs.password.onFieldBlur();
                                    }
                                "
                                placeholder="请输入密码"
                                size="large"
                            >
                                <a-icon slot="prefix" type="lock" />
                            </a-input>
                        </a-form-model-item>
                        <!-- 
                        <a-form-model-item
                            ref="verificationCode"
                            prop="verificationCode"
                        >
                            <a-row :gutter="8">
                                <a-col :span="14">
                                    <a-input
                                        ref="verificationCode"
                                        v-model="form.verificationCode"
                                        placeholder="请输入验证码"
                                        size="large"
                                        @blur="
                                            () => {
                                                $refs.verificationCode.onFieldBlur();
                                            }
                                        "
                                    >
                                        <a-icon
                                            slot="prefix"
                                            type="safety-certificate"
                                        />
                                    </a-input>
                                </a-col>
                                <a-col :span="10">
                                    <a-button
                                        type="primary"
                                        size="large"
                                        @click="getVerCode('form')"
                                        >获取验证码</a-button
                                    >
                                </a-col>
                            </a-row>
                        </a-form-model-item> -->

                        <a-form-model-item>
                            <a-button
                                type="primary"
                                size="large"
                                @click="onSubmit"
                            >
                                登录
                            </a-button>
                            <div class="forget">忘记密码?</div>
                        </a-form-model-item>
                    </a-form-model>
                </div>

                <!-- 注册 -->

                <div v-if="tabIndex == 1">
                    <a-form-model
                        ref="ruleFormRegin"
                        :model="reginForm"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-form-model-item ref="name" prop="name">
                            <a-input
                                v-model="reginForm.name"
                                @blur="
                                    () => {
                                        $refs.name.onFieldBlur();
                                    }
                                "
                                placeholder="请输入用户名"
                                size="large"
                            >
                                <a-icon slot="prefix" type="user" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item ref="mobile" prop="mobile">
                            <a-input
                                v-model="reginForm.mobile"
                                @blur="
                                    () => {
                                        $refs.mobile.onFieldBlur();
                                    }
                                "
                                placeholder="请输入手机号"
                                size="large"
                            >
                                <a-icon slot="prefix" type="mobile" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item ref="password" prop="password">
                            <a-input
                                v-model="reginForm.password"
                                @blur="
                                    () => {
                                        $refs.password.onFieldBlur();
                                    }
                                "
                                placeholder="请输入密码"
                                size="large"
                            >
                                <a-icon slot="prefix" type="lock" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item
                            ref="verificationCode"
                            prop="verificationCode"
                        >
                            <a-row :gutter="8">
                                <a-col :span="14">
                                    <a-input
                                        v-model="reginForm.verificationCode"
                                        placeholder="请输入验证码"
                                        size="large"
                                        @blur="
                                            () => {
                                                $refs.verificationCode.onFieldBlur();
                                            }
                                        "
                                    >
                                        <a-icon
                                            slot="prefix"
                                            type="safety-certificate"
                                        />
                                    </a-input>
                                </a-col>
                                <a-col :span="10">
                                    <a-button
                                        type="primary"
                                        size="large"
                                        @click="getVerCode('reginForm')"
                                        >获取验证码</a-button
                                    >
                                </a-col>
                            </a-row>
                        </a-form-model-item>

                        <a-form-model-item prop="desc">
                            <a-input
                                v-model="reginForm.desc"
                                type="textarea"
                                placeholder="随便输点儿什么"
                            >
                                <a-icon slot="prefix" type="edit" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item>
                            <a-button
                                type="primary"
                                size="large"
                                @click="onSubmitRegin"
                            >
                                注册
                            </a-button>
                            <a-button
                                style="margin-left: 10px"
                                size="large"
                                @click="resetForm"
                            >
                                重置
                            </a-button>
                        </a-form-model-item>
                    </a-form-model>
                </div>
            </div>
        </div>

        <div class="copyright">Copyright ©2020 沪ICP备133311451号-6</div>
    </div>
</template>

<script>
import { post } from "@/utils/fetch.js";
const shajs = require("sha.js");
let Base64 = require("js-base64").Base64;

export default {
    data() {
        return {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
            tab: ["登录", "注册"],
            tabIndex: 0,
            other: "",
            form: {
                mobile: "",
                password: "",
                verificationCode: "",
            },
            reginForm: {
                name: "",
                mobile: "",
                password: "",
                verificationCode: "",
                desc: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
                verificationCode: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        uuid() {
            return this.$store.state.uuid;
        },
    },
    methods: {
        tabChange(i) {
            this.tabIndex = i;
        },
        getVerCode(type) {
            if (!this[type].mobile) {
                this.$refs.mobile.onFieldBlur();
                return;
            }

            let mobile = `+86 ${this[type].mobile}`;
            post("/mobile/verification-code", { mobile }).then((res) => {
                if (res.is_successful) {
                    this[type].verificationCode = res.data.code;
                    this.$message.success("注册成功");
                }
            });
        },
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let form = JSON.parse(JSON.stringify(this.form));
                    let params = new FormData();

                    params.append("grant_type", "password");
                    params.append(
                        "password",
                        shajs("sha1").update(form.password).digest("hex")
                    );
                    params.append("scope", "USER");
                    params.append("username", `+86 ${form.mobile}`);

                    post("/oauth2/token", params).then((res) => {
                        console.log(res);
                        if (res.is_successful) {
                            let token = JSON.parse(
                                Base64.decode(
                                    res.data.access_token.split(".")[1]
                                )
                            );

                            window.localStorage.setItem(
                                "token",
                                res.data.access_token
                            );
                            window.localStorage.setItem("uuid", token.uuid);

                            this.$store.commit("setToken", {
                                token: res.data.access_token,
                                uuid: token.uuid,
                            });

                            this.$router.push({ path: "/home" });
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        onSubmitRegin() {
            let _this = this;
            this.$refs.ruleFormRegin.validate((valid) => {
                if (valid) {
                    let mobile = `+86 ${this.reginForm.mobile}`;
                    let password = shajs("sha1")
                        .update(this.reginForm.password)
                        .digest("hex");

                    post("/user", {
                        meta: {},
                        mobile: mobile,
                        password: password,
                        sms_code: this.reginForm.verificationCode,
                        username: this.reginForm.name,
                    }).then((res) => {
                        if (res.isSuccess) {
                            this.$message.success("注册成功");
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
    },
};
</script>




<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/login-bg.png) no-repeat;
    background-size: 100% 100%;

    .main {
        width: 50%;
        height: 512px;
        position: absolute;
        top: 50%;
        left: 46%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        p {
            float: left;
            width: calc(~"100% - 350px");
            height: 100%;
            background: url(../assets/img/login-logo.png) center no-repeat;
            background-size: cover;
        }

        .formbox {
            float: right;
            margin-top: 5%;
            width: 340px;
            padding: 30px 38px 0;
            position: relative;
            background: rgba(26, 41, 61, 0.5);
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
            ul {
                height: 40px;
                margin-bottom: 30px;
                li {
                    float: left;
                    font-size: 22px;
                    cursor: pointer;
                    margin-right: 30px;
                    color: #fff;
                    &.active {
                        span {
                            padding-bottom: 8px;
                            color: #fff;
                            border-bottom: 2px solid #28adca;
                        }
                    }
                }
            }

            .forget {
                float: right;
                color: #aaa;
                margin-top: 6px;
            }
        }
    }

    .copyright {
        color: #333;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>