import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from './Api'

const statuses = {
  'watched': 'watched',
  'watching': 'watching',
  'toWatch': 'toWatch'
}

class NewSeries extends Component{
  constructor(props){
    super(props)
    this.state = {
      genres: [],
      isLoading: false,
      redirect: false
    }
    this.saveSeries = () =>{
      const NewSeries = {
        name: this.refs.name.value,
        status: this.refs.status.value,
        genre: this.refs.genre.value,
        comments: this.refs.comments.value
      }
      api.saveSeries(NewSeries)
      .then((res) => {
        this.setState({
          redirect: '/series/'+this.refs.genre.value
        })
      })
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    api.loadGenres()
    .then((res) => {
      this.setState({
        isLoading: false,
        genres: res.data
      })
    })
  }

  render(){
    return(
      <section>
        {
          this.state.redirect &&
          <Redirect to={this.state.redirect} />
        }
        <h1>New Series</h1>
        <form>
          Name: <input type='text' ref='name' className='form-control' /><br />

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

export default NewSeries
