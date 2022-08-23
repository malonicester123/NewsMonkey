import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://img.freepik.com/free-vector/people-using-their-mobile-phones-news_52683-39976.jpg?w=900&t=st=1661234780~exp=1661235380~hmac=8a3e44cdce02de9b923d8861e047477fbe49370f005fd3c9419586b666be5d73"
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

export default NewsItem;
