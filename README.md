[![License: MIT license](https://img.shields.io/badge/License-MIT_license-success)](https://opensource.org/licenses/MIT)    
![Project status](https://img.shields.io/badge/Status-Complete-success)

#  WanderList

## General Information

Welcome to The `WanderList`! The WanderList web app was developed as a component of the Berkeley Coding Bootcamp Project 2. A remarkable web application designed exclusively for travel enthusiasts and adventure seekers. Our platform offers you a seamless experience to create and personalize your own travel wishes while immersing yourself in captivating travel posts shared by fellow adventurers. With just a click, you can save inspiring ideas to your account, keeping them readily accessible at any time. Embark on an exciting journey through the world of travel dreams and capture the essence of your wanderlust.

---
## Table of Contents

* [General Information](#general-information)
* [Deployed Site](#deployed-site)
* [Preview](#preview)
* [Demo](#demo)
* [Description](#description)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [User Interface](#user-interface)
* [Credits](#credits)
* [Contact](#contact)
* [License](#license)
* [How to Contribute](#how-to-contribute)

## Deployed Site

Experience the wonders of [WanderList](https://wanderlist.herokuapp.com/) through our Heroku deployment!

---
## Walkthrough Video

To get an idea of the features for the site, watch our walkthrough video!

https://github.com/JDempe/WanderList/assets/123279032/c7c8c7df-c378-4233-9d1e-df10ac189751

---
## Description

`WanderList` is built on the powerful foundation of `Node.js`, utilizing the expressive capabilities of the `Express framework` for flawless server-side development. Leveraging the `MySQL` database driver for `Node.js`, we ensure efficient data management and retrieval. With the integration of `express-session` and `connect-session-sequelize`, our application provides reliable session management while employing `Sequelize` for seamless and persistent session storage. Rest assured, your user authentication data is securely stored using `bcrypt` password hashing and encryption, prioritizing your online security. To enhance your browsing experience, we utilize the dynamic HTML template engine `express-handlebars`, enabling the rendering of captivating and interactive web pages. Moreover, we harness the potential of `Bootstrap`, a renowned front-end framework known for its vast collection of pre-built `CSS` and `JavaScript` components, ensuring a visually stunning and responsive web design.

The Wander List serves as your gateway to a world of travel possibilities. Join us today and let your travel aspirations come to life.

---
## Technologies Used

* [node.js v18.12.1](https://nodejs.org/en) -  A scalable server-side JavaScript runtime;
* [mySQL v8.0.33](https://www.mysql.com/) - Open-source relational database management system.
* [jQuery v3.6.0](https://jquery.com/) - A JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.
* [bootstrap v5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/) - A popular front-end framework that provides a collection of pre-built CSS and JavaScript components for responsive web design.
* [handlebars v4.7.7](https://handlebarsjs.com/) - Template engine for rendering dynamic HTML templates.
* [bcrypt v5.1.0](https://www.npmjs.com/package/bcrypt) - Password hashing and encryption for enhanced security.
* [sequelize v6.31.1](https://sequelize.org/) - ORM (Object-Relational Mapping) for interacting with relational databases in an object-oriented manner.
* [connect-session-sequelize v7.1.6](https://www.npmjs.com/package/connect-session-sequelize) - Integration of session management with Sequelize for persistent session storage.
* [express v4.18.2](https://www.npmjs.com/package/express) - Web application framework for building server-side applications.
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Templating engine for rendering dynamic HTML templates.
* [express-session v.17.3](https://www.npmjs.com/package/express-session) - Middleware for managing session data in Express.
* [mysql2 v3.3.1](https://www.npmjs.com/package/mysql2) - MySQL database driver for Node.js.
* [nodemon v2.0.22](https://www.npmjs.com/package/nodemon) - Development tool for automatically restarting the server during code changes.
* [dotenv v16.0.3](https://www.npmjs.com/package/dotenv) - Loading environment variables from a .env file.
* [Heroku](https://www.heroku.com/) - Cloud platform for deploying and managing applications.

---
## Installation

### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [mySQL](https://www.mysql.com/)

### Local Installation
If you would prefer to see a local version of the site, follow the steps below:

1. Clone the [repository](https://github.com/JDempe/WanderList) to your local machine.
2. Navigate to the root directory of the cloned repository in your terminal.
3. Run `npm install` to install the dependencies.
4. Create a `.env` file in the root directory of the cloned repository.  An example of the contents of the `.env` file is shown below:
    ```
    DB_NAME=wanderlist_db
    DB_USER=root
    DB_PW=your_password
    SECRET=your_secret
    ```
5. Create the database by logging into mySQL and running `source db/schema.sql`.
6. Seed the database by running `npm run seed`.
7. Start the server by running `npm start` or `npm run nodemon` if you have nodemon installed.
8. Navigate to `http://localhost:3001` in your browser to view the site.

---
## Usage

To explore our website, simply click on the provided [link](https://wanderlist.herokuapp.com/). For an enhanced experience, we highly recommend creating an account  to unlock all the amazing features our website has to offer. However, rest assured that even without an account, users can freely browse and discover captivating travel blog posts from other users. It's important to note that saving these posts to your personal account will only be possible for registered users.

To create an account, click on the "Sign Up" button located in the top right corner of the homepage and complete the required fields. Ensure that your chosen username is alphanumeric and between 3 to 20 characters in length. The email address provided should be valid, and the password should be between 8 to 128 characters long, containing a mix of alphanumeric, uppercase, and special characters.

Once your account is successfully created, a world of possibilities awaits you. You can create your own customized travel wish list, dive into captivating blog posts shared by fellow adventurers, and save your favorite posts to your account using the convenient "Pin" icon, allowing you to track and celebrate your travel accomplishments.

In the "Discover" section, users can immerse themselves in a multitude of captivating travel blog posts crafted by fellow travel enthusiasts. If you've finished browsing through the posts and desire something fresh, simply click the "Discover Something New" button positioned on the left side at the top of the page, or utilize the input field on the right side to narrow down your search and find specific travel ideas that pique your interest, streamlining your search results.

In the "Pin" section, you have the ability to craft and store your very own travel blog wishes, ensuring easy access to them whenever you desire. Positioned on the top left side of the page, you can effortlessly browse through your personal pins, while also exploring the pins of other users that have been saved to your account. This feature offers flexibility, allowing users to modify or delete their pins at any moment, empowering them with complete control over their travel aspirations and preferences.

Within the profile section, you will find a convenient dropdown list that includes the "Settings" and "Log Out" options. By selecting "Settings," users gain the ability to modify their personal information, including their username, first and last names, and an optional self-description. Furthermore, users can easily change their avatar by either clicking on the avatar placeholder (for newly created accounts) or selecting their current avatar. Our website provides a diverse collection of travel-related avatars to choose from, allowing users to personalize their profile further.

In addition to these customization options, users can strengthen their account security by changing their password at any time. We prioritize the safety of our users' information. However, should a user no longer wish to maintain an account, there is also the option to delete it. Although, we believe that our website's offerings will captivate and inspire, making it unlikely that users would want to part ways with their account.

At the upper right corner of the navbar, you will find a convenient switch that allows users to toggle between dark and light modes. This feature enhances the overall user experience by providing the flexibility to customize the background color of our website. By selecting the preferred mode, users can create a more comfortable reading environment that suits their personal preferences, ensuring an enjoyable browsing experience.

In the footer of our website, you will find a comprehensive list of the technologies that were employed to develop this remarkable travel-related platform. These technologies served as the foundation for creating a user-friendly and captivating website. Additionally, we proudly acknowledge the dedicated efforts of our contributors who worked tirelessly day and night to bring this vision to life. Their expertise and commitment have resulted in the creation of an exceptional website that aims to provide an outstanding experience for our beloved users.

---
## Credits
### Resources

The following resources and individuals made invaluable contributions to the project:

#### Fonts

- [WanderlustRegular](https://fontsrepo.com/wanderlust-adventurous-free-font/).

#### Images

- [Favicon Converter](https://favicon.io/favicon-converter/) provides a simple way to take any image and convert it to a favicon.  The favicon for this project was created from [this](https://www.flaticon.com/free-icons/compass) compass image created by Dimitry Miroliubov on [FlatIcon](https://www.flaticon.com/).

- [Icons8](https://icons8.com/icons/) provide simple images and icons.
  - [Blank Avatar Image](https://icons8.com/icon/65342/customer)
  
- [Matt Visiwig](https://twitter.com/MattVisiwig) created an SVG background creator that provides many free options.  The background image was created from [this](https://www.svgbackgrounds.com/) tool.

- [Shields.io](https://shields.io/) provides the badges for the README.

- [Dighital](https://dighital.com/icon-pack/icons/flat-icons/travel-people-icons/) icons were purchased for the avatar images.

#### Templates / Libraries

- [SimpleBar](https://github.com/Grsmto/simplebar) is a custom scroll bar library that allows for replacing the default browser scroll bars.

- [Ian Lunn](https://github.com/IanLunn) created an awesome library called [Hover.css](https://twitter.com/davidmacd) that adds some plug and play css animation classes.  We used this for some of the moving icons on the page.

- [CodyHouse](https://codyhouse.co/) provides a lot of free resources for web developers.  We used their [Login Modal](https://codyhouse.co/gem/loginsignup-modal-window/) for the login/signup functionality.

#### Data

- [ChatGPT](https://chat.openai.com/) is a chatbot that uses GPT-3 to generate responses.  The chatbot was used to come up with the site name.

### Educational
#### Blog Posts

Here are some insightful and informative blogs that were valuable resources:

- [StackOverflow](https://stackoverflow.com/) provided guidance for troubleshooting the project.  Below are the links to key posts that contributed to our success:
- [Regular Expressions for Validation](https://stackoverflow.com/questions/4244109/regular-expression-to-accept-only-characters-a-z-in-a-textbox)
- [Using #each in Handlebars templates](https://stackoverflow.com/questions/21814888/access-values-using-each-in-a-one-dimensional-array)
- [Bootstrap Modal Class Issues](https://stackoverflow.com/questions/44609680/close-button-on-modal-not-working-what-am-i-doing-wrong)
- [Editting Bootstrap Popovers](https://stackoverflow.com/questions/54337652/how-can-i-change-the-color-of-bootstrap-popover-arrows)

---
## Contact
### Collaborators

- Olena Pashchenko - [UserOlena](https://github.com/UserOlena)
- Jennifer Rytikoff - [jenryt](https://github.com/jenryt)
- Bandhavi Bendi - [bbandhu](https://github.com/bbandhu)
- Kevin Small - [kevrev](https://github.com/Kevrev)
- Joshua Dempe - [JDempe](https://github.com/JDempe)

---
## License

This project is open source and available under the [MIT](./LICENSE)

---
## How to Contribute

Looking to contribute?  Find out how at https://github.com/JDempe/WanderList!
