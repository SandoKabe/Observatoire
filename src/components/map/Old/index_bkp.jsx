import './style.css';
import React from 'react';
import Datamap from '../../../node_modules/datamaps/dist/datamaps.world.min.js';
import Details from './details.jsx';
import wdscroll_bas from './wdscroll_bas.svg';

class Map extends React.Component {
    constructor(props) {
      super(props);
      this.map = {};
      this.state = { data: {} };
    }
    
    componentDidMount() {
       var that = this;
       this.map = new Datamap({
        element: document.getElementById("container"),
        // responsive: true,
        geographyConfig: {
            popupOnHover: false,
            highlightOnHover: false,
            borderColor: '#000000',
            borderWidth: 0.5
        },
        fills: {
            defaultFill: '#354D4A', 
            RUS: '#E6BE8A',
            gt50: '#E14972',
            eq50: '#4647B9',
            lt25: '#E6BE8A',
            gt75: '#E6BE8A',
            lt50: '#E6BE8A',
            eq0: '#E6BE8A',
            gt500: '#E6BE8A'
        },
        data: {
            'NLD': { fillKey: 'eq50' },
            'FRA': { fillKey: 'eq50' },
            'USA': { fillKey: 'eq50' },
            'SWE': { fillKey: 'eq50' },
            'CAN': { fillKey: 'eq50' },
            'CHE': { fillKey: 'eq50' },
            'MEX': { fillKey: 'eq50' },
          },
        bubblesConfig: {
            borderWidth: 0.5,
            borderOpacity: 1,
            borderColor: '#FFFFFF'
        }
        });
        var dataIniti = JSON.stringify(getDataFromJson());
        var response = {};
        var responseJson = {};
/*
        function getDataFromJson() {
            return fetch('./init-citoy.json')
              .then((response) => response.json())
              .then((responseJson) => {
                return responseJson;
              })
              .catch((error) => {
                console.error(error);
              });
          };
*/
        async function getDataFromJson() {
            try {
            let response = await fetch(
                './init-citoy.json'
            );
            let responseJson = await response.json();
            return responseJson;
            } catch (error) {
            console.error(error);
            }
        }
        this.map.bubbles(
            [{
                name: "France",
                radius: 30,
                centered: "ESP",
                country: "FRA",
                initiative: 9,
                nbJeu: 1,
                fillKey: "FRA",
                date: "2018-02-21",
                content: {
                    title: "Fake News Live",
                    type: "Game",
                    logo: "https://yt3.ggpht.com/a-/AN66SAxEa_OAqIjYUw-XzSsYl81dZnsG74_Cz4s1Iw=s288-mo-c-c0xffffffff-rj-k-no",
                    when: "08.09.2018",
                    where: "France",
                    who: "Aymeric d\"Afflon (Ulule.com)",
                    url: "https://www.youtube.com/watch?v=ozpDxrf9fI0",
                    img: "https://img.ulule.com/display/9a38694139805aaf5aaa3e396b61defe2980a4b6/thumbnail/640x360/presales/3/3/8/75833/fnews_banniere_ulule_big.yrFd8V3mLbZW.jpg?upscale=1",
                    what: "Le FUN MODE : c\"est notre version originale, dans laquelle vous pouvez annoncer les News les plus farfelues. On se concentre sur l\"impro collective, l\"écoute et l\"humour. Le ou la Rédac Chef joue et peut aussi intervenir pour réguler la partie.Le SERIOUS GAME MODE : dans lequel le ou la Rédacteur en Chef décide du niveau de qualité et de véracité des nouvelles annoncées par les présentateurs et présentatrices. Il peut refuser, réfuter, et exiger une reformulation plus précise, voire demander vos sources et les vérifier sans délai sur le web."
                }
            },
            {
            name: "Nederland",
            radius: 10,
            centered: "NLD",
            country: "NLD",
            initiative: 1,
            nbJeu: 1,
            fillKey: "NLD",
            date: "2018-02-21",
            content: {
                title: "Bad News",
                type: "Game",
                logo: "https://www.getbadnews.com/wp-content/themes/getbadnews/static/assets/logo-mobile.png",
                when: "21.02.2018",
                where: "Pays-bas",
                who: "Cambridge Social Decision",
                url: "https://getbadnews.com/#intro",
                img: "https://cdn.vox-cdn.com/thumbor/5vjZAYmPtADiwYFj-xzMt_np_aw=/0x0:1043x681/920x613/filters:focal(456x224:622x390)/cdn.vox-cdn.com/uploads/chorus_image/image/58772853/Screen_Shot_2018_02_21_at_2.16.22_PM.0.png",
                what: "How does Bad News work? In this game you take on the role of fake news-monger. Drop all pretense of ethics and choose the path that builds your persona as an unscrupulous media magnate. But keep an eye on your ‘followers’ and ‘credibility’ meters. Your task is to get as many followers as you can while slowly building up fake credibility as a news site. But watch out: you lose if you tell obvious lies or disappoint your supporters! Bad News is a Twine-style game designed by members of the Cambridge Social Decision-Making Lab and media literacy group Drog."
            }
        },
        {
            name: "United-States",
            radius: 35,
            centered: "USA",
            country: "USA",
            initiative: 7,
            nbJeu: 3,
            fillKey: "USA",
            date: "2018-02-21",
            content: {
                title: "Factitious Game",
                type: "Game",
                logo: "http://factitious.augamestudio.com/assets/icons/fact2018-errata/workmarkBig.svg",
                when: "19.08.2018",
                where: "Washington, USA",
                who: "Game Lab University Washington, d\"après une idée originale de Maggie Farley Journaliste ",
                url: "http://factitious.augamestudio.com/#/",
                img: "https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fs.newsweek.com%2Fsites%2Fwww.newsweek.com%2Ffiles%2Fstyles%2Fembed-lg%2Fpublic%2F2017%2F07%2F04%2Ffactitious-fake-news-game.jpg&u=https://www.newsweek.com/sites/www.newsweek.com/files/styles/embed-lg/public/2017/07/04/factitious-fake-news-game.jpg",
                what: "The game\"s interface mimics the dating app Tinder, which made swiping famous. On a phone, players swipe left when they think the article in front of them is fake, and right when they believe it\"s real. Depending on how you swipe, Factitious provides feedback. Whether your swipe was correct or incorrect, whether the article cites sources that can be checked, whether the story includes direct quotes from credible sources. Stumped? If so, there is a clue. You can click to reveal the article\"s source.  "          
            }
        },
        {
            name: "Suede",
            radius: 10,
            centered: "SWE",
            country: "SWE",
            initiative: 1,
            nbJeu: 1,
            fillKey: "SWE",
            date: "2018-02-21",
            content: {
                title: "Fakeittomakeitgame",
                type: "Game",
                logo: "https://www.fakeittomakeitgame.com/images/wide_game_logo.png ",
                when: "26.03.2017",
                where: "Suede",
                who: "Amanda Warner",
                url: "https://www.fakeittomakeitgame.com/ ",
                img: "https://cdn.vox-cdn.com/thumbor/d7GB4mbwEr6OB9K-qAx6kIH8asc=/0x0:1223x582/920x613/filters:focal(303x170:497x364)/cdn.vox-cdn.com/uploads/chorus_image/image/53916251/Screen_Shot_2017_03_27_at_9.33.53_AM.0.png",
                what: "Become advocates in stemming the spread of misinformation Better distinguish between fake and real news stories and identify when parts of a news story are false or misleading Believe that fake news does exist Understand the financial incentives for creating fake news Understand how fake news is written and distributed appeal to specific emotions (fear, anger, etc.) confirmation bias Identify common techniques used when crafting and distributing fake news, including... partial truths misleading specificity"
                }
        },
        {
            name: "Canada",
            radius: 10,
            centered: "CAN",
            country: "CAN",
            initiative: 1,
            nbJeu: 1,
            fillKey: "CAN",
            date: "2018-02-21",
            content: {
                title: "Real or Fake",
                type: "Game",
                logo: "https://kids.nationalgeographic.com/etc/designs/kids/_jcr_content/home/navbar/logo.ngsversion.5bb419dd.img.png/1399495763637.png",
                when: "21.02.2018",
                where: "Canada",
                who: "National Geographic Kids",
                url: "https://kids.nationalgeographic.com/videos/real-or-fake/#real_or_fake__ep_1.mp4",
                img: "https://kids.nationalgeographic.com//content/dam/natgeo/video/mpx/kids/r/re/rea/real-or-fake--ep-1.ngsversion.1538941317586.mp4/jcr:content/renditions/cq5dam.thumbnail.140.100.png ",
                what: "Quizz en plein air, pour les enfants. Trouver le vrai du faux."
            }
        },
        {
            name: "Suisse",
            radius: 10,
            centered: "CHE",
            country: "CHE",
            initiative: 1,
            nbJeu: 1,
            fillKey: "CHE",
            date: "2018-02-21",
            content: {
                title: "Bad News",
                type: "Game",
                logo: "https://img.itch.zone/aW1hZ2UyL3VzZXIvNDQ4Njk2Lzk1NTQ4NS5wbmc=/original/pHbr6n.png",
                when: "21.02.2018",
                where: "Suisse",
                who: "Golden Sloth Studio",
                url: "https://goldensloth.itch.io/fakenews",
                img: "https://img.itch.zone/aW1hZ2UvMjk0NDc1LzE0MzcxMTMucG5n/315x250%23c/JCYCBW.png",
                what: "Vous êtes un rédacteur en chef et vous devez trier les news qu\"on vous a donné. Vous devez vous fier à votre instinct pour tamponner les articles que vous considérez vrai et ceux que vous considérez faux. Jeux inspirée de tout les articles du journal Le Temps qui sont tous implémenter dans le jeu."
            }
        },
        {
            name: "Mexique",
            radius: 10,
            centered: "MEX",
            country: "MEX",
            initiative: 3,
            nbJeu: 0,
            fillKey: "MEX",
            date: "2018-02-21",
            content: {
                title: "Video Youtube",
                type: "Initiative",
                logo: "",
                when: "28.03.2018",
                where: "Mexico",
                who: "A student movement, #YoSoy132",
                url: "https://www.youtube.com/watch?v=gI6fE75Bnc4",
                img: "https://i.ytimg.com/vi/gI6fE75Bnc4/maxresdefault.jpg",
                what: "A student movement, #YoSoy132, sought to tackle Mexico’s fake news problem. Lou explains its impact, and how politicians and corporate interests have destroyed Mexican media. La corruption des médias et le rôle du gouvernement dans les médias."
            }
        }
    ]
        , {
        popupTemplate: function(geo, data) {
            return '<div class="hoverinfo">' + data.name + ' ' + data.initiative + ' initiative(s) dont '  + data.nbJeu + ' Jeu(x)</div>'
        }
        });

        for( var i = 0; i <= this.map.bubbles.length+2; i++ ){
            document.getElementsByTagName("circle")[i].addEventListener('click', function(bubble) {
                var initJson = JSON.parse(bubble.srcElement.dataset.info);
                var initData = initJson.content;
                console.log(bubble.srcElement.dataset.info);
                console.log(initData);
                that.setState({ data: initData });
                console.log(this.setState);
                
            })
        };

    }

    componentWillUnmount() {
    }
  
  
    render() {
      return <div>
                <p className="arrow-top"><a href="#section1"><img src={wdscroll_bas} alt="arrow_top" /></a></p>
                <Details {...this.state}/>
                <p className="arrow-right"><a href="#section-mapping"><img src={wdscroll_bas} alt="arrow_right" /></a></p>
            </div>
    }
  }
  
  export default Map;