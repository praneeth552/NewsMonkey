import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    state = {
        articles: [],
        loading: true,
        totalResults: 0,
        page: 1
    };

    static defaultProps = {
        category: 'general',
        pageSize: 6
    }

    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    updateNews = async () => {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fbbb0830a1514fc69fb4bc362fb97c99&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fbbb0830a1514fc69fb4bc362fb97c99&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <>
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <div className="container d-flex justify-content-center vh-100">
                    <Spinner />
                </div>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={Math.random()}>
                                    <NewsItem publishedDate={element.publishedAt ? element.publishedAt.slice(0, 10) : ""}
                                        title={element.title ? element.title.slice(0, 30) : ""}
                                        description={element.description ? element.description.slice(0, 117) : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LRQ5T2TNUNAFLGVHT5STSHF4S4_size-normalized.jpg&w=1440"}
                                        newsUrl={element.url}
                                        author={element.author}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
