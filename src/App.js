import React, {useState,useEffect} from 'react';
import NewsCards from './components/NewsCards/NewsCards';

import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './App.styles.js';

const alanKey = '1d89599d477d25d43bbe0c896642b5c92e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
   const [newsArticles, setNewsArticles] = useState([]);
   const classes = useStyles(); 
  
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command,articles}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
        }
      }
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://mpng.subpng.com/20180425/dxq/kisspng-airplane-flight-world-globe-global-connection-5ae0338cad33f9.9808024215246427007095.jpg" className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles}/>
    </div>
  );
}

export default App;
