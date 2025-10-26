import React from 'react'
import '../style/Error.css'


const Error = () => {
  return (
    <div>
        <div className="error">
            <h2>Error :(</h2>
            <p>Either the Page is Down or you are at the wrong link!
                <br />
                Try refreshing the website or going to the Home Page.
            </p>
        </div>
    </div>
  )
}

export default Error