
import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../utils/constants/api.constants";

class VerifyPartnerService {
    static getAllPartners(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
          let api = '';
          if(item.id){
          api = `${API_PATHS.API_BASE_URL}${API_PATHS.getallpartners}?id=${item.id}`;
          }else{
            api = `${API_PATHS.API_BASE_URL}${API_PATHS.getallpartners}?limit=${item?.limit}&page=${item?.page}`;
          }

        return axios
            .get(api,config)
            .then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }

    static getAllcustomers(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
     
      const config = {
          headers: {
            "access-token": token,
          },
        };
        let api = '';
          if(item.id){
          api = `${API_PATHS.API_BASE_URL}${API_PATHS.getallcustomers}?id=${item.id}`;
          }else{
            api = `${API_PATHS.API_BASE_URL}${API_PATHS.getallcustomers}?limit=${item?.limit}&page=${item?.page}`;
          }

      return axios
          .get(api,config)
          .then((response) => {
              if (response.data) {
                
              }
              return response.data;
          });
  }

    static getPartnerDocuments(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
        return axios.get(`${API_BASE_URL}${API_PATHS.getpartnerdocuments}?userId=${item.userId}`, config)
            .then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }

    static verifyPartner(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
        return axios
            .post(API_BASE_URL + API_PATHS.verifypartner,item,config)
            .then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }

    static removeUserDetails() {
        localStorage.removeItem("user");
    }

    static getUserDetails() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default VerifyPartnerService;
