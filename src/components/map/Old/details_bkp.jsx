// unfinished/src/components/details.jsx
import React        from 'react';
//import d3           from 'd3';

function PopupTemplate(props){
    if (typeof(props) == 'undefined'){
        return <div className="details" id="section-map">
            <p className="details-title">#Fake News dans le monde</p> 
            <p><img src="https://infographic.statista.com/normal/chartoftheday_14565_l_exposition_aux_fake_news_dans_le_monde_n.jpg" alt="initiative" /></p>
            <p>Et face à ce constat quelles initiatives citoyennes?</p> 
        </div>
    } 
    return <div>
                <div className="details" id="section-map">
                    <p className="details-logo"><img src={props.logo} alt=""/></p>
                    <p className="details-title">#{props.title}</p> 
                    <p>Type {props.type}</p>
                    <p>When {props.when}</p> 
                    <p>Where {props.where}</p>
                    <p>Who {props.who}</p>  
                    <p>URL <a href={props.url} target="_blank" rel="noopener noreferrer">www</a></p>
                    <p><img src={props.img} alt="initiative" /></p>
                    <p>What {props.what}</p>
                </div>
                <div id="next">
                    <input type="button" value = "next" onClick="" id = "next" />
                </div>
            </div>

          
}

export default (props) => {
    console.log('props' + props);
    return PopupTemplate(props)
}