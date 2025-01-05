import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, publishedDate } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <strong>Date:</strong><h6>{publishedDate}</h6> 
            <p className="card-text">{description}...</p>
            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark" target='_blank'>Read more</a>
          </div>
        </div>
      </div>

    )
  }
}
