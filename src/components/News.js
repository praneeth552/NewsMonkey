import React, { Component } from 'react'
import NewsItem from './NewsItem'
export default class News extends Component {
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false
        }
    }

    async componentDidMount() { 
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=fbbb0830a1514fc69fb4bc362fb97c99"
        let data = await fetch(url)
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({articles: parseddata.articles})
    }
    render() {
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title.slice(0,30)} description={!element.description?"":element.description.slice(0,117)} imageUrl={!element.urlToImage?"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LRQ5T2TNUNAFLGVHT5STSHF4S4_size-normalized.jpg&w=1440":element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div>
        )
    }
}
