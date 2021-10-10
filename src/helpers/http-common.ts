import axios from "axios";

export default axios.create({
  baseURL: "https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod",
  headers: {
    "Content-type": "application/json"
  },
  // We can just switch to env variables for more security
  auth: {
    username: "frontend@shyftplan.com",
    password: "api_test_auth_token"
  }
});
