const width = 800;
const height = 350;
const margin = {
    top: 10,
    left: 40,
    bottom: 40,
    right: 40
};

let svg = d3.select("svg.well")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

let path = svg.append("path")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let path_save1 = svg.append("path")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
let path_save2 = svg.append("path")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
let path_save3 = svg.append("path")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// let x = d3.scaleLinear()
//     .range([0, width]);

let x = d3.scaleTime()
    .range([0, width]);

let y = d3.scaleLinear()
    .range([height, 0]);

let line = d3.line()
    .defined(d => d)
    .x(d => x(d.date))
    .y(d => y(d.y));

let yAxis = svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

svg.append("text")
      .attr("x", "5em")
      .attr("dy", "2em")
      .style("font-weight", "bold")
      .text("水位(m)");

svg.append("text")
      .attr("dy", "8em")
      .attr("transform", `translate(${width}, ${margin.top})`)
      .style("font-weight", "bold")
      .text("安全水位");
svg.append("text")
      .attr("dy", "20em")
      .attr("transform", `translate(${width}, ${margin.top})`)
      .style("font-weight", "bold")
      .text("下限水位");
svg.append("text")
      .attr("dy", "30em")
      .attr("transform", `translate(${width}, ${margin.top})`)
      .style("font-weight", "bold")
      .text("嚴重下限水位");     


let xAxis = svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(${margin.left}, ${margin.top + height})`);

// let dot = svg.selectAll(".dot")
//     .data(d3.range(40).map(i => {
//         return {
//             x: i / 39,
//             y: 0
//         };
//     }))
//     .enter()
//     .append("circle")
//     .attr("class", "dot")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`)
//     .attr("cx", d => x(d.date))
//     .attr("cy", d => y(d.y))
//     .attr("r", 10);

let startTime = new Date(2017, 6, 14, 15, 0)

let data = d3.range(40).map(i => {

    let t = new Date(startTime - (40 - i)*60000);

    return {
        date: t,
        y: (35 + t.getMinutes()/30 + Math.random()/10)
    };
});

let saveLine1 = [{
        date: new Date(data[0].date.getTime()),
        y: 33
    }, {
        date: new Date(data[data.length - 1].date.getTime()),
        y: 33
    }];

let saveLine2 = [{
        date: new Date(data[0].date.getTime()),
        y: 35
    }, {
        date: new Date(data[data.length - 1].date.getTime()),
        y: 35
    }];

let saveLine3 = [{
        date: new Date(data[0].date.getTime()),
        y: 38
    }, {
        date: new Date(data[data.length - 1].date.getTime()),
        y: 38
    }];

x.domain(d3.extent(data, data => data.date));

let Yextent = d3.extent(data, data => data.y);
y.domain([Yextent[0] - 3, Yextent[1] + 3]);

// svg.selectAll(".dot")
//     .data(data)
//     .transition()
//     .attr("class", "dot")
//     .attr("cx", d => x(d.x))
//     .attr("cy", d => y(d.y))
//     .attr("r", 3.5);

// yAxis.call(d3.axisLeft(y))
xAxis.call(d3.axisBottom(x));

path.datum(data)
    .transition()
    .attr("class", "line")
    .attr("d", line);

path_save1.datum(saveLine1)
    .transition()
    .attr("class", "line_saveLine1")
    .attr("d", line);

path_save2.datum(saveLine2)
    .transition()
    .attr("class", "line_saveLine2")
    .attr("d", line);

path_save3.datum(saveLine3)
    .transition()
    .attr("class", "line_saveLine3")
    .attr("d", line);


setInterval(function(){

    let lestTime = data[data.length - 1].date.getTime();
    let t = new Date(lestTime + 60000);

    data.shift();
    data.push(
        {
            date: t,
            y: (35 + t.getMinutes()/30 + Math.random()/10)
        }
    )


    saveLine1 = [{
            date: new Date(data[0].date.getTime()),
            y: 33
        }, {
            date: new Date(data[data.length - 1].date.getTime()),
            y: 33
        }];

    saveLine2 = [{
            date: new Date(data[0].date.getTime()),
            y: 35
        }, {
            date: new Date(data[data.length - 1].date.getTime()),
            y: 35
        }];

    saveLine3 = [{
            date: new Date(data[0].date.getTime()),
            y: 38
        }, {
            date: new Date(data[data.length - 1].date.getTime()),
            y: 38
        }];

    x.domain(d3.extent(data, data => data.date));
    let Yextent = d3.extent(data, data => data.y);
    y.domain([Yextent[0] - 3, Yextent[1] + 3]);


    path.datum(data)
        .transition()
        .attr("class", "line")
        .attr("d", line);

    path_save1.datum(saveLine1)
        .transition()
        .attr("class", "line_saveLine1")
        .attr("d", line);

    path_save2.datum(saveLine2)
        .transition()
        .attr("class", "line_saveLine2")
        .attr("d", line);

    path_save3.datum(saveLine3)
        .transition()
        .attr("class", "line_saveLine3")
        .attr("d", line);

    yAxis.call(d3.axisLeft(y));
    xAxis.call(d3.axisBottom(x));

}, 700)




// set the dimensions and margins of the graph
var margin2 = {top: 20, right: 20, bottom: 30, left: 40},
    width2 = 880 - margin2.left - margin2.right,
    height2 = 300 - margin2.top - margin2.bottom;

// set the ranges
var x2 = d3.scaleBand()
          .range([0, width2])
          .padding(0.1);
var y2 = d3.scaleLinear()
          .range([height2, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg2 = d3.select("svg.wellvalue")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin2.left + "," + margin2.top + ")");

data2 = [{county:"中壢區", count: 155},
         {county:"楊梅區", count: 145},
         {county:"龜山區", count: 120},
         {county:"蘆竹區", count: 100},
         {county:"龍潭區", count: 91},
         {county:"平鎮區", count: 75},
         {county:"觀音區", count: 74},
         {county:"八德區", count: 64},
         {county:"大園區", count: 55},
         {county:"大溪區", count: 52},
         {county:"新屋區", count: 51},
         {county:"桃園區", count: 43},
         {county:"復興區", count: 0}];


// Scale the range of the data in the domains
x2.domain(data2.map(function(d) { return d.county; }));
y2.domain([0, d3.max(data2, function(d) { return d.count; })]);

// append the rectangles for the bar chart
svg2.selectAll(".bar")
    .data(data2)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x2(d.county); })
    .attr("width", x2.bandwidth())
    .attr("y", function(d) { return y2(d.count); })
    .attr("height", function(d) { return height2 - y2(d.count); });

// add the x Axis
svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2));

// add the y Axis
svg2.append("g")
    .call(d3.axisLeft(y2));

svg2.append("text")
      .attr("x", "0em")
      .attr("dy", "-1em")
      .style("font-weight", "bold")
      .text("核發水井數口數");


var app = new Vue({
  el: '#app',
  data: {
    well: '台灣華可貴股份有限公司'
  }
})