import React from 'react';
import articleContent from './article-content';
import ArticlesList from './ArticlesList';


const ArticlesListPage = () => (
    <React.Fragment>
        <h1>Articles</h1>
        <ArticlesList articles={articleContent}/>
       
    </React.Fragment>
);

export default ArticlesListPage;