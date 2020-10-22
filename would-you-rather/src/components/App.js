import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginDialog from './LoginDialog'
import { Navbar, Nav, Button, Figure } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import NewQuestion from './NewQuestion'
import Questions from './Questions'
import Question from './Question'
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound'

const mapStateToProps = ({ authedUser }) => {
    return {
      authedUser
    }
}

function App({ authedUser, setAuthedUser }) {
  const location = useLocation()
  const history = useHistory()
  return (
    <div>
      {authedUser === null && <LoginDialog/>}
      <Navbar bg="light" expand="lg" collapseOnSelect={true}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Nav.Link onClick={() => {
              if (history.location.pathname !== '/questions') history.push('/questions')
            }}>
              Questions
            </Nav.Link>
            <Nav.Link onClick={() => {
              if (history.location.pathname !== '/add') history.push('/add')
            }}>
              New Question
            </Nav.Link>
            <Nav.Link onClick={() => {
              if (history.location.pathname !== '/leaderboard') history.push('/leaderboard')
            }}>
              Leaderboard
            </Nav.Link>
          </Nav>
          {authedUser && (
            <Nav>
              <Navbar.Text className="mr-2">
                {authedUser && `Signed in as: ${authedUser.name} (${authedUser.id})`}
              </Navbar.Text>
              <Figure.Image width={40} height={32} src={authedUser.avatarURL} roundedCircle thumbnail className="mr-2 mt-0 mb-0"/>
              <Button disabled={authedUser === null} onClick={() => setAuthedUser(null)}>Logout</Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/questions" component={Questions}/>
        <Route exact path="/questions/:id" render={({ match }) => {
          const { id } = match.params
          return <Question questionId={id} showVotes={true} disableVoteAction={true} showTotalVotes={true} showAuthor={true}/>
        }}/>
        <Route exact path="/add" component={NewQuestion}/>
        <Route exact path="/leaderboard" component={Leaderboard}/>
        <Route component={PageNotFound}/>
      </Switch>
    </div>
  );
}

export default connect(mapStateToProps, { setAuthedUser })(App)
