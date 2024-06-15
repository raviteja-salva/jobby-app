import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Profile extends Component {
  state = {profileDetails: {}, showFailureView: false}

  componentDidMount() {
    this.getProfileDetails()
  }

  getCamelCase = obj => ({
    profileImageUrl: obj.profile_image_url,
    name: obj.name,
    shortBio: obj.short_bio,
  })

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)
    const responseData = await response.json()

    const dataObject = this.getCamelCase(responseData.profile_details)
    if (response.ok) {
      this.setState({profileDetails: dataObject, showFailureView: false})
    } else {
      this.setState({showFailureView: true})
    }
  }

  profileCard = () => {
    const {profileDetails} = this.state

    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-card">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">Raviteja Salva</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-view-container">
      <button className="home-btn" onClick={this.getProfileDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {showFailureView} = this.state

    if (showFailureView) {
      return this.failureView()
    }

    return this.profileCard()
  }
}

export default Profile
