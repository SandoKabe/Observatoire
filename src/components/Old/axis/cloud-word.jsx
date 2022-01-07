import './wordcloud.css'
import React       from 'react';
import wordcloud from './wordcloud.svg';
import wdscroll_bas from './wdscroll_bas.svg';

export default class CloudWord extends React.Component{
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return <div id="section1">
          <div className="w3-container w3-center w3-animate-zoom">
            <img src={wordcloud} alt="Intro"/>
        </div>
        <p className="legende"><a href="https://www.jasondavies.com/wordcloud/" target="_blank" rel="noopener noreferrer">https://www.jasondavies.com/wordcloud</a></p>
        <p className="arrow"><a href="#section-map"><img src={wdscroll_bas} alt="arrow_down" /></a></p>
      </div>
    }
}