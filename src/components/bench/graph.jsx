import './style.css';
import React from 'react';
import dataIC from './dataIC.json';

class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : ''
        };
    }

    componentDidMount() {
        let that = this;



        const height="210";
        const width="500";

        const svg = document.getElementById("graph");
        svg.innerHTML = '<svg class="mapping" ><line class="line" x1="0" y1="400" x2="800" y2="400" /><line class="line" x1="400" y1="0" x2="400" y2="800" /></svg>';
         


        dataIC.map(function(data){
            //return <li>{movie.id} - {movie.title}</li>;
            console.log( "data : " + JSON.stringify(data));

            var node = document.createElement("svg");                 // Create a <li> node
            //var textnode = document.createTextNode("logo");         // Create a text node
            //node.appendChild(textnode); 
            node.setAttribute("class", "mapLogo");                              // Append the text to <li>
            node.setAttribute("style", "top: "+data.coordY+"px; left: "+data.coordX+"px; ");
            //node.setAttribute("viewBox", "0 0 100 100"); 
            node.setAttribute("xmlns", "http://www.w3.org/2000/svg");  

            var image = document.createElement("img");
            image.setAttribute("src", data.logo);
            image.setAttribute("width", "150px");
            node.appendChild(image); 
            document.getElementById("mapping").appendChild(node); 
          });

        //const mapping = document.getElementById("mapping");
       // mapping.innerhtml = '<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns=' + +'
       //http://www.w3.org/2000/svg"> <image href="/files/2917/fxlogo.png" x="0" y="0" height="100" width="100"/></svg>';

    /* Logo
        
    */
      
    }

    /*
    renderLineX(){
        return <svg height="210" width="500">
                <line id="line" x1="0" y1="0" x2="200" y2="200" />
            </svg>
    }
    */

    render() {
        return <div></div>
        
    }
}

export default Graph;