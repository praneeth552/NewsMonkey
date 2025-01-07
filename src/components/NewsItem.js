import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedDate, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left: "85%", zIndex: "1"}}>{source === "[Removed]"? "Unknown": source}</span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            {/* <strong>Date:</strong><h6>{publishedDate}</h6>  */}
            <p className="card-text">{description}...</p>
            <small className="text-body-secondary">By {!author?"Unknown": author} on {new Date(publishedDate).toUTCString()}</small> <br />
            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark" target='_blank'>Read more</a>
          </div>
        </div>
      </div>

    )
  }
}
