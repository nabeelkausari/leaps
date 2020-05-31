# LEAPS (SSR app)

### Styled JSX
#### Why `styled-jsx`?
It adds unique identifiers to all class names and ids,
which helps in falling into style conflicts. Also it
supports sass.

#### Steps to configure with sass
- install `styled-jsx-plugin-sass` (Done)
- install `node-sass` (Done)
- add configuration to `next.config.js` 
to support **styles in regular scss files** as 
(Done, remove .txt extension)
  ```
  import styles from "./style.scss";
  
  ... (in jsx component)
  <style jsx>{styles}</style>
  ...
  ```
- setup custom `.babelrc` to support file
 imports from internal files, instead 
 from _app.js only. 
 (Done, remove .txt extension)

#### Why are'nt we using it now?
The challenge is to support **styles in regular scss files** in our CRA app
