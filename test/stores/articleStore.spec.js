import React from 'react';
import { expect } from 'chai';
import Store from '../../src/js/stores/articleStore';
import { EventEmitter } from 'events';
import dispatcher from '../../src/js/dispatcher';

describe('Articles Store', () => {
  const apiReponse = {
    status: 'ok',
    source: 'techcrunch',
    sortBy: 'top',
    articles: [
      {
        author: 'Darrell Etherington',
        title: 'SpaceX successfully launches its heaviest geostationary orbital payload yet',
        description: 'SpaceX launched a Falcon 9 rocket carrying a payload from communications satellite operate Inmarsat, the fourth in a constellation created to provide..',
        url: 'https://techcrunch.com/2017/05/15/spacex-successfully-launches-its-heaviest-geostationary-orbital-payload-yet/',
        urlToImage: 'https://tctechcrunch2011.files.wordpress.com/2017/05/spacex-launch-may-15-17-compressor.gif?w=680&h=376&crop=1',
        publishedAt: '2017-05-15T23:37:31Z',
      },
      {
        author: 'Lucas Matney',
        title: 'UploadVR sued over ‘rampant’ sexual behavior in the workplace and wrongful termination',
        description: 'UploadVR is being sued by the company’s former Director of Digital and Social Media for sexual harassment, sex and gender discrimination and wrongful..',
        url: 'https://techcrunch.com/2017/05/15/uploadvr-sued-over-rampant-sexual-behavior-in-the-workplace-and-wrongful-termination/',
        urlToImage: 'https://tctechcrunch2011.files.wordpress.com/2017/05/upload_office.jpeg?w=764&h=400&crop=1',
        publishedAt: '2017-05-15T22:04:00Z',
      },
      {
        author: 'Romain Dillet',
        title: 'Intel could be about to release a very expensive Core i9 CPU',
        description: 'Computex is right around the corner. While we don’t generally cover PC component updates, this leak about Intel’s plan is interesting. The company is..',
        url: 'https://techcrunch.com/2017/05/15/intel-could-be-about-to-release-a-very-expensive-core-i9-cpu/',
        urlToImage: 'https://tctechcrunch2011.files.wordpress.com/2016/05/ioactive-cpu.png?w=764&h=400&crop=1',
        publishedAt: '2017-05-15T19:59:51Z',
      },
      {
        author: 'Matthew Lynley',
        title: 'WeWork’s Adam Neumann on how to hit $1B in revenue with a careful balance',
        description: 'WeWork, which is said to be raising as much as $4 billion at a valuation of more than $20 billion, is still on its way to hitting $1 billion in annual revenue..',
        url: 'https://techcrunch.com/2017/05/15/weworks-adam-neumann-on-how-to-hit-1b-in-revenue-with-a-careful-balance/',
        urlToImage: 'https://tctechcrunch2011.files.wordpress.com/2017/05/tcdisrupt-ny17-8732.jpg?w=764&h=400&crop=1',
        publishedAt: '2017-05-15T18:34:27Z',
      },
    ],
  };
  it('should exist', () => {
    expect(Store).to.exist;
  });

  it('should be an object', () => {
    expect(Store).to.be.an('object');
  });

  it('should have a handleActions function', () => {
    expect(Store.handleActions).to.be.a('function');
  });

  it('should receive newsArticles from dispatcher', () => {
    dispatcher.dispatch({
      type: 'GET_ARTICLES',
      articles: apiReponse,
    });
    expect(Store.getArticles()).to.eql(apiReponse);
  });
});