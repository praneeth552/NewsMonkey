import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    static defaultProps = {
        category: 'general',
        pageSize: 6
    }

    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fbbb0830a1514fc69fb4bc362fb97c99&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fbbb0830a1514fc69fb4bc362fb97c99&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
            // console.log("Next");
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fbbb0830a1514fc69fb4bc362fb97c99&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(url)
            let parseddata = await data.json()
            console.log(parseddata);
            this.setState({
                page: this.state.page + 1,
                articles: parseddata.articles,
                loading: false
            })
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <div className="conatiner my-4 text-center d-flex justify-content-center vh-100">
                    <Spinner />
                </div>}
                {!this.state.loading && <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={Math.random()}>
                            <NewsItem publishedDate={element.publishedAt.slice(0,10)} title={element.title.slice(0, 30)} 
                            description={!element.description ? "" : element.description.slice(0, 117)} 
                            imageUrl={!element.urlToImage ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LRQ5T2TNUNAFLGVHT5STSHF4S4_size-normalized.jpg&w=1440" : element.urlToImage} 
                            newsUrl={element.url} 
                            author={element.author}
                            source={element.source.name}/>
                        </div>
                    })}
                </div>}
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}
