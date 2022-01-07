//import './style.css';
import React from 'react';

class Chapitre1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : ''
        };
    }

    componentDidMount() {
    }
    
    render() {
        return <div>
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
        
    }
}

export default Chapitre1;
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