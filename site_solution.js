(
    async () => {

        // Chart.default.scale.ticks.beginAtZero = true;
        // Chart.default.global.legend.display = false;

        // const ctx = document.getElementById('chart').getContext('2d');
        // ctx.moveTo(0,0);
        // ctx.lineTo(200,100);
        // ctx.stroke();

        var apiData = await getApiData();
        const branches = apiData.map(o => o.branch);
        const revenues2020 = apiData.map(o => o.revenue2020);
        const revenues2019 = apiData.map(o => o.revenue2019);
        const revenues2018 = apiData.map(o => o.revenue2018);

        const ctx = document.getElementById('chart');
        // new Chart(ctx,{
        //     type:'bar',
        //     data:{
        //         labels:[
        //             "Seattle",
        //             "Portland",
        //             "Monterey",
        //             "San Francisco",
        //             "San Diego"
        //         ],
        //         datasets:[
        //             {
        //                 label:"Revenues last year",
        //                 data:[433223,6434332,5333422,677343,511232]
        //             },
        //             {
        //                 label:"Revenues last year",
        //                 data:[433223,6434332,5333422,677343,511232]
        //             },
        //             {
        //                 backgroundColor:"red",
        //                 label:"Revenues per branch",
        //                 data:[432323,645332,533222,673743,512132]
        //             }
        //         ]
        //     }
        // })



        new Chart(ctx,{
            type:'bar',
            data:{
                labels:branches,
                datasets:[
                    {
                        backgroundColor: function(context){
                            let index = context.dataIndex;
                            let value = context.dataset.data[index];
                            return value < 20000 ? "red":"green";
                        },
                        label:"Revenues 2018",
                        data:revenues2018
                    },
                    {
                        backgroundColor: "blue",
                        label:"Revenues 2019",
                        data:revenues2019
                    },
                    {
                        backgroundColor: "purple",
                        label: "Revenues 2020",
                        data: revenues2020
                    }
                ]
            },
            options:{
                indexAxis:'y'
            }
        })

        const colorPool = ["purple","red","green","blue","orange"];

        const button = document.getElementById('refreshButton');
        button.addEventListener("click",refresh);


        let datasets = [];
        apiData.forEach((item,index) => {
            datasets.push({
                label: item.branch,
                data: [item.revenue2018, item.revenue2019, item.revenue2020],
                borderColor: colorPool[index]
            })
        })

        console.log(datasets[2].data[2]);

        const ctxTwo = document.getElementById('chartTwo');
        new Chart(ctxTwo,{
            type:'line',
            data:{
                labels:["2018","2019","2020"],
                datasets:datasets
            },
            options:{
                animation:{
                    duration:5000
                }
            }
        });

        function refresh(){
            Chart.data.datasets[2].data[2] = 50000;
            Chart.update();
        }

        async function getApiData(){
            const apiResult = await fetch("https://chartjsapi.azurewebsites.net/branch/revenues");
            const json = await apiResult.json();
            return json;
        }
    }
)();

