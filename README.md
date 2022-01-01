

### Hardcoded Chartjs
```
    <div class="chartContainer">
        <canvas id="chart" height="850" width="900">
        </canvas>
    </div>
```

```
(
    () => {
        const ctx = document.getElementById('chart').getContext('2d');
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.stroke()
    }
)();
```
### Data From Api
https://chartjsapi.azurewebsites.net/branch/revenues

json in array
```
[
{"branch":"Seattle","revenue2020":16383,"revenue2019":14320,"revenue2018":13212},
{"branch":"Portland","revenue2020":8045,"revenue2019":9100,"revenue2018":10323}...]
```

* manipulating
```
 var apiData = await getApiData();
 
 const branches = apiData.map(i => i.branch);
 const revenues2020 = apiData.map(i => i.revenue2020);
 const revenues2019 = apiData.map(i => i.revenue2019);
 const revenues2018 = apiData.map(i => i.revenue2018);
 
 async function getApiData(){
        const apiResult = await fetch("https://chartjsapi.azurewebsites.net/branch/revenues")
        const json = await apiResult.json();
        return json;
      }
```