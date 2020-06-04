# Authentication Assessment Test

### Installation steps:

- Download or clone the repository
- Assuming you already have Node.js installed on your computer, from the commandline change the active directory to the downloaded repository folder and run the following commands which will install the modules, dependencies and then start the server:

```sh
npm install
npm start
```
Then open http://localhost:3000 from your browser.

### Testing

To run the test coverage run the following command from the application directory:

```sh
npm test
```
### Database usage

Since it wasn't stated or required that a full featured database solution should be used, I decided to use a JSON file as a database which I feel is more appriopriate for a sample assesment test. Of course I am fully aware that a JSON file cannot be used as a database in a production environment. It is only for the assesment test.

### Security and optimization

This is an assessment test so I decided to skip implementing some security and optimization measures in order to save time. In a production environment I will definitely wouldn't skip this aspect.