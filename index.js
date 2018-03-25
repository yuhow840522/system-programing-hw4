/* select svg area */
var svg = d3.select('svg')
var w = 700 ,h = 500 ,padding = 80 ,barWidth =45,xData = [96,105];
var yMin,yMax;
var department ;
var departmentData;

svg.append('g').attr('id','xAxis').attr('transform','translate(0, 414.02)');
svg.append('g').attr('id','yAxis').attr('transform','translate(49, 0)');

$('.department-select').on('click', function() {
  department = $(this).text();
  departmentData = getDepartmentData(department);
  calculateDraw();
  $("#department-id").text(department);
});

/* getData*/

function getDepartmentData(name){
  let d = data[name];
  let result=[
    {"year":96 ,"count":d["96 N"]},
    {"year":97 ,"count":d["97 N"]},
    {"year":98 ,"count":d["98 N"]},
    {"year":99 ,"count":d["99 N"]},
    {"year":100 ,"count":d["100 N"]},
    {"year":101 ,"count":d["101 N"]},
    {"year":102 ,"count":d["102 N"]},
    {"year":103 ,"count":d["103 N"]},
    {"year":104 ,"count":d["104 N"]},
    {"year":105 ,"count":d["105 N"]},
  ]
  let yTempMin=result[0].count,yTempMax=result[0].count;
  for(let i=1;i<10;i++){
    if(yTempMin>result[i].count) yTempMin=result[i].count;
    if(yTempMax<result[i].count) yTempMax=result[i].count;
  }
  yMin=yTempMin;
  yMax=yTempMax;
  yMin=(yMin-(yMin%10))-10;
  if(yMin<0) yMin=0;
  // yMax=yMax+(10-yMax%10);
  return result;
}


function calculateDraw(){
  /* calculate scale */
  // var Ymax = d3.max(departmentData, function(d){return d.value}),
  // Ymin = d3.min(departmentData, function(d){return d.value});
  // $('rect').remove();
  // $('text').remove();

  // setTimeout(function() {

    var xScale = d3.scale.linear()
    .domain(xData)
    .range([padding,w-padding])

    var yScale = d3.scale.linear()
    .domain([yMin-1,yMax])
    .range([padding, h-padding])

    var y = d3.scale.linear()
    .domain([yMin-1,yMax])
    .range([h-padding,padding])

    var colorScale = d3.scale.linear()
    .domain([yMin-1,yMax])
    .range([500,100])

    $('rect').remove();
    $('text').remove();
    
    /* append real x-y Axis*/
    svg.select("#xAxis").call(function(g){
      let axis = d3.svg.axis().scale(xScale).orient("bottom");
      g.call(axis);
    });

    svg.select("#yAxis").call(function(g){
      let axis = d3.svg.axis().scale(y).orient("left");
      g.call(axis);
    });

    /* draw bar*/


    svg.selectAll('rect')
    .data(departmentData)
    .enter()
    .append('rect')
    .attr({
      'x': function(d,i) {return xScale(d.year)-(barWidth/2)},
      'y': function(d) {return h-yScale(d.count)},
      'width': barWidth,
      'height': function(d){return yScale(d.count)-90},
      'fill': function(d){var color = 0.2 + colorScale(d.count)*0.001;
        return d3.hsl(512,color,color);},
        // 'title': function(d){return 'Major:'+d.name;}
      });

      svg.append("g").selectAll('text')
      .data(departmentData)
      .enter()
      .append('text')
      .text(function(d){return d.count+"人"})
      .attr({
        'x': function(d,i) {return xScale(d.year)-(barWidth/10)},
        'y': function(d) {return h-yScale(d.count)-5},
        'fill': 'black',
        'text-anchor': 'middle',
        'font-size': '50x'
      });

      svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (padding/6) +","+(h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("人數變化");

      svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (w/2) +","+(h-(padding/2))+")")  // centre below axis
      .text("年份(民國)");

    // }, 200);

  }
