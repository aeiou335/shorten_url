### Installation
npm install && npm start
The server will be started at port 4001

### Requirement
Node.js 
Redis

### Usage

#### Get shorten URL
- Method: post
- Route: /shorten
- data: {url: URL_FOR_SHORTEN}
- return: URL that has been shortened, you need to use the url to redirect to original website

#### Redirect
- Method: get
- Route: /:url
