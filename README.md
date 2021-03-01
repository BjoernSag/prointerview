Added to this project is the figma project: https://www.figma.com/file/ece5VdyEtpeiQTBRljO7xO/Propagate-Project

It also has a cypress.io integration, so feel free to test that by writing npm run cypress:open

The project is based on the following problem:



Thank you for your interest in the senior full-stack engineer role at Propagate Ventures! The next step in our interview process is the following take-home coding assignment. Even though our ideal candidate has some familiarity with back-end development as well, this interview is focused on the front end since that's where most of the initial work will be.

Your mission, if you choose to accept it, is to implement a React component that shows a table of rows of trees on a farm.

And assume you'll have access to two API endpoints that return JSON payloads with the following forms:

**Rows API:**

```jsx
[
	{ id: 1, field_id: 1, crop_type_id: 1, genetics: "Auburn Super", in_row_spacing: 12, row_length: 500, tree_count: 42 },
	{ id: 2, field_id: 1, crop_type_id: 1, genetics: "Sleeping Giant", in_row_spacing: 12, row_length: 500, tree_count: 42 },
	{ id: 3, field_id: 1, crop_type_id: 2, genetics: "Blackcomb", in_row_spacing: 6, row_length: 300, tree_count: 50 },
	{ id: 4, field_id: 1, crop_type_id: 2, genetics: "Cheakamus", in_row_spacing: 6, row_length: 300, tree_count: 50 }
]
```

**Crop Types API:**

```jsx
[
	{ id: 1, name: "Chinese Chestnut", genetics: ["Auburn Super", "Sleeping Giant"] },
	{ id: 2, name: "Blackcurrent", genetics: ["Blackcomb", "Cheakamus"] }
]
```

For the purpose of this assignment, just mock the data by hard-coding the JSON or using a mock library.

## Basic Requirements:

- Display both the "Rows" and "Genetics" tables using React.
- The Genetics table should have one line for each crop genetic, and show the total row length and tree count for that genetic.
- Clicking "New Row +" should add a new row with a dropdowns for Crop Type and Genetics, and inputs for the In Row Spacing and Row Length. Tree Count can be calculated automatically from the spacing and row length by dividing row length by tree count and rounding up.
- Come prepared to demo your work and discuss next steps and potential improvements.

## Technical Requirements:

- Use React hooks (not class components)
- Follow React best practices and be prepared to explain your rationale
- Feel free to use create-react-app or something similar to get started

## Notes:

- There is no need to get everything in the mockup implemented. We only expect you to spend 2-3 hours on this assignment. In particular:
    - Don't worry about getting pixel perfect implementation.
    - Don't worry about implementing the side-nav unless you have extra time.
- You can assume every crop type has only one genetic if you want to simplify the assignment. In  this case there is no need to have dropdowns for the genetics column, it can just be uneditable text.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
