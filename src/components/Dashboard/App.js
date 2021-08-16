import './App.css';
import React, {useEffect, useRef, useState} from "react";
import { Chart, Line} from 'react-chartjs-2';
import { DashboardTable } from '../Table/DashboardTable'
import 'chartjs-adapter-moment';
import chartTrendline from "chartjs-plugin-trendline";

const App = () => {
    const ref = useRef();
    const [chartData, setData] = useState({
        labels : ["10/06/2021", "11/06/2021", "12/06/2021", "13/06/2021", "14/06/2021", "15/06/2021", "16/06/2021", "17/06/2021", "18/06/2021", "19/06/2021", "20/06/2021"],
        datasets: [
            {
                hidden : true,
                fill : true,
                borderColor: "#59AD59",
                data:
                    [
                        650,
                        650,
                        650,
                        600,
                        650,
                        400,
                        300,
                        200,
                        600,
                        700,
                        700,
                    ],
                id: "row-id0",
                label: "reg",
                pointHoverRadius: 6,
                pointRadius: 4,
                tension: 0,
                pointBackgroundColor: "#59AD59",
                trendlineLinear: {
                    display : false,
                    width: 2,
                    style: "#59AD59",
                    lineStyle: "solid",
                    lineTension: 0.8
                }
            },
            {
                hidden : true,
                fill : true,
                borderColor: "#731bcd",
                data:
                    [
                        400,
                        400,
                        350,
                        700,
                        400,
                        300,
                        500,
                        800,
                        600,
                        500,
                        400,
                    ],
                trendlineLinear: {
                    display: false,
                    style: "#731bcd",
                    lineStyle: "solid",
                    lineTension: 0.8,
                    width: 2
                },
                id: "row-id1",
                label: "visits",
                pointHoverRadius: 6,
                pointRadius: 4,
                tension: 0,
                pointBackgroundColor: "#731bcd",
            },
        ]
    });
    const [chartOptins, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 0,
        scales: {
            x: {
                display: true,
                title: {
                    display: false,
                    text: 'Date'
                },
                ticks: {
                    align: 'center',
                    crossAlign: 'center',
                    padding: 10,
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                },
                grid: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color : function(context) {
                        if (context.index === 0) return '#000E2B'
                        return '#C6C6C6'
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: false,
                    text: 'Price'
                },
                ticks: {
                    display : false,
                    align: 'center',
                    crossAlign: 'center',
                    padding: 10
                },
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color : function(context) {
                        if (context.index === 0) return '#000E2B'
                        return '#C6C6C6'
                    }
                }
            },
        },
        plugins: {
            title: {
                display: false,
                text: 'Current stocks'
            },
            legend: {
                display : false,
                labels: {
                    font: {
                        size: 20
                    }
                }
            },
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false,

                external: function (context) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<div class="svg">' +
                            '<svg width="50" height="50" viewBox="0 0 27 39" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                            '<g filter="url(#filter0_d)">\n' +
                            '<path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C3.79086 0 2 1.79086 2 4V15.5V21V33L10 25H21C23.2091 25 25 23.2091 25 21V4C25 1.79086 23.2091 0 21 0H6Z" fill="#9440ED"/>\n' +
                            '</g>\n' +
                            '<defs>\n' +
                            '<filter id="filter0_d" x="0" y="0" width="27" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
                            '<feFlood flood-opacity="0" result="BackgroundImageFix"/>\n' +
                            '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n' +
                            '<feOffset dy="4"/>\n' +
                            '<feGaussianBlur stdDeviation="1"/>\n' +
                            '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>\n' +
                            '<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>\n' +
                            '<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>\n' +
                            '</filter>\n' +
                            '</defs>\n' +
                            '</svg>' +
                            '<p class="text">text</p>' +
                            '</div>';
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    var tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    // Set Text

                    if (tooltipModel.body) {
                        console.log(tooltipModel);
                        var titleLines = tooltipModel.title || [];
                        var bodyLines = tooltipModel.body.map(getBody);
                        titleLines.forEach(function(title) {
                            console.log(title);
                        });
                        bodyLines.forEach(function(body, i) {
                            console.log(body);
                        });
                        console.log(tooltipEl);
                        var tableRoot = tooltipEl.querySelector('.text');
                        console.log(String(bodyLines[0][0]).replace('/\D/gim', ''), String(bodyLines[0][0]))
                        tableRoot.innerHTML = String(bodyLines[0][0]).replace(/\D/gim, '');
                        console.log(tableRoot);
                    }
                    var position = context.chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left - 5 + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top - 50 + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                }
            }
        }
    });
    useEffect(() => Chart.register(chartTrendline));
    const displayHandler = (index) => {
        const dataCopy = {...chartData};
        dataCopy.datasets = dataCopy.datasets.map((e,i) => {
            if (index === i){
                e.hidden = !e.hidden;
            }
            return e;
        })
        setData(dataCopy);
    }
    const trendLineHandler = (index) => {
        const dataCopy = {...chartData};
        dataCopy.datasets = dataCopy.datasets.map((e,i) => {
            if (index === i){
                e.trendlineLinear.display = !e.trendlineLinear.display;
            }
            return e;
        })
        setData(dataCopy);
    }
    const data = (canvas) => {
        const dataCopy = {...chartData};
        var gradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, "rgb(148, 64, 237, 0.7)");
        gradient.addColorStop(1, "rgb(255, 255, 255, 0)");
        dataCopy.datasets[1].backgroundColor = gradient;
        var gradient2 = canvas.getContext("2d").createLinearGradient(0, 0, 0, 500);
        gradient2.addColorStop(0, "rgb(89, 173, 89, 0.7)");
        gradient2.addColorStop(1, "rgb(255, 255, 255, 0)");
        dataCopy.datasets[0].backgroundColor = gradient2;
        return {
            ...dataCopy
        }
    }
    return (
        <>
            <div style={{ margin: "auto", width: "80vw", height: '60vh'}}>
                <Line ref={ref} data={data} options={chartOptins}/>
            </div>
            <div style={{margin: "auto", width: "80vw"}}>
                <DashboardTable displayHandler={displayHandler} trendLineHandler={trendLineHandler}/>
            </div>
        </>
    );
}

export default App;
