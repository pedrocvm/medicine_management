import axios from 'axios';

export const ApiService = {
  init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  },

  query(query: any) {
    try {
      return axios({
        method: 'POST',
        url: 'http://localhost:3350/api/graphql',
        data: {
          query,
        },
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
