
## Installation

First clone the repo and start the development server

```bash
  npm install i
  npm run dev
```


## Deployment
Navigate to the `data/api.jsx` there you will find development and production config

```
// Production config
const URI = "https://api.wleness.com/api/";
export const RAZORPAY_KEY = "RAZORPAY_KEY_GOES_HERE";

// Development Config
// const URI = "http://127.0.0.1:5000/api/";
// export const RAZORPAY_KEY = "RAZORPAY_KEY_GOES_HERE";
```
Uncomment the configuration you want to use.

NOTE: 
While pushing code to production always use production config and comment out the development config
