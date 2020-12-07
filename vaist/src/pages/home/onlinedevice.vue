<template>
    <div id="onlinedevice"></div>
</template>

<style lang="less" scoped>
#onlinedevice {
    width: 100%;
    height: 200px;
}
</style>

<script>
import { Chart } from "@antv/g2";

const data = [
    { item: "navo", count: 40, percent: 0.4 },
    { item: "navo pro", count: 21, percent: 0.21 },
    { item: "workstation", count: 17, percent: 0.17 },
    { item: "server", count: 13, percent: 0.13 },
];
const colors = ["#428EF1", "#5fa0f5", "#8bbdff", "#d1e5ff"];

export default {
    mounted() {
        const chart = new Chart({
            container: "onlinedevice",
            autoFit: true,
            height: 200,
        });

        chart.coordinate("theta", {
            radius: 0.75,
            innerRadius: 0.6,
        });

        chart.data(data);

        chart.scale("percent", {
            formatter: (val) => {
                val = val * 100 + "%";
                return val;
            },
        });

        chart.tooltip(false);

        // 声明需要进行自定义图例字段： 'item'
        chart.legend("item", {
            offsetX: -20,
            position: "right-bottom", // 配置图例显示位置
            custom: true, // 关键字段，告诉 G2，要使用自定义的图例
            items: data.map((obj, index) => {
                console.log(obj);
                return {
                    name: obj.item, // 对应 itemName
                    value: obj.percent, // 对应 itemValue
                    marker: {
                        symbol: "square", // marker 的形状
                        style: {
                            r: 5, // marker 图形半径
                            fill: colors[index], // marker 颜色，使用默认颜色，同图形对应
                        },
                    }, // marker 配置
                };
            }),
            itemValue: {
                style: {
                    fill: "#999",
                }, // 配置 itemValue 样式
                formatter: (val) => `${val * 100}%`, // 格式化 itemValue 内容
            },
        });

        chart
            .interval()
            .adjust("stack")
            .position("percent")
            .color("item", colors)
            .style({
                fillOpacity: 1,
            })
            .state({
                active: {
                    style: (element) => {
                        const shape = element.shape;
                        return {
                            lineWidth: 10,
                            stroke: shape.attr("fill"),
                            strokeOpacity: shape.attr("fillOpacity"),
                        };
                    },
                },
            });

        // 移除图例点击过滤交互
        chart.removeInteraction("legend-filter");
        chart.interaction("element-active");

        chart.render();

        // 监听 element 上状态的变化来动态更新 Annotation 信息
        chart.on("element:statechange", (ev) => {
            const { state, stateStatus, element } = ev.gEvent.originalEvent;

            // 本示例只需要监听 active 的状态变化
            if (state === "active") {
                const data = element.getData();
                if (stateStatus) {
                    // 更新 Annotation
                    updateAnnotation(data);
                } else {
                    // 隐藏 Annotation
                    clearAnnotation();
                }
            }
        });

        // 绘制 annotation
        let lastItem;
        function updateAnnotation(data) {
            if (data.item !== lastItem) {
                chart.annotation().clear(true);
                chart
                    .annotation()
                    .text({
                        position: ["50%", "50%"],
                        content: data.item,
                        style: {
                            fontSize: 14,
                            fill: "#428EF1",
                            textAlign: "center",
                        },
                        offsetY: -10,
                    })
                    .text({
                        position: ["50%", "50%"],
                        content: data.count + "台",
                        style: {
                            fontSize: 16,
                            fill: "#428EF1",
                            textAlign: "center",
                        },
                        offsetX: 0,
                        offsetY: 10,
                    });
                chart.render(true);
                lastItem = data.item;
            }
        }

        // 清空 annotation
        function clearAnnotation() {
            chart.annotation().clear(true);
            chart.render(true);
            lastItem = null;
        }
    },
};
</script>
