// unfinished/src/components/details.jsx
import React        from 'react';
//import d3           from 'd3';

function fillDetails(props){
    //j = getDetailsKey(max2);
    let details = props;
    if (typeof(details.) == 'undefined'){
        return <div className="details" id="section-map">
            <p className="details-title">#Fake News dans le monde</p> 
            <p><img src="https://infographic.statista.com/normal/chartoftheday_14565_l_exposition_aux_fake_news_dans_le_monde_n.jpg" alt="initiative" /></p>
            <p>Et face à ce constat quelles initiatives citoyennes?</p> 
        </div>
    } // 
    return <div>
                <div className="details" id="section-map">
                    <p className="details-logo"><img src={details.logo} alt=""/></p>
                    <p className="details-title">#{details.title}</p> 
                    <p>Type {details.type}</p>
                    <p>When {details.when}</p> 
                    <p>Where {details.where}</p>
                    <p>Who {details.who}</p>  
                    <p>URL <a href={details.url} target="_blank" rel="noopener noreferrer">www</a></p>
                    <p><img src={details.img} alt="initiative" /></p>
                    <p>What {details.what}</p>
                </div>
            </div>
}

export default (props) => {
    console.log('props' + props);
    return fillDetails(props);
}