var json_url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?";
var json_where = "$select=date, community_area, primary_type, location_description, arrest, domestic&$where=year>2004 &$limit=5000000&$$app_token=BWWPzJPWah0RdMqRqbWEw53eb"; //$where=date>'2015-08-01T12:00:00'

$("select#area_select").val("14-Albany Park");
drawChart(json_url+json_where+"&community_area='14'");

$('#area_select').change(function(){
    $('#typeDown').prop('selectedIndex',0);
});

$('#area_select').change(function(){
    $('#locDown').prop('selectedIndex',0);
});

$('#area_select').on('change',function(e){
	var sVal = $('#area_select').val(),
		sValue = sVal.substr(0, sVal.indexOf("-")),
		sText = sVal.substr(sVal.indexOf("-")+1);
	if(sValue == 0){
		$("title").html("All Crimes per Month");
		$(".chart-title").html("All");
		drawChart(json_url+json_where);
	}
	else{
		$("title").html(sText + " Crimes per Month");
		$(".chart-title").html(sText);
		drawChart(json_url+json_where+"&community_area=" + sValue);
	}
});

//drawChart(json_url+json_where);
//drawChart("Data/chicago1.json");
		
var formatDate = d3.time.format("%m/%Y"); 
var formatTipNumber = d3.format("0,000");

var parseTime = d3.time.format.utc("%H:%M").parse,
	midnight = parseTime("00:00");

//var svg = d3.select(map.getPanes().overlayPane).append("svg"),
//    g = svg.append("g").attr("class", "leaflet-zoom-hide");	

// tooltips for line chart
var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function (d) {return "<span style='color: white'>" + formatDate(d.x) + "</span>: "  + formatTipNumber(d.y); });

function drawChart(url){

	// load the SODA data using d3.json
	d3.json(url, function(error, data){ 
		var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L"); 
		var numberFormat = d3.format(",f");	
		
		//gets today and up to 120 months ago
		var startDate = d3.time.month.offset(new Date(), -121);
		var endDate = d3.time.month(new Date());
		
		//var startDate = d3.time.day.offset(new Date("2012/01/2"), -250);
		//var endDate = d3.time.day(new Date("2012/07/01"));
	
		// normalize/parse data so dc can correctly sort & bin them
		// I like to think of each "d" as a row in a spreadsheet
		data.forEach(function(d) {		
			d.date = parseDate.parse(d.date);	
			//d.dd = parseDate.parse(d.date);
			//d.date = d.date;
			d.year = +d.year;
			d.location_description = d.location_description;
			d.community_area = +d.community_area; 
			d.primary_type = d.primary_type;
			d.arrest = d.arrest;
			d.domestic = d.domestic;
		});
		
		//console.log(data);
		var filterData = data.filter(function(d) { 
			if(d.date < endDate && d.date > startDate || d.date == endDate || d.date == startDate)
				return d;
		});
		
		// Use the crossfilter force.
	    var cf = crossfilter(filterData);
	
		var all = cf.groupAll();
		
		// for date, per type of chart 
	    var dateValue = cf.dimension(function (d) {
	        return d3.time.month(d.date);
	    });
		var dateValueGroup = dateValue.group();
		
		// for primary crime type
	    var startValue = cf.dimension(function (d) {
			return d.primary_type;
	    });
	    var startValueGroup = startValue.group();
		
		// for location description 
	    var locationValue = cf.dimension(function (d) {
			return d.location_description;
	    });
	    var locationValueGroup = locationValue.group();		
		
		// for arrest data 
	    var arrestValue = cf.dimension(function (d) {
			return d.arrest;
	    });
	    var arrestValueGroup = arrestValue.group();
		
		// for domestic data 
	    var domesticValue = cf.dimension(function (d) {
			return d.domestic;
	    });
	    var domesticValueGroup = domesticValue.group();
		
	    var dayOfWeek = cf.dimension(function (d) {
	        var day = d.date.getDay();
	        var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	        return day + '.' + name[day];
	    });
		
	    var dayOfWeekGroup = dayOfWeek.group();
        
        var hourLine = [];
		for(var i=0; i<24; i++) {
			hourLine[i] =  parseTime(i+":00");
		}
		
		var timeOfDay = cf.dimension(function (d) {
			var hour = d.date.getHours();
			//return hour;
			return hourLine[hour];
		});
		
		//var hourGrouping = dateDimension.group(function(d) {return d.getHours();});
		
		var timeOfDayGroup = timeOfDay.group(); 
			
		// define all of the charts and graphs for the dashboard
		var lineChart = dc.lineChart("#dc-line-chart"),
			arrestPie = dc.pieChart("#dc-arrest-pie"),
			domesticPie = dc.pieChart("#dc-domestic-pie"),
			timeOfDayChart = dc.barChart("#dc-time-of-day-chart"),
			dataCount = dc.dataCount('#data-count');
	
	    lineChart
			.width(816)
			.height(580)
			.margins({top: 20, right: 30, bottom: 50, left: 50})
			.dimension(dateValue)
			.group(dateValueGroup)
			.brushOn(false)
			.renderLabel(true)
			.renderTitle(false)
			.transitionDuration(400)
			.renderHorizontalGridLines(true)
			.renderVerticalGridLines(true)
			.on('renderlet.a', function(chart){
				chart
					.selectAll("circle.dot")
					.call(tip)
					.attr("r", 2.2)	
					.style("fill-opacity", .8).on('mousemove', tip.show)
					.on('mouseout', tip.hide);
			})		
			.on('renderlet.c', function(chart) {
				chart.selectAll('rect').on("click", function(d) {
					console.log("click!", d);
				});
			
				var xdata = [];
				var ydata = [];				
			
				// use real statistics here!
				for(var i=0; i<dateValueGroup.all().length; i++){			
					ydata.push(dateValueGroup.all()[i].value);
					xdata.push(dateValueGroup.all()[i].key);					
				}
			
				// get the x and y values for least squares				
				var xLabels = xdata;
			
				var xSeries = d3.range(1, xLabels.length + 1);
				var ySeries = ydata;
			
				var leastSquaresCoeff = leastSquares(xSeries, ySeries);
			
				var x1 = xLabels[0];
				var y1 = Math.abs(leastSquaresCoeff[0] + leastSquaresCoeff[1]);
				//var x2 = xLabels[xLabels.length - 1];
				var x2 = d3.time.day.offset(xLabels[xLabels.length - 1], 2);
				var y2 = Math.abs(leastSquaresCoeff[0] * (xSeries.length+2) + leastSquaresCoeff[1]);

				var extra_data = [{x: chart.x()(x1), y: chart.y()(y1)}, {x: chart.x()(x2), y: chart.y()(y2)}];
				var line = d3.svg.line()
					.x(function(d) { return d.x; })
					.y(function(d) { return d.y; })
					.interpolate('linear');			
				var path = chart.select('g.chart-body').selectAll('path.extra').data([extra_data]);
				path.enter().append('path').attr('class', 'extra').attr('stroke', '#31a354'); 
				path.attr('d', line);
			
				var highValue = d3.max(ydata, function(d) {return d;}),
					lowValue = d3.min(ydata, function(d) {return d;});
			
				var	ty = rateOfChange(leastSquaresCoeff[0], leastSquaresCoeff[1], xSeries.length);	// Celeration

				$(".high").html(" " + formatTipNumber(highValue));
				$(".low").html(" " + formatTipNumber(lowValue));
				$(".celeration").html(" " + ty + " per 6 months");
			})
			.y(d3.scale.log().clamp(true).domain([.5, 1000000]))
			.x(d3.time.scale().domain([new Date (startDate), new Date (endDate)]))			
			.yAxis().ticks(10, ",.0f").tickSize(5, 0);	
	
		//TODO check for updates from brandongordon
		lineChart.xAxis().ticks(10).tickSize(7,0).tickFormat(d3.time.format("%m/%Y"));	
		lineChart.yAxisLabel('TOTAL PER MONTH');	
		lineChart.xAxisLabel('CALENDAR MONTHS');
		
		arrestPie
			.width(150)
			.height(150)
			.dimension(arrestValue)
			.group(arrestValueGroup)
			.innerRadius(30);
			
		domesticPie
			.width(150)
			.height(150)
			.dimension(domesticValue)
			.group(domesticValueGroup)
			.innerRadius(30);	
	
		timeOfDayChart
			.width(350)
			.height(200)
			.margins({top: 20, right: 30, bottom: 20, left: 50})
			.dimension(timeOfDay)
			.group(timeOfDayGroup)
			.transitionDuration(500)
	        .centerBar(false)
			.brushOn(true)
			.elasticY(true)
			.gap(1)
			//.colors("#7DD4F0")
			//.x(d3.scale.linear().domain([0, 24]).rangeRound([0, 240]))
			.yAxis().ticks(10, "0,000").tickSize(5, 0);
		    //.xUnits(d3.time.minutes, 60); // Need empty val to offset first value	
			
		timeOfDayChart
			.x(d3.time.scale.utc().domain([midnight, d3.time.day.utc.offset(midnight, 1)]).rangeRound([0, 24]))
			.xUnits(d3.time.hours, 1)
			.xAxis().tickFormat(d3.time.format.utc("%-I%p"));
	
		dataCount
			.dimension(cf)
			.group(all);			
	 
	
		d3.selectAll('a#arrest').on('click', function () {
			arrestPie.filterAll();
			dc.redrawAll();
		});
		
		d3.selectAll('a#domestic').on('click', function () {
			domesticPie.filterAll();
			dc.redrawAll();
		});
	
		d3.selectAll('a#time').on('click', function () {
			timeOfDayChart.filterAll();
			dc.redrawAll();
		});			
	
		d3.selectAll('#typeDown') .on('change', function() { 
			startValue.filter(this.value);
			if (this.value == "All") {
				startValue.filterAll();
			}
			dc.redrawAll(); 
		});
	
		d3.selectAll('#locDown') .on('change', function() { 
			locationValue.filter(this.value);
			if (this.value == "All") {
				locationValue.filterAll();
			}
			dc.redrawAll(); 
		});
	
		dc.renderAll();
	
		// returns slope, intercept and r-square of the line
		function leastSquares(xSeries, ySeries) {
			var reduceSumFunc = function(prev, cur) { return prev + cur; };
		
			var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
			var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

			var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
				.reduce(reduceSumFunc);
		
			var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
				.reduce(reduceSumFunc);
			
			var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
				.reduce(reduceSumFunc);
			
			var slope = ssXY / ssXX;
			var intercept = yBar - (xBar * slope);
			var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
		
			return [slope, intercept, rSquare];
		}
	
		// calculate celeration from points along the least squares regression line
		function roundCel(num){ 
			var num_str = num.toString();
			var split_num = num_str.split('.');
			if(split_num[1]){
				var round_num = split_num[0] + '.' + split_num[1].substring(0, 2);
			}else{
				var round_num = split_num[0];
			}
			
			return round_num;
		}
		
		function rateOfChange(slope, intercept, xLength) { 
			var celeration = "";
			
			if(slope>0){
				celeration = "X" + roundCel((intercept+slope*(xLength/2))/(intercept+slope*(xLength/2-6)));				
			}else if(slope<0){
				celeration = "/" + roundCel((intercept+slope*(xLength/2-6))/(intercept+slope*(xLength/2)));
			}else{
				celeration = "X1";
			}

			return celeration;
		}

  });	

}		