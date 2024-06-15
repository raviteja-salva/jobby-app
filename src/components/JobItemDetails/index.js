import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaStar, FaSuitcase, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, isLoading: true, isFailed: false}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getSkillsCamelCase = obj => ({
    name: obj.name,
    imageUrl: obj.image_url,
  })

  getSimilarJobsCamelCase = obj => ({
    companyLogoUrl: obj.company_logo_url,
    employmentType: obj.employment_type,
    id: obj.id,
    jobDescription: obj.job_description,
    location: obj.location,
    rating: obj.rating,
    title: obj.title,
  })

  getCamelCase = obj => ({
    jobDetails: {
      companyLogoUrl: obj.job_details.company_logo_url,
      companyWebsiteUrl: obj.job_details.company_website_url,
      employmentType: obj.job_details.employment_type,
      id: obj.job_details.id,
      jobDescription: obj.job_details.job_description,
      lifeAtCompany: {
        description: obj.job_details.life_at_company.description,
        imageUrl: obj.job_details.life_at_company.image_url,
      },
      location: obj.job_details.location,
      packagePerAnnum: obj.job_details.package_per_annum,
      rating: obj.job_details.rating,
      skills: obj.job_details.skills.map(item => this.getSkillsCamelCase(item)),
      title: obj.job_details.title,
    },
    similarJobs: obj.similar_jobs.map(item =>
      this.getSimilarJobsCamelCase(item),
    ),
  })

  getJobItemDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const responseData = await response.json()
      const jobItemData = this.getCamelCase(responseData)

      this.setState({jobItemDetails: jobItemData, isLoading: false})
    } else {
      this.setState({isFailed: true, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className='loader-container'>
      <Loader type='ThreeDots' color='white' height='50' width='50' />
    </div>
  )

  failureView = () => (
    <div className='failure-view'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
        className='no-jobs-img'
      />
      <h1 className='no-jobs-heading'>Oops! Something Went Wrong</h1>
      <p className='no-jobs-para'>
        We cannot seem to find the page you are looking for
      </p>
      <button className='home-btn' onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  renderTopSection = () => {
    const {jobItemDetails} = this.state
    const {jobDetails} = jobItemDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobDetails

    return (
      <>
        <div className='jobcard-top-section'>
          <img
            src={companyLogoUrl}
            alt='job details company logo'
            className='company-logo'
          />
          <div className='role-ratig-container'>
            <h1 className='role-para'>{title}</h1>
            <div className='rating-para-container'>
              <FaStar className='star-icon' />
              <p className='rating-para'>{rating}</p>
            </div>
          </div>
        </div>
        <div className='job-card-mid-section'>
          <div className='location-jobtype-container'>
            <div className='mid-container'>
              <MdLocationOn className='mid-icon' />
              <p className='mid-para'>{location}</p>
            </div>
            <div className='mid-container'>
              <FaSuitcase className='mid-icon' />
              <p className='mid-para'>{employmentType}</p>
            </div>
          </div>
          <p className='package-para'>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className='jobcard-bottom-section'>
          <div className='description-heading-container'>
            <h1 className='bot-heading'>Description</h1>
            <a
              className='visit-link-section'
              href={companyWebsiteUrl}
              target='_blank'
              rel='noreferrer'
            >
              <p className='bot-visit-para'>Visit</p>
              <FaExternalLinkAlt className='visit-icon' />
            </a>
          </div>
          <p className='bot-para'>{jobDescription}</p>
        </div>
      </>
    )
  }

  skillItem = skill => {
    const {name, imageUrl} = skill
    return (
      <li className='skill-item-container' key={name}>
        <img src={imageUrl} className='skill-image' alt={name} />
        <p className='skill-name-para'>{name}</p>
      </li>
    )
  }

  renderSkillsSection = () => {
    const {jobItemDetails} = this.state
    const {jobDetails} = jobItemDetails
    const {skills} = jobDetails
    return (
      <ul className='skills-section-container'>
        {skills.map(skill => this.skillItem(skill))}
      </ul>
    )
  }

  renderLifeAtCompanySection = () => {
    const {jobItemDetails} = this.state
    const {jobDetails} = jobItemDetails
    const {lifeAtCompany} = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className='life-at-company-section'>
        <p className='bot-para'>{description}</p>
        <img src={imageUrl} className='life-at-company-img' />
      </div>
    )
  }

  similarJobCard = similarJobItem => {
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      title,
    } = similarJobItem
    return (
      <li key={id} className='similar-job-card'>
        <div className='jobcard-top-section'>
          <img
            src={companyLogoUrl}
            alt='similar job company logo'
            className='company-logo'
          />
          <div className='role-ratig-container'>
            <h1 className='role-para'>{title}</h1>
            <div className='rating-para-container'>
              <FaStar className='star-icon' />
              <p className='rating-para'>{rating}</p>
            </div>
          </div>
        </div>
        <div className='jobcard-bottom-section'>
          <h1 className='bot-heading'>Description</h1>
          <p className='bot-para'>{jobDescription}</p>
        </div>
        <div className='location-jobtype-container'>
          <div className='mid-container'>
            <MdLocationOn className='mid-icon' />
            <p className='mid-para'>{location}</p>
          </div>
          <div className='mid-container'>
            <FaSuitcase className='mid-icon' />
            <p className='mid-para'>{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }

  renderContent = () => {
    const {jobItemDetails, isLoading, isFailed} = this.state
    const {similarJobs} = jobItemDetails
    let content
    if (isLoading) {
      content = this.renderLoader()
    } else if (isFailed) {
      content = this.failureView()
    } else {
      content = (
        <div className='job-item-container'>
          <div className='job-card-container'>
            {this.renderTopSection()}
            <h1 className='bot-heading'>Skills</h1>
            {this.renderSkillsSection()}
            <h1 className='bot-heading'>Life at Company</h1>
            {this.renderLifeAtCompanySection()}
          </div>
          <div className='similar-jobs-container'>
            <h1 className='similar-jobs-heading'>Similar Jobs</h1>
            <ul className='similar-jobs-list-container'>
              {similarJobs.map(similarJobItem =>
                this.similarJobCard(similarJobItem),
              )}
            </ul>
          </div>
        </div>
      )
    }
    return content
  }

  render() {
    return (
      <>
        <Header />
        {this.renderContent()}
      </>
    )
  }
}

export default JobItemDetails
