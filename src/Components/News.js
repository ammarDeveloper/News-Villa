import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItems from './NewsItems'

export class News extends Component {

    constructor() {
        super()
        this.state = {
            totalResults: 0,
            articles: [],
            pageSize: 15,
            page: 1,
            totalPages: 0,
            loading: false
        }
    }

    async componentDidMount() {
        let apiEndPoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aced9346475f4dc69ebc1a0585ccbd1a&pageSize=${this.state.pageSize}&page=${this.state.page}`;
        this.setState({loading: true});
        let data = await fetch(apiEndPoint);
        let parseData = await data.json();
        this.setState({
            totalResults: parseData.totalResults,
            articles: parseData.articles,
            totalPages: Math.ceil(this.state.totalResults / this.state.pageSize),
            loading: false
        })
    }

    scrollUP = () => {
        console.log("scrolling")
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    handlePrevClick = async() => {
        if (this.state.page === 1){
            return null
        }
        this.scrollUP();
        let apiEndPoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aced9346475f4dc69ebc1a0585ccbd1a&pageSize=${this.state.pageSize}&page=${this.state.page - 1}`;
        this.setState({loading: true});
        let data = await fetch(apiEndPoint);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page : this.state.page - 1,
            loading: false
        })
        
    }

    handleNextClick = async() => {
        if (this.state.page === this.state.totalPages) {
            return null
        }
        this.scrollUP();
        let apiEndPoint= `https://newsapi.org/v2/top-headlines?country=us&apiKey=aced9346475f4dc69ebc1a0585ccbd1a&pageSize=${this.state.pageSize}&page=${this.state.page + 1}`;
        this.setState({loading: true});
        let data = await fetch(apiEndPoint);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page : this.state.page + 1, 
            loading: false
        })
        
    }

    static propTypes = {

    }

    render() {
        return (
            <div className="container d-flex flex-column justify-content-center">
                <h3>News Heading</h3>
                {this.state.loading && <img style={{height: "50vh", margin: "auto"}} src="/spinner.gif" alt="" />}
                {!this.state.loading && <div className="row gy-3 mt-0">
                    {this.state.articles.map((newsElem) => {
                        console.log(this.state.totalPages)
                        return (
                            
                            <div className="col-lg-3 col-md-4 col-sm-8" key={newsElem.url}>
                                <NewsItems title={newsElem.title} description={newsElem.description} urlToImage={newsElem.urlToImage} url={newsElem.url} />
                            </div>
                        )
                    })}

                </div>}
                <div className='d-flex justify-content-between my-3'>
                    {this.state.totalResults > this.state.pageSize && !this.state.loading && <>
                    <button type="button" class="btn btn-dark" disabled={this.state.page === 1} onClick={this.handlePrevClick} >Previous</button>
                    <button type="button" class="btn btn-dark" disabled={this.state.page === this.state.totalPages} onClick={this.handleNextClick}>Next</button></>}
                </div>
            </div>
        )
    }
}

export default News
