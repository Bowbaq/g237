# 15-237 Gallery #

## Author ##

Maxime Bury (mbury)

## Description ##

The goal of this app is to provide a place for the students of 15-237 to post their term project apps. This will allow students to discover all the great projects that their classmates are working on. The second objective of this app is to provide a place for people to post reviews and feedback in order to help everybody doing their user study.

### Features ###

#### Client ####

- Authenticate via AndrewID & password otherwise communicated. (See Admin features section)
- Projects:
    - Browse the list of projects
        - Sort by least reviewed, most recently updated
    - Add a project
    - Add reviews to a project
    - Request to join a project
    - Edit a project (when you're a team member)
    - Deny a join request (when you're a team member)
- Reviews
    - Browse reviews (project detail page, user detail page)
    - Vote other people reviews up or down, placing most upvoted reviews to the top
- Users
    - Browse the list of users (ordered by most active (review count/quality heuristic))
    - See a user's projects, reviews
    - Edit own profile

#### Admin (regular website) ####

- Administer users (in particular, add some)

## Usage ##

Run *nmp install* in both client/ and server/

TODO
- Instructions on where to get the app
- Instructions on how to create users in the backend

## Required elements ##

1. [01] **Javascript** This app is primarily javascript based 
   
   (See : *server/app/models/*, *client/app/modules/*)
2. [03] **HTML** Use of HTML in a templating context (binding javascripts objects to augmented HTML views)

   (See: server/app/views/admin/users, *client/app/templates*)
3. [05] **DOM manipulation** All the views are dynamically rendered and inserted into the DOM at runtime. Views re-render as needed on model change.
   
   (See *client/app/router.js*, *client/app/modules/\*/views.js*)
4. [06] **jQuery** Used primarily to hook user interactions into the views

    (See *client/app/modules/\*/views.js*)
5. [09] **AJAX (client)** Backbone's models and collections consume a REST API by default. In addition, some manual querying of the API is done for authentication.

    (See *client/app/modules/auth.js*)
6. [10] **AJAX (server)** The server side of this app exposes a RESTful API

   (See: server/app/controllers/*, server/config/routes.js)
7. [11] **Node.js** The server side of this app is programmed using RailwayJS, which is a RoR-like component that comes on top of Express, itself on top of Node.js

   (See: server/app/*)
8. [14] **Server side databases** The server side of this app is backed by MongoDB. Mongoose is used to interface with MongoDB.

   (See: server/app/models/*)
9. [15] **Backbone.js** Client side MV* framework, plugs in nicely into the RESTful API exposed by the server side. Client side templating. 

   (See: client/*) 
10. [15] **Lodash** Performant JavaScript toolbelt, used to create shallow copies of objects without some fields, perform non-destructive extension, filter lists, batch process some data... Also, it's the rendering component used by Backbone to bind data to templates.

   (See: server/app/controllers/team_controller.js, server/app/models/*)

## Design & User testing ##

The app as it stands now went through several (software) design decisions :

1. The original plan was to do a classic client/server app, with server-side rendering of the views, as presented in class. I also planned to roll my own UI components. I started implementing a couple things with RailwayJS.
2. I realized that from a UX perspective, my initial approach was likely to yield poor results (especially due to large latencies and low bandwidth on mobile networks). I started researching for an alternative, and eventually settled on Backbone.js as my main client-side component. At this point, time was running low and I made the decision to switch to jQuery Mobile for the presentation layer, hoping to benefit from the widget library and existing styles.
3. Integrating Backbone.js & jQuery Mobile proved to be extremely difficult to get right. Furthermore, user testing during the hackathon showed that the UI promises of jQuery Mobile were far from being fullfilled on all phones. Anything but iPhones was basically unusable. I made the decision to follow my initial hunch and strip out jQuery mobile.
4. On the server-side, I had initially started using JugglingDB, the ORM that comes integrated wit RailwayJS. It turned out that it was too limited, and I switched to Mongoose which seems to be a more mature piece of software.

Further user testing of the UI will be done (once the UI is implemented)

## Contract ##

- All the features mentionned above will be fully fonctionnal
- The UI will be implemented, probably based on Twitter Bootstrap augmented with custom styles
- The app will be packaged as a stand-alone Phonegap app
- The server-side will be deployed to Heroku
