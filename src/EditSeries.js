import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from './Api'

const statuses = {
  'watched': 'watched',
  'watching': 'watching',
  'toWatch': 'toWatch'
}

class EditSeries extends Component{
  constructor(props){
    super(props)
    this.state = {
      genres: [],
      isLoading: false,
      redirect: false,
      series: {}
    }
    this.saveSeries = () =>{
      const NewSeries = {
        id: this.props.match.params.id,
        name: this.refs.name.value,
        status: this.refs.status.value,
        genre: this.refs.genre.value,
        comments: this.refs.comments.value
      }
      api.updateSeries(NewSeries)
      .then((res) => {
        this.setState({
          redirect: '/series/'+this.refs.genre.value
        })
      })
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    api.loadSeriesById(this.props.match.params.id)
      .then((res) =>{
        this.setState({
          series: res.data
        })
      })
    api.loadGenres()
    .then((res) => {
      this.setState({
        isLoading: false,
        genres: res.data
      })
      this.refs.name.value = this.state.series.name
      this.refs.genre.value = this.state.series.genre
      this.refs.comments.value = this.state.series.comments
      this.refs.status.value = this.state.series.status
    })
  }

  render(){
    return(
      <section>
        {
          this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }
        <h1>Edit</h1>
        <form>
          Name: <input type='text' defaultValue={this.state.series.name} ref='name' className='form-control' /><br />

          Status:
          <select ref='status'>
            {
              Object
              .keys(statuses)
              .map(key => <option key={key} value={key}>{statuses[key]}</option>)
            }
          </select><br />
          Status:
          <select ref='genre'>
            {
              this.state.genres
              .map(key => <option key={key} value={key}>{key}</option>)
            }
          </select><br />

          Comment: <textarea ref='comments' className='form-control'></textarea><br />

          <button type='button' onClick={this.saveSeries}>Save</button>
        </form>
      </section>
    )
  }
}

export default EditSeries
