import './style.css';
import React from 'react';
import * as d3 from 'd3';
import wdscroll_bas from './wdscroll_bas.svg';

class Type extends React.Component {
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
        var margin = {top: 350, right: 480, bottom: 350, left: 480};
        var radius = Math.min(margin.top, margin.right, margin.bottom, margin.left) - 10;
        var x = d3.scaleLinear().range([0, 2 * Math.PI]);
        var y = d3.scalePow().exponent(1.3).domain([0, 1]).range([0, radius]);
        var padding = 5;

        // var hue = d3.scaleCategory10();
        var hue = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];

        // colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];


        var luminance = d3.scaleSqrt()
                .domain([0, 1e6])
                .clamp(true)
                .range([90, 20]);
        /* var svg = d3.select("body").append("svg")
         .attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");
         var g = svg.selectAll("g")
         .data(partition.nodes(root))
         .enter().append("g");
         
         var path = g.append("path")
         .attr("d", arc)
         .style("fill", function(d) {
         return color((d.children ? d : d.parent).name);
         })
         .on("click", click);
         var text = g.append("text")
         .attr("x", function(d) {
         return y(d.y);
         })
         .attr("dx", "6") // margin
         .attr("dy", ".35em") // vertical-align
         .text(function(d) {
         return d.name;
         });*/
     
        var svg = d3.select("#type").append("svg")
                .attr("width", margin.left + margin.right)
                .attr("height", margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
  /*      var partition = d3.layout.partition()
                .sort(function(a, b) {
                    return d3.ascending(a.name, b.name);
                })
                .size([2 * Math.PI, radius]);
*/
        

        var partition = data => d3.partition()
        .size([2 * Math.PI, radius])(d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.value - a.value));

        var arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius / 2)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1 - 1);

        d3.json("./flare.json", function(error, root) {
            // Compute the initial layout on the entire tree to sum sizes.
            // Also compute the full name and fill color for each node,
            // and stash the children so they can be restored as we descend.
            partition
                    .value(function(d) {
                        return d.size;
                    })
                    .nodes(root)
                    .forEach(function(d) {
                        d._children = d.children;
                        d.sum = d.value;
                        d.key = this.key(d);
                        d.fill = this.fill(d);
                    });

            // Now redefine the value function to us e the previously-computed sum.
            partition
                    .children(function(d, depth) {

                        return depth < 2 ? d._children : null;
                    })
                    .value(function(d) {

                        return d.sum;
                    });

            var node = partition.nodes(root).slice(1);

            var center = svg.append("circle")
                    .attr("r", radius / 3);

            var abc = svg.selectAll(".arc")
                    .data(node)
                    .enter()
                    .append("g")
                    .attr("class", "arc");

            var path = abc.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) {
                        return d.fill;
                    })
                    .each(function(d) {

                        this._current = updateArc(d);
                    });

            var textEnter = abc.append("text")
                    .style("fill-opacity", 1)
                    .style("fill", "white")

                    .attr("text-anchor", "middle")
                    .attr("dy", ".2em")
                    .attr("transform", function(d) {
                        var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90;
                        return "translate(" + (arc.centroid(d)) + ")rotate(" + (angle > 90 ? 0 : 0) + ")";
                    });

            textEnter.append("tspan")
                    .attr("x", 0)
                    .text(function(d) {
                        return d.name;
                    });
            textEnter.append("tspan")
                    .attr("x", 0)
                    .attr("dy", "1em")
                    .text(function(d) {
                        return d.depth ? d.name.split(" ")[1] || "" : "";
                    });

        });

        function colour(d) {
            if (d.children) {
                // There is a maximum of two children!
                var colours = d.children.map(colour),
                        a = d3.hsl(colours[0]),
                        b = d3.hsl(colours[1]);
                // L*a*b* might be better here...
                return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
            }
            return d.colour || "#fff";
        }

        function key(d) {
            var k = [];
            let p = d;
            while (p.depth) {
                k.push(p.name);
                p = p.parent;
            }
            return k.reverse().join(".");
                
        }

        function fill(d) {
            var p = d;
            while (p.depth > 1)
                p = p.parent;
            var c = d3.lab(hue(p.name));
            c.l = luminance(d.sum);
            return c;
        }

        function arcTween(b) {
            var i = d3.interpolate(this._current, b);
            this._current = i(0);
            return function(t) {
                return arc(i(t));
            };
        }

        function updateArc(d) {
            return {depth: d.depth, x: d.x, dx: d.dx};
        }
        //d3.select(self.frameElement).style("height", margin.top + margin.bottom + "px");

    }
    
    next() {
       
    }

    render() {
    return <div id="Typo">
        <p className="arrow-top"><a href="#section1"><img src={wdscroll_bas} alt="arrow_top" /></a></p>
        
        <p className="arrow-right"><a href="#section-mapping"><img src={wdscroll_bas} alt="arrow_right" /></a></p>
    </div>
  }
}

export default Type;