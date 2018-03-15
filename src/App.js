import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import NewSeries from './NewSeries'
import Series from './Series'
import EditSeries from './EditSeries'

const About = () => <section className="intro-section"><h1>About</h1></section>

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="#page-top">
                    <h4 className='logo'>My Series</h4>
                </a>
                <div className="navbar-collapse navbar-ex1-collapse">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to='/'>HOME</Link>
                    </li>
                    <li>
                      <Link to='/new'>NEW</Link>
                    </li>
                    <li>
                      <Link to='/about'>ABOUT</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route path='/series-edit/:id' component={EditSeries} />
          <Route path='/series/:genre' component={Series} />
          <Route exact path='/new' component={NewSeries} />
          <Route exact path='/about' component={About} />
        </div>
      </Router>
    )
  }
}

export default App;
