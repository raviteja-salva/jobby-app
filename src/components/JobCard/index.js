import './index.css'
import {Link} from 'react-router-dom'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const JobCard = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <Link className="links" to={`/jobs/${id}`}>
      <li className="job-card">
        <div className="jobcard-top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-ratig-container">
            <h1 className="role-para">{title}</h1>
            <div className="rating-para-container">
              <FaStar className="star-icon" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-mid-section">
          <div className="location-jobtype-container">
            <div className="mid-container">
              <MdLocationOn className="mid-icon" />
              <p className="mid-para">{location}</p>
            </div>
            <div className="mid-container">
              <FaSuitcase className="mid-icon" />
              <p className="mid-para">{employmentType}</p>
            </div>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="jobcard-bottom-section">
          <h1 className="bot-heading">Description</h1>
          <p className="bot-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
