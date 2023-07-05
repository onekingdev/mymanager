# Development Rules
## Please read carefully before contribution

### GLOBAL
- Use `yarn`
- Make sure to use `node 16 + `
- Before pushing to GitHub, ensure there are no `console logs`, `errors`, or `warnings` in the console
- Always keep your branch update
- Work on your own branch
- Before you Raise a PR, git pull origin main. Fix conflicts if there are any. Make sure you do not remove other dev's code in the process.
- On your pr please fill the description and include your work and what changes included in your pull request
## DONOT submit pr with yarn.lock and don't change any global and system prject files in your pull request


### FRONTEND
- Work in `client` folder
- Use `Functional` component
- Consult the team leader first if you need to create a new folder outside the current folder structure.
- Do not add any UI library. Do the design with existing libraries. 
- Use these readymade components instead.
```
views/extensions
views/tables
views/components
views/forms
views/charts
```
- Use bootstrap classes. 
- In case you must need to use custom css, write your css in client/src/assets/scss/style.scss. This is a global file.
- Do not make any changes to the `@core` folder

## Use `REDUX` and `DISPATCH` for query the data and storing. Don't use depreciated methods. create 3 separate files as 
  1- `api.js`
  2- `action.js`
  3- `reducer.js`
to fetch and store data 



### BACKEND
- Use your personal MongoDB atlas URI in the server `.env`. Do not use the production database.
- Use `asyncHandler` for all controllers.
- Create `Postman Json` for your work and share with team leader



