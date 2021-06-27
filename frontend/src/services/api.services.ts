import axios from 'axios';

export const ApiService = {
  baseUrl: 'http://localhost:3350/api/graphql',
  // baseUrl: 'https://app-medicine-api.herokuapp.com/api/graphql',

  query(query: any) {
    try {
      return axios({
        method: 'POST',
        url: this.baseUrl,
        data: {
          query,
        },
      });
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },

  mutation(data: any) {
    try {
      return axios.post(this.baseUrl, {
        query: data,
      });
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
