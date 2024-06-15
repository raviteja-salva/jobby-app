import './index.css'
import Profile from '../Profile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {changeSelectedEmploymentTypes, changeSalaryRange} = props

  const onClickCheckbox = event => {
    changeSelectedEmploymentTypes(event.target.checked, event.target.value)
  }

  const employmentTypeItem = obj => {
    const {label, employmentTypeId} = obj
    return (
      <li key={employmentTypeId} className="filter-list-item">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkbox"
          value={employmentTypeId}
          onClick={onClickCheckbox}
        />
        <label className="label-text" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }

  const onClickSalaryRange = event => {
    changeSalaryRange(event.target.value)
  }

  const salaryRangeItem = obj => {
    const {salaryRangeId, label} = obj
    return (
      <li key={salaryRangeId} className="filter-list-item">
        <input
          type="radio"
          id={salaryRangeId}
          name="salary"
          value={salaryRangeId}
          className="radio-btn"
          onClick={onClickSalaryRange}
        />
        <label className="label-text" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  const getSalaryRangesList = () => (
    <ul>
      <h1 className="filter-heading">Salary Range</h1>
      {salaryRangesList.map(item => salaryRangeItem(item))}
    </ul>
  )

  const getEmploymentTypeList = () => (
    <ul>
      <h1 className="filter-heading">Type of Employement</h1>
      {employmentTypesList.map(item => employmentTypeItem(item))}
    </ul>
  )

  return (
    <div className="filter-group-container">
      <Profile />
      <hr className="filter-horizantal-line" />
      {getEmploymentTypeList()}
      <hr className="filter-horizantal-line" />
      {getSalaryRangesList()}
    </div>
  )
}

export default FilterGroup
