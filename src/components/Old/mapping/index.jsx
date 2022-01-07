import './style.css';
import React       from 'react';
import Topo from './topo.PNG';
import wdscroll_bas from '../../wdscroll_bas.svg';

export default class Mapping extends React.Component{
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return <div id="section-mapping" className="mapping">
          <p className="mapping-arrow-left"><a href="#section-map"><img src={wdscroll_bas} alt="arrow_down" /></a></p>
          <p className="mapping-title">Typologie des initiatives citoyennes</p>
          <p className="mapping-separation"> </p>
          <div className="mapping-card">
            <img src={Topo} alt="Intro"/>
          
          <div className="mapping-legende">
            <span> Jeu-pro-utilisateur-ludique</span><br/>
            <span> Jeu-pro-utilisateur-pedagogique</span><br/>
            <span> Jeu-pro-colporteur</span><br/>
            <span> Jeu-decrypt-ludique</span><br/>
            <span> Jeu-decrypt-pedagogique</span><br/>
            <span> init-surveillance-politique-factuel</span><br/>
            <span> init-surveillance-politique-satirique</span><br/>
            <span> init-surveillance-RS-factuel</span><br/>
            <span> init-surveillance-RS-satirique</span><br/>
            <span> init-surveillance-media-factuel</span><br/>
            <span> init-surveillance-media-satirique</span><br/>
            <span> init-pedagogique-decryptage-libre</span><br/>
            <span> init-pedagogique-decryptage-prive</span><br/>
            <span> init-pedagogique-manuel-libre</span><br/>
            <span> init-pedagogique-manuel-prive</span><br/>
          </div>
          </div>
      </div>
    }
}