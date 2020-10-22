import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

function PageNotFound({ authedUser, message }) {
    if (authedUser) {
        return (
            <div className="text-center" style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%)'
            }}>
                <h1>404</h1>
                <h1>{message || 'Page not found'}</h1>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default connect(mapStateToProps)(PageNotFound)
