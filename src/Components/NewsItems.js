import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItems extends Component {
    static propTypes = {

    }

    render() {
        let {title, description, urlToImage, url} = this.props
        return (
            <div className="card" style={{ "width": "100%" }}>
                <img style={{height: "30vh"}} src={urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 style={{height: "9vh", overflow: "hidden"}}  className="card-title">{title}</h5>
                    <p style={{height: "21vh", overflow: "hidden"}} className="card-text">{description}</p>
                    <a href={url} target='_blank' className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItems
