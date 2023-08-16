const axios = require("axios");
const fetchFromApis = function (params) {
  //Note : "this" keyword is not working in arrow function. so i use traditional way to grap the same object property.
  return axios
    .get(params)
    .then((data) => {
      // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", data.data);
      return data.data;
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

const fetchPhotoFromApis = function (params) {
  try {
    return axios.get(params).then((d) => {
      return d.data;
    });
  } catch (error) {
    console.log("error1111111111111111111111111111111:", error);
  }
};

// fetchFromApis("https://cataas.com/api/tags");

const catApi = {
  defualtMixAll: "https://cataas.com/cat/cute/says/Hello?filter=sepia&type=or",
  allTags: fetchFromApis("https://cataas.com/api/tags"),
};

const APIsWithoutAuth = {
  catApi: catApi,
};

class Fortune {
  constructor() {
    this.options = {
      method: "",
      url: "",
      params: {},
      headers: {
        "X-RapidAPI-Key": process.env.FORTUNE_API_KEY,
        "X-RapidAPI-Host": "fortune-cookie2.p.rapidapi.com",
      },
    };
  }
  async myFortune() {
    let opt = this.options;
    opt.method = "GET";
    opt.url = "https://fortune-cookie2.p.rapidapi.com/fortune";
    try {
      const response = await axios.request(opt);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async categoryList() {
    let opt = this.options;
    opt.url = "https://fortune-cookie2.p.rapidapi.com/fortune/category_list";
    try {
      const response = await axios.request(opt);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async fortuneByCategory(category) {
    let opt = this.options;
    opt.url = "https://fortune-cookie2.p.rapidapi.com/fortune/by_category";
    opt.params.category_key = category;
    try {
      const response = await axios.request(opt);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

module.exports = { Fortune, APIsWithoutAuth };
