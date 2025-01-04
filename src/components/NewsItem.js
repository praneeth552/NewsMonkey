import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src="https://content.api.news/v3/images/bin/3a4b8154d13e79017e9c0d1537f572b8" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href="/newsdetail" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}
