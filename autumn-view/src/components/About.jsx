import React from 'react'
import '../style/About.css'

const About = () => {
  return (
    <div>
        <div className="about">
            <div className="about-hero">
                <h2>About Us</h2>
                <p>Learn More about Autumn View!</p>
            </div>

            <div className="body">
                <h3>What is Autumn View?</h3>
                <p>Autumn View is a great project designed for anonomus people to recommend each about about great foliage spots near where you live.
                    Using Autumn View you can add places which has great foilage, people can review your place and rate it as well.
                    You can see foiliage spots all around the world using Autumn View.

                </p>
            </div>


            <div className="body list">
                <h3>What are the Features of Autumn View?</h3>
                <p>Here are a few features of Autumn View.</p>
                <ul>
                    <li>Map with different location options for visit.</li>
                    <li>Custom Location Addition.</li>
                    <li>Rating the locations</li>
                    <li>Report Fake Locations</li>
                    <li>View Featured Locations</li>
                    <li>100% Free</li>
                    <li>Anonomus Viewing and Reviewing</li>
                </ul>
            </div>



            <div className="body">
                <h3>Who Made Autumn View?</h3>
                <p>Autmn View is a Project of Abhinav Siluwal.</p>
            </div>

            <div className="body">
                <h3>Built With</h3>
                <p>Autmn View is build with vite + react, it is entirely frontend. It does not have a backend(yet?).</p>
            </div>


            <div className="body list">
                <h3>Please Follow these rules while using the webapp!</h3>
                <ul>
                    <li>Do not add wrong information on the map.</li>
                    <li>Report if you see any wrong information on the map</li>
                    <li>Give Fair Ratings</li>
                    <li>Do not mass rate a place by yourself</li>
                    <li>Do not share personal information</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default About