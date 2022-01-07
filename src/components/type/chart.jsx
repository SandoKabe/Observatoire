//import './style.css';
import React from 'react';
import * as d3 from 'd3';

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : '',
            svgNodeRender : ''
        };
    }

    componentDidMount() {
        let that = this;
        d3.json("./typologie.json").then(function(json) {
        
            const data = json
        
            console.log("data : " + data);
              
            const partition = data => d3.partition()
                .size([2 * Math.PI, radius])(d3.hierarchy(data)
                .sum(d => d.size)
                .sort((a, b) => b.value - a.value));
            const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateSpectral, data.children.length + 1));
            const format = d3.format(",d");
            const width = 932;
            const radius = width / 2;
            const arc = d3.arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                .padRadius(radius / 2)
                .innerRadius(d => d.y0)
                .outerRadius(d => d.y1 - 1);

            const root = partition(data);    
         
            const svg = d3.select("#Type").append("svg")
                .style("width", "900px")
                .style("height", "900px")
                .style("padding", "10px")
                .style("font", "16px sans-serif")
                .style("color","#ffff99" )
                .style("box-sizing", "border-box");
            
              
            const g = svg.append("g");
            
            g.append("g")
                .style("color","#ffff99" )
                .attr("fill-opacity", 0.6)
                .selectAll("path")
                .data(root.descendants().filter(d => d.depth))
                .enter().append("path")
                .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
                .attr("d", arc)
                .append("title")
                .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
          
            g.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
                .enter().append("text")
                .attr("transform", function(d) {
                  const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                  const y = (d.y0 + d.y1) / 2;
                  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
                })
                .attr("dy", "0.35em")
                .text(d => d.data.name)
                .style("color","#ffff99" );
        

                // test
                //document.body.appendChild(svg.node());
            
                //console.log( g.node() );
                
                //const box = g.node().getBBox(); Bug with chrome
                const box = g.node().getBoundingClientRect();
        
                //console.log( " box : " + JSON.stringify(box) );
                       
                svg
                    .attr("width", box.width) 
                    .attr("height", box.height) 
                    .attr("viewBox","-650 -550 1200 1200" ); //`${box.x} ${box.y} ${box.width} ${box.height}`

                //svg.node() replace by
                //document.body.appendChild(svg.node());
            });
    }

    render() {
        return <div id="Type"></div>
        
    }
}

export default Chart;