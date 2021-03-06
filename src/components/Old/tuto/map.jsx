//import './style.css';
import React from 'react';
import * as d3 from 'd3';

class TutoMap extends React.Component {
    constructor(props) {
        super(props);
        this.map = {};
        this.state = { data: {} }
    }
    
    componentDidMount() {
        const width = 700, height = 550;

        const path = d3.geoPath();
        
        const projection = d3.geoConicConformal() // Lambert-93
            .center([2.454071, 46.279229]) // Center on France
            .scale(2600)
            .translate([width / 2 - 50, height / 2]);
        
        path.projection(projection);
        
        const svg = d3.select('#tutoMap').append("svg")
            .attr("id", "svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "Blues");
        
        const deps = svg.append("g");

        var promises = [];
        promises.push(d3.json("./departments.json"));
        promises.push(d3.csv("./population.csv"));

        Promise.all(promises).then(function(values) {
            const geojson = values[0];
            const csv = values[1];
            
            var features = deps
                .selectAll("path")
                .data(geojson.features)
                .enter()
                    .append("path")
                    .attr('id', function(d) {return "d" + d.properties.CODE_DEPT;})
                    .attr("d", path);
    
            // Quantile scales map an input domain to a discrete range, 0...max(population) to 1...9
            var quantile = d3.scaleQuantile()
                .domain([0, d3.max(csv, function(e) { return +e.POP; })])
                .range(d3.range(9));
    
            var legend = svg.append('g')
                .attr('transform', 'translate(525, 150)')
                .attr('id', 'legend');
                
            legend.selectAll('.colorbar')
                .data(d3.range(9))
                .enter().append('svg:rect')
                    .attr('y', function(d) { return d * 20 + 'px'; })
                    .attr('height', '20px')
                    .attr('width', '20px')
                    .attr('x', '0px')
                    .attr("class", function(d) { return "q" + d + "-9"; });
                    
            var legendScale = d3.scaleLinear()
                .domain([0, d3.max(csv, function(e) { return +e.POP; })])
                .range([0, 9 * 20]);
                
            var legendAxis = svg.append("g")
                .attr('transform', 'translate(550, 150)')
                .call(d3.axisRight(legendScale).ticks(6));
                
            csv.forEach(function(e,i){
                const dept = d3.select("#d" + e.CODE_DEPT)
                    .attr("class", function(d) { return "department q" + quantile(+e.POP) + "-9"; })
                    .on("mouseover", function(d) {
                        const x = document.getElementById("d" + e.CODE_DEPT).getAttribute("style");
                        console.log("x : " +x);
                        dept.style("opacity", .9);
                        div.transition()        
                            .duration(200)      
                            .style("opacity", .9);
                        div.html("<b>R??gion : </b>" + e.NOM_REGION + "<br>"
                                + "<b>D??partement : </b>" + e.NOM_DEPT + "<br>"
                                + "<b>Population : </b>" + e.POP + "<br>")
                            .style("left", (d3.event.pageX + 30) + "px")     
                            .style("top", (d3.event.pageY - 30) + "px");

                    })
                    .on("mouseout", function(d) {
                        dept.style("opacity", 1);
                        div.style("opacity", 0);
                        div.html("")
                            .style("left", "-500px")
                            .style("top", "-500px");
                    });
            });
        });
        
        // Refresh colors on combo selection
        d3.select("select").on("change", function() {
            d3.selectAll("svg").attr("class", this.value);
        });
        
        // Append a DIV for the tooltip
        var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);
    }
render() {
    return <div id="tutoMap"></div>
  }
}

export default TutoMap;