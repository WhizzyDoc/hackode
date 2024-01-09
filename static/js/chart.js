// apexcharts
window.Apex = {
    dataLabels: {
      enabled: false
    }
  };

  function drawViewChart(d) {
    //alert('gotten')
    if(d['status'] == 'success') {
      if(d.data) {
        let views = []
        let titles = []
        for(var i in d.data) {
          p = d.data;
          views.push(p[i].views)
          titles.push(p[i].title)
        }
        var optionsBar = {
          chart: {
            type: 'bar',
            height: 250,
            width: '100%',
            stacked: true,
            foreColor: '#999',
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: false
              },
              columnWidth: '75%',
              endingShape: 'rounded'
            }
          },
          colors: ["#00C5A4"],
          series: [{
            name: "Views",
            data: views,
          }],
          labels: titles,
          xaxis: {
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              show: false
            },
            labels: {
              show: true,
              style: {
                fontSize: '12px'
              }
            },
          },
          grid: {
            xaxis: {
              lines: {
                show: false
              },
            },
            yaxis: {
              lines: {
                show: false
              },
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            labels: {
              show: true
            },
          },
          legend: {
            floating: true,
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -36
          },
          title: {
            text: 'Projects Views',
            align: 'left',
          },
          subtitle: {
            text: 'Views'
          },
          tooltip: {
            shared: true,
            intersect: false
          }
        
        }
        var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
        chartBar.render();
      }
      else {
        document.querySelector('#bar').innerHTML = `<h3 class="w-text-grey">No project yet</h3>`
      }
    }
  }
  
  function drawPendChart(pend, tot) {
    let ser = Math.floor(((tot - pend) / tot) * 100)
    var optionsCircle1 = {
      chart: {
        type: 'radialBar',
        height: 266,
        zoom: {
          enabled: false
        },
        offsetY: 20
      },
      colors: ['#E91E63'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: true
            },
            value: {
              offsetY: 0
            }
          }
        }
      },
      series: [ser],
      theme: {
        monochrome: {
          enabled: false
        }
      },
      legend: {
        show: false
      },
      title: {
        text: 'Messages Replied',
        align: 'left'
      }
    }
    
    var chartCircle1 = new ApexCharts(document.querySelector('#radialBar1'), optionsCircle1);
    chartCircle1.render();
  }
  
  
  
  var optionsDonutTop = {
    chart: {
      height: 265,
      type: 'donut',
      offsetY: 20
    },
    plotOptions: {
      pie: {
        customScale: 0.86,
        donut: {
          size: '72%',
        },
        dataLabels: {
          enabled: true
        }
      }
    },
    colors: ['#775DD0', '#00C8E1', '#FFB900', '#E91E63'],
    title: {
      text: 'Site Activity'
    },
    series: [15, 40, 20, 25],
    labels: ['A', 'P', 'S', 'R'],
    legend: {
      show: true
    }
  }
  
  var chartDonut2 = new ApexCharts(document.querySelector('#donutTop'), optionsDonutTop);
  chartDonut2.render().then(function () {
    // window.setInterval(function () {
    //   chartDonut2.updateSeries([getRandom(), getRandom(), getRandom()])
    // }, 1000)
  });
  
  var optionsArea = {
    chart: {
      height: 421,
      type: 'area',
      background: '#fff',
      stacked: true,
      offsetY: 39,
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false
        }
      }
    },
    stroke: {
      curve: 'straight'
    },
    colors: ["#3F51B5", '#2196F3'],
    series: [{
        name: "Revenue",
        data: [15, 26, 20, 33, 27, 43, 17, 26, 19]
      },
      {
        name: "Expenditure",
        data: [19, 21, 42, 19, 32, 25, 36, 29, 49]
      }
    ],
    fill: {
      type: 'gradient',
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.9,
        opacityTo: 0.6,
        stops: [0, 100, 100, 100]
      }
    },
    title: {
      text: 'Profit Analysis',
      align: 'left',
      offsetY: -5,
      offsetX: 20
    },
    subtitle: {
      text: 'Monthly Statistics',
      offsetY: 30,
      offsetX: 20
    },
    markers: {
      size: 0,
      style: 'hollow',
      strokeWidth: 8,
      strokeColor: "#fff",
      strokeOpacity: 0.25,
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0
      }
    },
    yaxis: {
      show: false
    },
    labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002', '01/21/2002', '01/22/2002', '01/23/2002'],
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false
      }
    },
    legend: {
      offsetY: -50,
      position: 'top',
      horizontalAlign: 'right'
    }
  }
  
  var chartArea = new ApexCharts(document.querySelector('#area-adwords'), optionsArea);
  chartArea.render();
  
  var optionsCircle4 = {
    chart: {
      height: 314,
      type: 'radialBar',
    },
    colors: ['#775DD0', '#00C8E1', '#FFB900'],
    labels: ['q4'],
    series: [71, 63, 77],
    labels: ['June', 'May', 'April'],
    theme: {
      monochrome: {
        enabled: false
      }
    },
    plotOptions: {
      radialBar: {
        offsetY: -30
      }
    },
    legend: {
      show: true,
      position: 'left',
      containerMargin: {
        right: 0
      }
    },
    title: {
      text: 'Growth'
    }
  }
  
  var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom'), optionsCircle4);
  chartCircle4.render();

  var optionsCircle5 = {
    chart: {
      height: 314,
      type: 'radialBar',
    },
    colors: ['#775DD0', '#00C8E1', '#FFB900'],
    labels: ['q4'],
    series: [71, 63, 77],
    labels: ['June', 'May', 'April'],
    theme: {
      monochrome: {
        enabled: false
      }
    },
    plotOptions: {
      radialBar: {
        offsetY: -30
      }
    },
    legend: {
      show: true,
      position: 'left',
      containerMargin: {
        right: 0
      }
    },
    title: {
      text: 'Growth'
    }
  }
  
  var chartCircle5 = new ApexCharts(document.querySelector('#radialBarBottom2'), optionsCircle4);
  chartCircle5.render();
  
  function generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
  
      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  
  function getRandom() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  }
  
  
  var options = {
    chart: {
      height: 294,
      type: 'bubble',
      sparkline: {
        enabled: true
      },
    },
    plotOptions: {
      bubble: {
        dataLabels: {
          enabled: false
        }
      }
    },
    colors: ["#734CEA", "#34bfa3", "#f4516c", "#00c5dc"],
    series: [{
        name: 'Facebook',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'Twitter',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'Youtube',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      },
      {
        name: 'LinkedIn',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60
        })
      }
    ],
    fill: {
      opacity: 0.8,
      gradient: {
        enabled: false
      }
    },
    title: {
      text: 'Social Media Reach'
    },
    xaxis: {
      tickAmount: 12,
      type: 'category',
      min: -50,
      max: 850
    },
    yaxis: {
      max: 70
    }
  }
  
  var chart = new ApexCharts(
    document.querySelector("#bubbleChart"),
    options
  );
  
  // a small hack to extend height in website sample dashboard
  chart.render().then(function () {
    var ifr = document.querySelector("#dash-wrapper");
    if (ifr.contentDocument) {
      ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 +'px';
    }
  });
  