window.Apex = {
    dataLabels: {
      enabled: false
    }
  };
  
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
      data: [87, 89, 74, 93, 81, 100, 57, 23, 5, 41, 12, 0],
    }],
    labels: ["January", "February", "March", "April", "May", 
            "June", "July","August", "September", "October", 
            "November","December",],
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
      text: 'Monthly Views',
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
  var chartBar = new ApexCharts(document.querySelector('#bar2'), optionsBar);
  chartBar.render();

  var optionsWeekBar = {
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
      data: [7, 7, 8, 7, 6, 0, 0],
    }],
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
      text: 'Weekly Views',
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
  var weekChartBar = new ApexCharts(document.querySelector('#bar5'), optionsWeekBar);
  weekChartBar.render();
  
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
    series: [70],
    theme: {
      monochrome: {
        enabled: false
      }
    },
    legend: {
      show: false
    },
    title: {
      text: 'Tasks Completed',
      align: 'left'
    }
  }
  var chartCircle1 = new ApexCharts(document.querySelector('#radialBar12'), optionsCircle1);
  chartCircle1.render();
  
  
  function getRandom() {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
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
    colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#008000'],
    title: {
      text: 'Star Ratings'
    },
    series: [2, 8, 12, 36, 42],
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    legend: {
      show: true
    }
  }
  var chartDonut2 = new ApexCharts(document.querySelector('#donutTop2'), optionsDonutTop);
  chartDonut2.render().then(function () {
    window.setInterval(function () {
       chartDonut2.updateSeries([getRandom(), getRandom(), getRandom(), getRandom(), getRandom()])
     }, 5000)
  });
  

  
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
  
  // a small hack to extend height in website sample dashboard
  chart.render().then(function () {
    var ifr = document.querySelector("#dash-wrapper");
    if (ifr.contentDocument) {
      ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 +'px';
    }
  });