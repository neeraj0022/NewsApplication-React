

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import './components.css'
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps={
    category:'general',
    apiKey:PropTypes.string

  }

  static propTypes={
      category:PropTypes.string,
      apiKey:PropTypes.string
  }
  
  
  constructor(props){
        super(props);
        console.log("Constructor run.");

        this.state={
          articles: [],
          loading: true,
          page:1,
        }     

        document.title=`VishayNews -${ this.props.category}`;
    }
  
  async componentDidMount(){

    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=18`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json()
    this.setState({
      articles: parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading:false
      })
  }

  nextClick= async()=>{
    console.log("Next Button Clicked");
    if( this.state.page +1 > Math.ceil(this.state.totalResults/18 ))
    {
     
    }
    else{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=18`;
        this.setState({loading:true})
        let data=await fetch(url);
        let parsedData= await data.json()
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading:false
        
        })
    }

  }

  prevClick= async()=>{
    console.log("previous Button CLicked")

    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=18`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json()

    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
      loading:false
    
    })

  }

  render() {
    console.log("render")

    return (
    <>
      <div className="container my-1">
        <div className="heading-one">
          <br /><br />
            <p>Top Headlines</p>
        </div>

        <div className="row my-4">
        {this.state.articles.map((element)=>{

            return  <div className="col-md-4"  key={element.url} >
            
                <NewsItem title={element.title?element.title.slice(0,70): ""} description={element.description? element.description.slice(0,88)+"......":""}  newsUrl={element.url}  imageUrl={element.urlToImage? element.urlToImage :"https://i.ytimg.com/vi/dIAsjBCfi14/maxresdefault.jpg"}  /><br/><br/>
            
            </div>
        })}
        </div><br />

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' onClick={this.prevClick} className='btn btn-dark'>&larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/18 )}  type='button' onClick={this.nextClick} className='btn btn-dark'>Next &rarr;</button>
        </div>
        <br /><br /><br />
      </div>

    </>  
    )
  }
}




