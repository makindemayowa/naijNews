import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getArticles from '../actions/articleActions';
import Card from './ArticleCard.jsx';
import articleStore from '../stores/articleStore';
import { Login } from './GoogleLogin.jsx';

/**
 * Create a react component
 * @export
 * @class Articles
 * @extends {React.Component}
 */
export default class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.sortArticle = this.sortArticle.bind(this);
    this.setArticlesList = this.setArticlesList.bind(this);
    this.sortArticleButton = this.sortArticleButton.bind(this);
  }

  /**
   * @method componentDidMount
   * Adds an event Listener to the Articles Store and fires when the component is fully mounted.
   *
   * @returns {void}
   * @memberOf Articles
   */
  componentDidMount() {
    articleStore.on('change', this.setArticlesList);
    getArticles(this.props.match.params.sourceId);
  }

  /**
   * @method componentWilUnMount
   * Removes event listener from the Articles store.
   *
   * @return {void}
   * @memberOf Articles
   */
  componentWillUnmount() {
    articleStore.removeListener('change', this.setArticlesList);
  }

  /**
   * @method setArticlesList
   * gets the list of news Articles and sets the state.
   *
   * @return {void}
   * @memberOf Articles
   */
  setArticlesList() {
    this.setState({
      articles: articleStore.getArticles(),
    });
  }

  /**
   * @method sortArticle
   * calls an action getArticles on selecting the sort parameter
   *
   * @param {any} evt
   * @memberOf Articles
   */
  sortArticle(evt) {
    getArticles(this.props.match.params.sourceId, evt.target.value);
  }

  /**
   * @method sortArticleButton
   * maps the available sort parameters into an input tag.
   *
   * @return {void}
   * @memberOf Articles
   */
  sortArticleButton() {
    const sortOptions = this.props.match.params.sorts.split(',');
    return (
      <form className="sort">
        <span>Sort articles by: </span>
        {sortOptions.map(sortType => (
          <span key={sortType}>
            <input
              type="radio"
              name="sort"
              value={sortType}
              className="radio"
              onClick={this.sortArticle}
            />
            {sortType.toLowerCase()}
          </span>
          ))}
      </form>
    );
  }

  /**
   * @method render
   * Render react component
   *
   * @memberOf Articles
   * @returns {void}
   * @memberOf Articles
   */
  render() {
    // check if a users details are present in the local storage.
    if (localStorage.user) {
      if (this.state.articles) {
        let articleNodes;
        // check if the articles array returned is not empty
        if (this.state.articles.length) {
          articleNodes = this.state.articles.map(article => (
            <Card article={article} key={article.url} />
          ));
        } else {
          return <div> Loading... </div>;
        }
        return (
          <div className="mainBody">
            <MuiThemeProvider>
              <div>
                <div>{this.sortArticleButton()}</div>
                {articleNodes}
              </div>
            </MuiThemeProvider>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="loggedOut">Please sign in to view</div>
        <div className="signInToView">
          {Login}
        </div>
      </div>
    );
  }
}

Articles.defaultProps = {
  match: null,
};
Articles.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};
