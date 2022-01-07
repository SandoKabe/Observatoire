import React, { Component } from 'react';
import './App.css';
/*
import CloudWord    from './components/axis/cloud-word.jsx';  
*/
// Obseratoire
//import Chapitre1 from './components/content/chapitre1.jsx';
import Map    from './components/map/index.jsx'; 
//import Chapitre2 from './components/content/chapitre2.jsx';
import Chart    from './components/type/chart.jsx'; 
import Graph    from './components/bench/graph.jsx'; 
//import Sequence from './components/Sequence.jsx'; <div><Sequence /></div>
/*
import Mapping from './components/mapping/index.jsx';
import Tuto from './components/tuto/index.jsx';
import TutoMap from './components/tuto/map.jsx';
import Mapmonde from './components/tuto/mapmonde.jsx';
*/
/*
        <div><CloudWord /></div>
        <div><Mapping /></div>
        <div><TutoMap /></div>
        <div><Mapmonde /></div>
        <div><Chapitre1 /></div>
        <div><Map /></div>
        <div><Chapitre2 /></div>
*/

class App extends Component {
  render() {
    return (
      <div>
        <div><Map /></div>
        <div><Chart /></div>
        <div><Graph /></div>
      </div>
      
    );
  }
}

export default App;