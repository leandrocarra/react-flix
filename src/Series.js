import React, { Component } from 'react'
import api from './Api'
import { Link } from 'react-router-dom'

class Series extends Component{

  constructor(props){
    super(props)
    this.state = {
      isLoadig: false,
      series: []
    }
    this.renderSeries = this.renderSeries.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  deleteSeries(id){
    api.deleteSeries(id).then((res) => {
      this.loadData()
    })
  }
  renderSeries(series){
    return(
      <div key={series.id}  className="item  col-xs-4 col-lg-4">
        <div className="thumbnail">
          <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
          <div className="caption">
            <h4 className="group inner list-group-item-heading">
              {series.name}</h4>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <p className="lead">
                  {series.genre} / {series.status}</p>
              </div>
              <div className="col-xs-12 col-md-6">
                <Link to={'/series-edit/'+series.id} className="btn btn-success" href="">Manage</Link>
                <a className="btn btn-success" onClick={() => this.deleteSeries(series.id)} href="">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    this.loadData()
  }
  loadData(){
    this.setState({ isLoadig: true })
    api.loadSeriesByGenre(this.props.match.params.genre).then((res) =>{
      this.setState({
        isLoadig: false,
        series : res.data
      })
    })
  }

  render(){
    return (
      <section id='intro' className='intro-section'>
        <h1>Series {this.props.match.params.genre} </h1>
        {
          this.state.isLoadig &&
          <p>Loading ... </p>
        }
        {
          !this.state.isLoadig && this.state.length === 0 &&
          <div className='alert alert-info'> No one series</div>
        }
        <div id="series" className="row list-group">
          {
            !this.state.isLoadig &&
            this.state.series.map(this.renderSeries)
          }
        </div>
      </section>
    )
  }
}
export default Series
