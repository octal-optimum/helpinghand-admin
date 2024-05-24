
import axios from "axios";
import { API_BASE_URL, API_PATHS } from "../utils/constants/api.constants";

class BookingService{
    static getAllBookings(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
          let api = '';
          if(item.id){
          api = `${API_PATHS.API_BASE_URL}${API_PATHS.getbooking}?id=${item.id}`;
          }else{
            api = `${API_PATHS.API_BASE_URL}${API_PATHS.getbooking}?limit=${item?.limit}&page=${item?.page}`;
          }

      
        return axios
            .get(api,config).then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }

    static getRelevantPartners(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
          const slotsQueryParam = encodeURIComponent(JSON.stringify(item.slots));
          return axios.get(`${API_BASE_URL}${API_PATHS.getrelevantpartners}?slots=${slotsQueryParam}&latitude=${item?.latitude}&longitude=${item?.longitude}`, config)
          .then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }

    static allotPartners(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
        return axios
            .post(API_BASE_URL + API_PATHS.allotpartners,item,config)
            .then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }


    static cancelBooking(item) {
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        const config = {
            headers: {
              "access-token": token,
            },
          };
        return axios
            .post(API_BASE_URL + API_PATHS.cancelbooking,item,config)
            .then((response) => {
                if (response.data) {
                  
                }
                return response.data;
            });
    }


    static getPromocodes(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
     
      const config = {
          headers: {
            "access-token": token,
          },
        };
      let api = '';
      if(item?.id){
        api = `${API_PATHS.API_BASE_URL}${API_PATHS.getpromocodes}?id=${item?.id}`;
      }else{
        api = `${API_PATHS.API_BASE_URL}${API_PATHS.getpromocodes}?limit=${item?.limit}&page=${item?.page}`;
      }
      return axios
          .get(api,config)
          .then((response) => {
             
              if (response.data) {
                  
              }
              return response.data;
          });
     }
  
     static addPromocode(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
      const config = {
          headers: {
            "access-token": token,
          },
      };
      let api = '';
      api = `${API_PATHS.API_BASE_URL}${API_PATHS.addpromocodes}`;
      return axios
          .post(api, item,config)
          .then((response) => {
              if (response.data) {
                  // localStorage.setItem("user", JSON.stringify(response.data));
              }
              return response.data;
          });
  }
  static deletePromocode(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
     
      let api = `${API_PATHS.API_BASE_URL}${API_PATHS.deletepromocodes}?id=${item.id}`
      const config = {
          headers: {
            "access-token": token,
          },
        };
      return axios
          .delete(api,config)
          .then((response) => {
              if (response.data) {
                  // localStorage.setItem("user", JSON.stringify(response.data));
              }
              return response.data;
          });
  }
 
  
  
   
   static editPromocode(item) {
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const config = {
        headers: {
          "access-token": token,
        },
      };
   
      let api = '';
      api = `${API_PATHS.API_BASE_URL}${API_PATHS.editpromocodes}`;
  
    return axios
        .put(api,item,config)
        .then((response) => {
            if (response.data) {
                // localStorage.setItem("user", JSON.stringify(response.data));
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

export default BookingService;
