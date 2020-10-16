import React, {useState,useEffect} from 'react';
import NewsCards from './components/NewsCards/NewsCards';

import wordsToNumbers from 'words-to-numbers';

import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './App.styles.js';

import logo from './logo.png';

const alanKey = '1d89599d477d25d43bbe0c896642b5c92e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
   const [newsArticles, setNewsArticles] = useState([]);
   const classes = useStyles(); 
   const [activeArticle,setActiveArticle] = useState(-1);
  
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command,articles, number}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);//to set from beginning when he start to read other news
        }else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle+1);  
        }else if(command === 'open'){

          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber > 20){
            alanBtn().playText('please try that again.')
          }else if(article){
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          }
        }
      }
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={logo} className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
