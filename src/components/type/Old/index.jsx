import './style.css';
import React from 'react';
import * as d3 from 'd3';
import wdscroll_bas from './wdscroll_bas.svg';
import Chart from './chart.jsx';

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

    }

    next() {
       
    }

    render() {
    return <div id="Typo">
        <Chart />
        <p className="arrow-top"><a href="#section1"><img src={wdscroll_bas} alt="arrow_top" /></a></p>
        <p className="arrow-right"><a href="#section-mapping"><img src={wdscroll_bas} alt="arrow_right" /></a></p>
    </div>
  }
}

export default Type;