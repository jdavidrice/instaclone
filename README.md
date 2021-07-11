<span align=center>

# Instaclone 

[![GitHub license](https://img.shields.io/github/license/jdavidrice/instaclone)](https://github.com/jdavidrice/instaclone/blob/master/LICENSE)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c1294f871fb947ee891b2895f1f7ee6f)](https://www.codacy.com/gh/jdavidrice/instaclone/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jdavidrice/instaclone&amp;utm_campaign=Badge_Grade)

</span>  
An Instagram clone that uses React, Firebase, and Tailwind CSS.

[Link to published website](https://instaclone-jdavidrice.vercel.app/login)

## Table of Contents  
*   [Description](#Description) 
*   [Installation and Usage](#Installation-and-Usage)  
*   [Image of the app](#Image-of-the-app)
*   [Credits](#Credits)
*   [License](#License)  
*   [Contact](#Contact) 

## Description  

This Instagram clone uses React (custom hooks, useContext, useState, useEffect, and useRef), Firebase (Firestore and authentication), Tailwind CSS, LoadTest, Lighthouse, Vercel, React Testing Library and Cypress E2E Testing.

The app has multiple pages: login, sign up, dashboard (to view/like/comment on photos), and user profiles. The sign-in page connects to Firebase when a user tries to sign in, and when a user signs up, Firebase auth is used to store the user in the Firebase auth database.

**Dependencies**
*   @testing-library/jest-dom: ^5.11.4
*   @testing-library/react: ^11.1.0
*   @testing-library/user-event: ^12.1.10
*   autoprefixer: ^10.2.5
*   date-fns: ^2.21.3
*   firebase: ^8.5.0
*   prop-types: ^15.7.2
*   react: ^17.0.2
*   react-dom: ^17.0.2
*   react-loading-skeleton: ^2.2.0
*   react-router-dom: ^5.2.0
*   react-scripts: 4.0.3
*   tailwindcss: ^2.1.2
*   web-vitals: ^1.0.1

**Development Dependencies**
*   babel-eslint: ^10.1.0
*   eslint: ^7.19.0
*   eslint-config-airbnb: ^18.2.1
*   eslint-config-prettier: ^7.2.0
*   eslint-plugin-import: ^2.22.1
*   eslint-plugin-jsx-a11y: ^6.4.1
*   eslint-plugin-prettier: ^3.3.1
*   eslint-plugin-react: ^7.22.0
*   eslint-plugin-react-hooks: ^4.2.0
*   npm-run-all: ^4.1.5
*   postcss: ^8.2.4
*   postcss-cli: ^8.3.1
*   prettier: ^2.2.1

## Installation and Usage  
***Firebase***
This application uses Google Firebase for authentication and the Cloud Firestore (database). You will need to create an account at [Firebase](https://firebase.google.com/), if you don't have one already. For additional instructions on setting up Firebase for use with this project, please see the tutorial video linked below. 

***Dotenv***
This application uses a .env file to store environment variables. After you fork and clone this repo, create your own .env file and model it after the .env.example file contained herein. These variables will allow your app to connect to the Firebase database.

***Testing***
This application incorporates the [Jest](https://jestjs.io/) JavaScript testing framework. To run the built-in unit tests, enter "npm test" into the console. 
## Image of the App   
  
![Instaclone](./public/images/instaclone.png)
 
## Credits

Thank you to [freeCodeCamp](https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ) and [Karl Hadwen](https://github.com/karlhadwen) for the excellent YouTube video [Create an Instagram Clone with React, Tailwind CSS, Firebase - Tutorial](https://www.youtube.com/watch?v=mDgEqoQUBgk&t=4261s). This app is the result of watching the tutorial and building along with Karl. 

## License  

MIT License

Copyright (c) 2021 Jeremy Rice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the Software), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 
## Contact  
GitHub: 
[Jeremy Rice](https://github.com/jdavidrice)

Email:
jdavidrice@gmail.com

*   [Return to Top](#Instaclone)  
