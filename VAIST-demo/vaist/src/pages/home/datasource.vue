<template>
    <div id="datasource"></div>
</template>

<script>
import { Chart, Util } from "@antv/g2";
const data = [
    { type: "原有", value: 5400 },
    { type: "新增", value: 2100 },
];
const colors = ["#f5f7f8", "#5fa0f5"];

export default {
    mounted() {
        const chart = new Chart({
            container: "datasource",
            autoFit: true,
            height: 130,
        });
        chart.data(data);

        chart.coordinate("theta", {
            radius: 0.95,
        });
        chart.tooltip({
            showMarkers: false,
        });

        chart.legend("type", {
            position: "right-bottom",
        });

        const interval = chart
            .interval()
            .adjust("stack")
            .position("value")
            .color("type", colors)
            .style({ opacity: 0.4, shadowColor: "rgba(0, 0, 0, .45)" })
            .state({
                active: {
                    style: (element) => {
                        const shape = element.shape;
                        return {
                            matrix: Util.zoom(shape, 1.1),
                        };
                    },
                },
            })
            .label("type", (val) => {
                return {
                    offset: -15,
                    style: {
                        opacity: 1,
                        fill: val == "原有" ? "#777" : "white",
                        fontSize: 12,
                    },
                    content: (obj) => {
                        return obj.value;
                    },
                };
            });

        chart.interaction("element-single-selected");

        chart.render();
    },
};
</script>



