import React, { useEffect ,useState} from "react";
import Spinner from "../Spinner";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const  News  = (props) => {
  const  [articles,setArticles] = useState([]);
  const  [loading,setLoading] = useState(false);
  const  [page,setPage] = useState(1);
  const  [totalResults,setTotalResults] = useState(0);

 const  capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  // document.title = `${capitalize(props.category)} - NewsMonkey`;


  const fetchMoreData = async () => {
    setPage(page+1);
   
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults);
    setLoading(false);
   
  };
  const updateNews=async()=> {
    // console.log("Component did mount");
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
    setLoading(false)
  }
  useEffect(()=>{
       updateNews();
  },[])

  
  const handlePreviousClick = async () => {
    setPage(page-1);
    updateNews();
     
  };
  const handleNext = async () => {
     setPage (page+1)
     updateNews();
  };
  
  
    return (
      <>
        <h1 className="text-center" style={{ margin: "67px 0px" }}>
          NewsMonkey-Top {`${capitalize(props.category)} `} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((elem) => {
                return (
                  <div className="col-md-4" key={elem.url}>
                    <NewsItem
                      newsUrl={elem.url}
                      title={elem.title ? elem.title : ""}
                      imageUrl={elem.urlToImage}
                      description={
                        elem.description ? elem.description.slice(0, 88) : ""
                      }
                      author={elem.author}
                      date={elem.publishedAt}
                      source={elem.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            onClick={this.handleNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}
 News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
