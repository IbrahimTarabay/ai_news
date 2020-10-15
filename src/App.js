import React, {useState,useEffect} from 'react';
import NewsCards from './components/NewsCards/NewsCards';

import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '1d89599d477d25d43bbe0c896642b5c92e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
   const [newsArticles, setNewsArticles] = useState([]); 
  
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
      <h1>Alan AI News Application</h1>
    </div>
  );
}

export default App;
