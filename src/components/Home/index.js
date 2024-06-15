import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary{' '}
        <br className="line-break" /> information, company reviews. Find the job{' '}
        <br className="line-break" /> that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="home-btn">Find Jobs</button>
      </Link>
    </div>
  </>
)

export default Home
