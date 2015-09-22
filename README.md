# Simple Crud
This is simple app to help create CRUD apps with angular v1 and typescript. 

A Form is defined as an object and passed to angular formly to render. 
Similarly table definitions for lists of data are treated in a similar manner.
A typical form definition looks something like this
``` typescript
import { IExtendFormlyObject } from '../form-interfaces';

const Company: IExtendFormlyObject   = {
  fields: [
      {
      className : 'row',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          key: 'contact_person',
          type: 'input',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Contact Person',
            required: true
          }
        },
        {
          key: 'date_created',
          type: 'datepicker',
          className: 'col-xs-4',
          templateOptions: {
            label: 'Date Created',
            required: true
          }
        }
      ]
    }
  ],
  dependencies: []
};
```

And similarly a table definition looks something like this.

```Typescript
companies: {
		headers: [
			{ name: "Name", field: "name" },
			{ name: "Contact Person", field: "contactPerson" },
		]
    },
```
Table definitions are definied in a file called [schema.ts](https://github.com/selasiehanson/simple_crud/blob/master/app/components/shared/schema.ts)
whiles form definitions are put in individual ts files in the [forms directory](https://github.com/selasiehanson/simple_crud/tree/master/app/components/shared/forms)

# Components
The core libraries used include the ff

+ [Typescript](http://www.typescriptlang.org/)
+ [Twitter bootstrap](http://getbootstrap.com/)
+ [Webpack](http://webpack.github.io/)
+ [AngularJs](https://angularjs.org/)
+ [Angular Formly](http://angular-formly.com/)

# Running the project
+ First clone the project onto your machine by typing `git clone https://github.com/selasiehanson/simple_crud.git` in your terminal
+ Then cd into the cloned directory and run `npm install` to bring in the dependencies
+ After type `npm start`. This will start the app on port 8080
+ You can then access the app with this url `http://localhost:8080`

As part of the webpack configuration, a proxy has been added to redirect all api calls to a restful service running on 
`port 3050`. You will have to change to change this to your specific port. 

# Structure
The entry point into the project is the `index.js` file. This the only javascript file. Everything else is written in 
typescript and can be found in the [app directory](https://github.com/selasiehanson/simple_crud/tree/master/app). 

