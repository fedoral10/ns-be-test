# NicaSource test to apply | Backend 

This is a simple backend made with the only purpose to apply in NicaSource

## How it works?

First of all, you need to create a '.env' file with the following variables:

| Variable | Meaning |
|----------|---------|
|API_HOST | Is the URL to rapidapi's api | 
API_KEY | Is the key to access to rapidapi |
DB_URL | Is the mongodb connection string |
CORS_ORIGIN | CORS URLS separated by whitespaces |
SECRET | The password used by JWT shhhh.... |
EXPIRESIN | Token expiration time 1m, 8h, 1d etc etc |

## Download Dependencies

The hardest code XD, just run on terminal:

`npm install`

## Run backend

By default the backend run on port 3000 you may change it, setting and env variable called PORT and setting it with the port number that you want.

`npm run dev`

## Api Description

If you made everything well, you must be able to make request to api.

| Method | URL| Something about it | 
|--------|----|-----------------|
| post | auth/login | { username:String, password:String } |
| post | auth/signup | { username:String, password:String } |
| get | /statistics | get all Statisctics from db |
| get | /statistics/:country | :country is the String with the country name |
| post | /statistics/:country | :country is the String with the country name, Example: "cases":{"new":null,"active":0,"critical":null,"recovered":31,"1M_pop":"545","total":31},"deaths":{"new":null,"1M_pop":null,"total":null},"tests":{"1M_pop":"363622","total":"20669"},  |
get | /sync |  |

## Finally

Thanks to Nicasource's recruiters to give me the opportunity to apply to the company. 

I deployed and fully functional copy of backend and frontend in the following URLs

[Backend https://nstestbe.herokuapp.com/](https://nstestbe.herokuapp.com/)

[Frontend https://nstestfe.herokuapp.com/](https://nstestfe.herokuapp.com/)