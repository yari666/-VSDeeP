import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建VueX对象
var token = window.localStorage.getItem('token');
var uuid = window.localStorage.getItem('uuid');
export default new Vuex.Store({
    state: {
        uuid,
        token,
        tools: {
            //图形模具
            mould: {
                type: "",
                styles: {}
            },
            //选中的元素对象
            element: {
                type: "",
                styles: {}
            },
            //圆形
            circle: {
                id: 0,
                type: "Circle",
                styles: {
                    X: 0,
                    Y: 0
                }
            },
            //用于于渲染矩形
            rect: {
                id: 0,
                type: "Rectangle",
                styles: {
                    X: 0,
                    Y: 0,
                    Width: 0,
                    Height: 0
                }
            },
            //当前的图片
            image: {
                id: 33333,
                type: "Image",
                width: 0,
                height: 0,
                styles: { X: 0, Y: 0, Scale: 1 }
            },
            //两个坐标距离差
            coords: null,
            toolType: "draw" //鼠标操作类型
            // toolType: "select" //鼠标操作类型
        }
    },
    getters: {
        tools: state => state.tools,
        mould: state => state.tools.mould,
        element: state => state.tools.element,
        image: state => state.tools.image,
        toolType: state => state.tools.toolType,
    },
    mutations: {
        setToken(state, params) {
            state.token = params.token;
            state.uuid = params.uuid;
        },
        //设置图形模具
        TOOL_SET_MOULD(state, mould) {
            state.tools.mould = mould;
        },
        //选中的元素
        TOOL_SELECT_ELEMENT(state, element) {
            state.tools.element = element;
        },
        //选中的图片
        TOOL_SELECT_IMAGE(state, image) {
            state.tools.image = image;
        },
        //设置对象值
        TOOL_SET_VALUES(state, { el, attr }) {
            Object.assign(state.tools[el].styles, attr)
        },
    },
    actions: {
        //设置模具
        toolSetMould({ commit }, type) {
            let list = [
                {
                    type: "Circle",
                    styles: {
                        Radius: 15,
                        Fill: "#F5222D",
                    },
                },
                {
                    type: "Rectangle",
                    styles: {
                        StrokeWidth: 2,
                        Stroke: "#F5222D",
                    },
                }
            ];
            let mould = list.find((_) => _.type == type) || {};
            commit("TOOL_SET_MOULD", mould)
        },
    },
})
