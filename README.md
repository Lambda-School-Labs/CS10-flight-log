# Falcano

    Falcano aims to be an easy to use flight log for new and seasoned pilots alike. Create a record of
your planes and then document your flights and record your hours. It is easy to use, and even         easier to look at. No need to calculate your total hours either, even by specific license type, we    do it all for you! Time flies, but you won't ever lose track of your hours again with Falcano.


## Table of Contents(#toc)
* [Main Tech Stack](#mts)
    * [Front end Libraries](#fel)
    * [Back end Libraries](#bel)
    * [CSS](#css)
    * [Justifications](#just)
* [Basic Overview](#bo)
    * [Home Page](#home)
    * [Flights](#flights)
    * [Aircraft](#aircraft)
    * [Instructors](#instructors)
    * [Settings](#sett)
    * [Billing](#bill)
* [Routes](#routes)



## [Main Tech Stack](#mts)

* [Django](https://www.djangoproject.com/) - Backend database management
* [React](https://reactjs.org/) - The web framework used
* [JWT](https://jwt.io/) - Used to securely transfer user tokens for authorization.
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
* [Stripe](https://stripe.com/) - Online payments company

## [Front end libraries/frameworks](#fel)

* [Cloudinary](https://www.cloudinary.com)
* [Parser](https://www.npmjs.com/package/html-react-parser) - HTML to React parser
* [Helmet](https://www.npmjs.com/package/react-helmet) - manages changes to document head
* [reactstrap](https://reactstrap.github.io) - Used for modals, and a few buttons.
* [FontAwesome](https://www.Fontawesome.com) - Icons
* [React Chart JS 2](https://www.npmjs.com/package/react-chartjs-2) - Used for the chart on the home page
* [@material-ui/core](http://material-ui.com/) - Used for all the cards.
* [bootstrap](https://getbootstrap.com/) - Needed for the styling of reactstrap

## [Back end libraries/frameworks](#bel)
* [django rest framework](https://www.django-rest-framework.org/) - For building web API
* [django-rest-framework-jwt](https://www.django-rest-framework.org/api-guide/authentication/)

## [CSS](#css)

* [CSS Grid]
* [LESS](http://lesscss.org/)

### Prerequisites

For this project install these dependencies by visting the links below.
[Django](https://docs.djangoproject.com/en/2.1/topics/install/),
[npm](https://www.npmjs.com/get-npm) 
or [yarn](https://yarnpkg.com/lang/en/docs/install),
and [pip/pipenv](https://pypi.org/project/pip/) 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


1. For the frontend/react side of the project
   - open a terminal 
   - cd into the /frontend folder and type
```
yarn install
yarn start
``` 
2. for the backend/Django side
   - open a new terminal
   - cd into /backend fold, and type
```
pipenv shell
pipenv install
python manage.py runserver
```
3. Further setup:
   - go to `http://localhost:8000/admin`
   - create a new group `default`
   - add create and delete permission for that group

4. Where to get SkyVector HTML snippits
   - go `skyvector.com`
   - upper left click `Flight Plan`
        - enter Departure and Destination airport codes
            - upper right click `Link`
            - select lower link `Image Link with Chart Snippet`


## Deployed on
* Heroku for backend - https://flightloggercs10.herokuapp.com
* Netlify for frontend - https://stoic-meitner-50ac30.netlify.com/

## Deployment

Deploying on the react side is relatively easy, typing
```
yarn build
```
while in the frontend folder will get you started, making it easy to deploy on a site like
[netlify](https://www.netlify.com/docs/manual-deploys/)(go here to learn more about drag and drop deployment)

It will be a bit more involved with the backend(Django). The link below will get you started.
[heroku](https://devcenter.heroku.com/articles/git)


## [Justifications](#just)

 * [Django]
    - There were a few reasons behind choosing Django for this project. First and foremost we knew having   sql database would make using relational data much easier. The admin interface was also a factor,
      making testing easier, along with debugging. Also being exposed to Django at the end of our course drove us to choose Django.
 
 * [Reactjs]
    - We were already familiar with react, knowing it would provide us with what we needed in order to 
      create a UX that was user friendly.

 * [Heroku / Netlify] 
    - This one was easy, we had used these services for back/frontend deployment before, knew they worked   and were not too tricky to use.

 * [Material UI]
    - This was recommended to us by our PM, it ended up being a good choice. It looks clean and is          relativly easy to use.

 * [Reactstrap] 
    - We chose to use this mostly for the modals, as we were already familiar with reactstrap's modals from the course.


## [Basic Overview](#bo)
 * [HomePage](#home)
    Greets you with a graph of your total hours by license type split up by the specific hours flown. Which hours displayed are customizable by clicking the labels at the top of the graph.

 * [Flights](#flights)
    Where you record your flight, with various types of hours flown, which aircraft you used, and even a space for and html snippet/link to your flight plan on [Skyvector](https://www.skyvector.com)

 * [Aircraft](#aircraft)
    Where you record which plane you flew on, and where you can upload a picture of it as well if you wish.

 * [Instructors](#instructors)
    Keep track of all of your instructors information as well as a picture!

 * [Settings](#sett)
    You can change your password here.

 * [Billing](#bill)
    Unlock the app's premium features here!

## [Routes](#routes)

 * [GET] api/flights/   -view a list of flights created by the user
 * [GET/PUT] api/flights/(flightID)/ -view a specific flight // edit a specific flight
 * [GET] api/aircraft/  -view list of aircraft created by the user user
 * [GET/PUT] api/aircraft/(aircraftID)/ -view a specific aircraft // edit a specific aircraft
 * [GET] api/instructors/ -view list of instructors created by the user
 * [GET/PUT] api/instructor/(instructorID)/ -view a specific instructor // edit a specific instructor
 * [GET] api/filtedflights/(aircraftID)/ -view a list of flights for a specific aircraft
 * [POST] api/passwordchange/  -allows user to change password.
 * [GET] api/joined/ -view flights sorted by license type 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

