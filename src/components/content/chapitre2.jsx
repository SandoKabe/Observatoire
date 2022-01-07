//import './style.css';
import React from 'react';

class Chapitre2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : ''
        };
    }

    componentDidMount() {
    }
    
    render() {
        return <div id="analyse">
      Chapitre 2 Titre
        <div id="contentAnalyse"></div>
        Description
        Image ou commentaire
      </div>  
    }
}

export default Chapitre2;
/*
const Chapitre1 = React.createClass({
    render() {

        return (
            <div>
                <div id="introduction">
                Petit texte d'introduction
                Titre
                Sous Titre
                Image 
                Description
            </div>
            <div id="description"></div>
            <p>Chapitre 1 Titre</p>
            <div id="contentDesc"></div>
            <p>Description</p>
            <p>Image ou commentaire</p>
            </div>
        );
    }
});

module.exports = Chapitre1;
*/