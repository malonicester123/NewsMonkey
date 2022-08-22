import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://images.hindustantimes.com/tech/img/2022/08/17/1600x900/asteroid-6025507_1920_1648098187847_1660744600734_1660744600734.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <div>
          <span className="badge rounded-pill bg-danger" >
              {source}
            </span>
            </div>
            <h5 className="card-title">{title}...</h5>
            
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
