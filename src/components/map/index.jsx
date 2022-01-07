import './style.css';
import React from 'react';
import * as d3 from 'd3';
import Details from './details.jsx';
import wdscroll_bas from './wdscroll_bas.svg';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.map = {};
        this.next = this.next.bind(this);
        this.state = { data: []
            , detailsByCountry: []
            , indiceInit: 0
            }
    }
    
    componentDidMount() {
        let that = this;
        
        //const width = document.getElementById("container").offsetWidth * 0.7,
        const width = 900,
		height = 600,
		//legendCellSize = 20,
		// colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];
        //colors = ['#fee6e8', '#fdb5bb', '#fb838d', '#fa5260', '#f82032', '#df0719', '#ad0513', '#7c040e', '#4a0208', '#190103'];
        //colors = ['#f8e6ff', '#e9b3ff', '#db80ff', '#cc4dff', '#be1aff', '#a400e6', '#8000b3', '#5b0080', '#37004d', '#12001a'];
        colors = ['#b3ffff', '#80ffff', '#4dffff', '#1affff', '#00e6e6', '#00b3b3', '#008080', '#004d4d', '#003333'];


        /*
        var zoom = d3.behavior.zoom()
            .translate([0, 0])
            .scale(1)
            .scaleExtent([1, 8])
            .on("zoom", zoomed);
        */

        const svg = d3.select('#svgContainer').append("svg") //Map
            .attr("id", "svg")
            //.attr("width", width)
            //.attr("height", height)
            .attr("class", "svg");
            /*
            //.call(zoom);
            .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform)
            }));
            */


        // Define projection property
        const projection = d3.geoNaturalEarth1()
        .scale(.4)
        .center([-75.25, 49,45])
        //.fitExtent([[20, 20], [940, 1180]], land);
        .translate([0, 0]);
        
        // And a path linked to it
        const path = d3.geoPath()
            .pointRadius(2)
            .projection(projection);

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .style("fill", "#c1d3b8")
            .style("font-weight", "300")
            .style("font-size", "16px")
            .text("Citizen Initiatives against Fake News");

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 50)
            .attr("text-anchor", "middle")
            .style("fill", "#929292") //    
            .style("font-weight", "200")
            .style("font-size", "12px")
            .text("(source : En cours)");

        const cGroup = svg.append("g");

        var promises = [];
        promises.push(d3.json("./world-countries-no-antartica.json"));
        promises.push(d3.csv("./dataIC.csv"));

        Promise.all(promises).then(function(values) {
            const geojson = values[0];
            const scores = values[1];
        
            var b  = path.bounds(geojson),
                s = .80 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    
            projection
                .scale(s)
                .translate(t);
            
            cGroup.selectAll("path")
                .data(geojson.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("id", function(d) {return "code" + d.id; })
                .attr("class", "country");

            const min = d3.min(scores, function(e) { return +e.score; }),
                max = d3.max(scores, function(e) { return +e.score; });
            var quantile = d3.scaleQuantile().domain([min, max])
                .range(colors);

            var legend = addLegend(colors);
            var tooltip = addTooltip();

            scores.forEach(function(e,i) {
                var countryPath = d3.select("#code" + e.code);
                countryPath
                    .attr("scorecolor", quantile(+e.score))
                    .style("fill", function(d) { return quantile(+e.score); })
                    .on("mouseover", function(d) {
                        countryPath.style("fill", "#e96767"); // 9966cc
                        tooltip.style("display", null);
                        tooltip.select('#tooltip-country')
                            .text(shortCountryName(e.frenchCountry));
                        tooltip.select('#tooltip-score')
                            .text(e.score);
                        /*legend.select("#cursor")
                            .attr('transform', 'translate(' + (legendCellSize + 5) + ', ' + (getColorIndex(quantile(+e.score)) * legendCellSize) + ')')
                            .style("display", null);
                            */
                    })
                    .on("click", function(d) {
                        countryPath.style("fill", "#e96767"); //9966cc
                        getScoreByCountry(scores,e.code);                       
                        // console.log(details);
                    })
                    .on("mouseout", function(d) {
                        countryPath.style("fill", function(d) { return quantile(+e.score); });
                        tooltip.style("display", "none");
                        //legend.select("#cursor").style("display", "none");
                    })
                    .on("mousemove", function(d) {
                        var mouse = d3.mouse(this);
                        tooltip.attr("transform", "translate(" + mouse[0] + "," + (mouse[1] - 75) + ")");
                    });
            });

        });// End Promise

        function shortCountryName(country) {
            return country.replace("Démocratique", "Dem.").replace("République", "Rep.");
        }

        function addLegend(colors) {
            // console.log("legende en bas à droite");
            
            var legendCellSize = 20;
            var xVal = 20 * legendCellSize;
            var yVal = height - 200;
            var xParam = function(d) { return 300 + d * legendCellSize; };
            var xParam2 = function(d) { return 330 + d * legendCellSize; };
            //console.log("xParam" + xParam );

            var legend = svg.append('g')
            .attr('transform', 'translate(50, 600)')
            .attr('id', 'legend');
			
		legend.selectAll()
			.data(d3.range(colors.length))
			.enter().append('svg:rect')
				.attr('height', legendCellSize + 'px')
				.attr('width', legendCellSize + 'px')
				.attr('x', function(d) { return d*20; })
				.attr('y', -30)
				.attr('class', 'legend-cell')
				.style("fill", function(d) { return colors[d]; })
				.on("mouseover", function(d) {
					legend.select("#cursor")
						//.attr('transform', 'translate(' + (legendCellSize + 5) + ', ' + (d * legendCellSize) + ')')
						//.style("display", null);
					d3.selectAll("path[scorecolor='" + colors[d] + "']")
						.style('fill', "#9966cc");
				})
				.on("mouseout", function(d) {
					legend.select("#cursor")
						.style("display", "none");
					d3.selectAll("path[scorecolor='" + colors[d] + "']")
						.style('fill', colors[d]);
				});
			
                legend.append('svg:rect')
                    .attr('y', 50)
                    .attr('height', legendCellSize + 'px')
                    .attr('width', legendCellSize + 'px')
                    .attr('x', xParam)
                    .style("fill", "#999");
                    
                legend.append("text")
                    .attr("x", 20)
                    .attr("y", 68)
                    .style("font-size", "13px")
                    .style("color", "#929292")
                    .style("fill", "#929292")
                    .text("données manquantes");
                
                
                legend.append("polyline")
                    .attr("points", legendCellSize + ",0 " + legendCellSize + "," + legendCellSize + " " + (legendCellSize * 0.2) + "," + (legendCellSize / 2))
                    .attr("id", "cursor")
                    .style("display", "none")
                    .style('fill', "#9966cc");
                    
                        
                var legendScale = d3.scaleLinear().domain([0, 20]) // min, max
                    .range([0, colors.length * legendCellSize]);

                var legendAxis = legend.append("g")
                    //.attr("class", "axis")
                    .attr("y", 50)
                    //.attr('x', xParam)
                    .call(d3.axisBottom(legendScale))

           /*
            var xVal = width - 300;
            var yVal = height - 200;
            var legend = svg.append('g')
            .attr('transform', 'translate(40, 50)');

            legend.append('svg:rect')
			.attr('y', yVal)
			.attr('height', '20px')
			.attr('width', '200px')
            .attr('x', xVal)
            //.attr("xlink:href", "./gradient.png");
            .style("fill", function(d) { return colors[d]; });
            
            //.attr("class", "legend");
			//.style("fill", "#999");
			
            legend.append("text")
                .attr("x", xVal)
                .attr("y", (yVal -10))
                .style("font-size", "13px")
                .style("color", "#929292")
                .style("fill", "#929292")
                .text("Initiatives citoyennes");

            var legendScale =  d3.scaleLinear()
            .domain([0, 20]) //min, max
            .range([0, 200]);
        
            legend.append("g")
                .attr("class", "axis")
                .attr('transform', 'translate('+ xVal +', ' + (yVal + 25) +')')
                .call(d3.axisBottom(legendScale));
            */

        return legend;
        
        };

        function getScoreByCountry(scores, countryCode){
            let detailsByCountry =[];
            let j = 0;
            scores.forEach(function(e,i) {
                if ( e.code === countryCode){
                    detailsByCountry[j] = e;
                    j++;
                }
            });
            that.setState({ data: detailsByCountry[0]
                        ,  detailsByCountry: detailsByCountry});
        };
        function addTooltip() {
            var tooltip = svg.append("g") // Group for the whole tooltip
                .attr("id", "tooltip")
                .style("display", "none");
            
            tooltip.append("polyline") // The rectangle containing the text, it is 210px width and 60 height
                .attr("points","0,0 210,0 210,60 0,60 0,0")
                .style("fill", "#222b1d") // 
                .style("stroke","black")
                .style("opacity","0.9")
                .style("stroke-width","1")
                .style("padding", "1em");
            
            tooltip.append("line") // A line inserted between country name and score
                .attr("x1", 40)
                .attr("y1", 25)
                .attr("x2", 160)
                .attr("y2", 25)
                .style("stroke","#929292")
                .style("stroke-width","0.5")
                .attr("transform", "translate(0, 5)");
            
            var text = tooltip.append("text") // Text that will contain all tspan (used for multilines)
                .style("font-size", "13px")
                .style("fill", "#c1d3b8")
                .attr("transform", "translate(0, 20)");
            
            text.append("tspan") // Country name udpated by its id
                .attr("x", 105) // ie, tooltip width / 2
                .attr("y", 0)
                .attr("id", "tooltip-country")
                .attr("text-anchor", "middle")
                .style("font-weight", "600")
                .style("font-size", "16px");
            
            text.append("tspan") // Fixed text
                .attr("x", 105) // ie, tooltip width / 2
                .attr("y", 30)
                .attr("text-anchor", "middle")
                .style("fill", "929292")
                .text("Score : ");
            
            text.append("tspan") // Score udpated by its id
                .attr("id", "tooltip-score")
                .style("fill","#c1d3b8")
                .style("font-weight", "bold");
            
            return tooltip;
        };
 
    }
    
    next() {
        var indice = this.state.indiceInit;
        indice++;
        var countryToSend = this.state.detailsByCountry;
        var nbInit = countryToSend.length;
        if ( indice >= nbInit) {
            indice = 0;
        }
        console.log(" nbInit" + nbInit);
        console.log(" indice" + indice);
        //console.log(countryToSend[indice]);
        this.setState({ data: countryToSend[indice] });
        this.setState({ indiceInit: indice });
    }

    getDetailsData() {
        var details = {};
        // details['data'] = this.state.data;
        // details['next'] = this.next;
        // return details;
    }   

    render() {
    return <div id="Map">
            <Details data={ this.state.data } next={ this.next } />
            <div id="svgContainer"></div>
           </div>
  }
}

export default Map;