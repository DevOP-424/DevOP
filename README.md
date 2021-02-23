prior to development install the follwoing packages

npm install --save-dev react-router-dom @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader style-loader sass-loader sass webpack webpack-cli electron-reloader

npm i electron express mysql socket.io

to begin development and see your code realtime do the following:
    first run in one terminal: npm run watch
    then launch the application in a new Terminal using: npm start

to make a new component(new feature for example: board, chat, team and all subfeatures such as the cards that will be on a lane) create a new .js file.

in said js file make a new class for the component using the folwoing syntax.
    export default class {class_Name} extends React.Component{
        render(){
            return();
        }
    }

you then have to import the file in the "Parent" (board is imported into main) and call the class in the parent code.
