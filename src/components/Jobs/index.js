import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FiSearch} from 'react-icons/fi'
import FilterGroup from '../FilterGroup'
import Header from '../Header'
import JobCard from '../JobCard'

class Jobs extends Component {
  state = {
    jobsList: [],
    selectedEmploymentTypes: [],
    minimumPackage: '',
    searchInput: '',
    titleSearch: '',
    isLoading: true,
    showFailureView: false,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getCamelCase = obj => ({
    companyLogoUrl: obj.company_logo_url,
    employmentType: obj.employment_type,
    id: obj.id,
    jobDescription: obj.job_description,
    location: obj.location,
    packagePerAnnum: obj.package_per_annum,
    rating: obj.rating,
    title: obj.title,
  })

  getJobsDetails = async () => {
    this.setState({isLoading: true})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const {selectedEmploymentTypes, minimumPackage, titleSearch} = this.state

    const employmentTypes = selectedEmploymentTypes.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${minimumPackage}&search=${titleSearch}`

    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    const jobsArray = responseData.jobs
    const jobsListData = jobsArray.map(obj => this.getCamelCase(obj))

    if (response.ok) {
      this.setState({
        jobsList: jobsListData,
        isLoading: false,
        showFailureView: false,
      })
    } else {
      this.setState({showFailureView: true, isLoading: false})
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeTitleSearch = () => {
    const {searchInput} = this.state
    this.setState(
      {titleSearch: searchInput, isLoading: true},
      this.getJobsDetails,
    )
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  notFound = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters
      </p>
    </>
  )

  failureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="home-btn" onClick={this.getJobsDetails}>
        Retry
      </button>
    </>
  )

  renderContent = () => {
    const {isLoading, jobsList, showFailureView} = this.state
    let content
    if (isLoading) {
      content = this.loader()
    } else if (jobsList.length === 0) {
      content = this.notFound()
    } else if (showFailureView) {
      content = this.failureView()
    } else {
      content = (
        <ul>
          {jobsList.map(item => (
            <JobCard key={item.id} jobItem={item} />
          ))}
        </ul>
      )
    }
    return content
  }

  renderJobsContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="jobs-container">
        <div className="jobs-search-container">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.changeSearchInput}
          />
          <button
            className="search-icon-container"
            data-testid="searchButton"
            onClick={this.changeTitleSearch}
            aria-label="Search"
          >
            <FiSearch className="search-icon" />
          </button>
        </div>
        {this.renderContent()}
      </div>
    )
  }

  changeSelectedEmploymentTypes = (isChecked, value) => {
    if (isChecked) {
      this.setState(
        prevState => ({
          selectedEmploymentTypes: [
            ...prevState.selectedEmploymentTypes,
            value,
          ],
          isLoading: true,
        }),
        this.getJobsDetails,
      )
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentTypes: prevState.selectedEmploymentTypes.filter(
            item => item !== value,
          ),
          isLoading: true,
        }),
        this.getJobsDetails,
      )
    }
  }

  changeSalaryRange = value => {
    this.setState({minimumPackage: value, isLoading: true}, this.getJobsDetails)
  }

  render() {
    const {showFailureView} = this.state

    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <FilterGroup
            changeSelectedEmploymentTypes={this.changeSelectedEmploymentTypes}
            changeSalaryRange={this.changeSalaryRange}
          />
          {this.renderJobsContainer()}
        </div>
      </>
    )
  }
}

export default Jobs
