**Jobby App**

This React.js application is a job search platform that allows users to search for and view job listings.

***Features:***

Login: Users can log in with valid credentials (username: rahul, password: rahul@2021).

User Roles:
Unauthenticated users can only access the Login page.
Authenticated users can access the Home, Jobs, and Job Details routes.

Home: Users can access the Jobs route from here.

Jobs:
Filters jobs based on user selections:
Employment Types (Full Time, Part Time, etc.)
Salary Range
Search by keywords
Displays a loading indicator while fetching data.

Shows different views based on results:

List of jobs when successful.
Failure view when fetching data fails with a retry button.
No Jobs view when no jobs match the filters.
Clicking a job item navigates to the Job Details route.

Job Details:
Displays details of a specific job.
Shows a loading indicator while fetching data.
Failure view when fetching data fails with a retry button.
Displays a list of similar jobs.
Clicking the "Visit" button opens the company website in a new tab.

Header:
Clicking the website logo or the "Home" link redirects to the Home route.
Clicking the "Jobs" link redirects to the Jobs route.
Clicking the "Logout" button logs the user out and redirects them to the Login route. (Implementation details omitted for security reasons)

***Technologies Used:***

*Frontend:*

React JS: Used for building the core user interface and managing application state.

JS (JavaScript): The foundation for building interactive elements and logic within the application.

CSS: Styles the application's visual appearance.

Routing: React Router Manages navigation between different views (Home, Jobs, Login, etc.) based on user actions or URL changes.

API Calls: Handles communication with backend servers to fetch data or send requests using RESTful API principles.

JWT Token: Used for secure user authentication by storing credentials in a token for authorized API access.

Authorization: Defines access control mechanisms for different user roles within the application.

Authentication: Handles user login/logout processes and manages user session information.

***Note:***

This README focuses on functionalities and user interactions.
Implementation details like API URLs or component structures are omitted.
Logout functionality is mentioned but details are omitted for security reasons.

