import axios from "axios";
import { API_PATHS } from "../utils/constants/api.constants";
 
class CategoryService{

static getCategory(item) {
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
   
    const config = {
        headers: {
          "access-token": token,
        },
      };
    let api = '';
      api = `${API_PATHS.API_BASE_URL}${API_PATHS.getCategory}?limit=${item?.limit}&page=${item?.page}`;
    return axios
        .get(api,config)
        .then((response) => {
           
            if (response) {
                
            }
            return response;
        });
   }

   static AddCategory(item) {
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    const config = {
        headers: {
          "access-token": token,
        },
    };
    let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.AddCategory}`;
    return axios
        .post(api, item,config)
        .then((response) => {
            if (response) {
                // localStorage.setItem("user", JSON.stringify(response));
            }
            return response;
        });
}
static deleteCategory(item) {
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
   
    let api = `${API_PATHS.API_BASE_URL}${API_PATHS.deleteCategory}?id=${item.id}`
    const config = {
        headers: {
          "access-token": token,
        },
      };
    return axios
        .delete(api,config)
        .then((response) => {
            if (response) {
                // localStorage.setItem("user", JSON.stringify(response));
            }
            return response;
        });
}
static getCategoryDetails(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
      headers: {
        "access-token": token,
      },
    };
  let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.getCategory}?id=${id}`;
  return axios
      .get(api,config)
      .then((response) => {
         
          if (response) {
              
          }
          return response;
      });
 }


 
 static editCategory(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
    };
 
    let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.editCategory}`;

  return axios
      .put(api,item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}
static getService(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
      headers: {
        "access-token": token,
      },
    };
  let api = '';
  if(item?.categoryId){
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.getService}?categoryId=${item?.categoryId}&limit=${item?.limit}&page=${item?.page}`;
  }else{
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.getService}?limit=${item?.limit}&page=${item?.page}`;
  }
    
  return axios
      .get(api,config)
      .then((response) => {
         
          if (response) {
              
          }
          return response;
      });
 }

 static AddServices(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
  };
  let api = '';
  api = `${API_PATHS.API_BASE_URL}${API_PATHS.AddServices}`;
  return axios
      .post(api, item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}
static deleteService(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  let api = `${API_PATHS.API_BASE_URL}${API_PATHS.deleteService}?id=${item.id}`
  const config = {
      headers: {
        "access-token": token,
      },
    };
  return axios
      .delete(api,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}

static getServiceDetails(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
      headers: {
        "access-token": token,
      },
    };
  let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.getService}?categoryId=${item.categoryId}&id=${item.id}`;
  return axios
      .get(api,config)
      .then((response) => {
         
          if (response) {
              
          }
          return response;
      });
 }
 static editService(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
    };
 
    let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.editService}`;

  return axios
      .put(api,item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}

// slots
static getSlots(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
      headers: {
        "access-token": token,
      },
    };
  let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.getSlots}?limit=${item?.limit}&page=${item?.page}`;
  return axios
      .get(api,config)
      .then((response) => {
         
          if (response) {
              
          }
          return response;
      });
 }
 static deleteSlot(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  let api = `${API_PATHS.API_BASE_URL}${API_PATHS.deleteSlot}?id=${item.id}`
  const config = {
      headers: {
        "access-token": token,
      },
    };
  return axios
      .delete(api,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}
static AddSlots(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
  };
  let api = '';
  api = `${API_PATHS.API_BASE_URL}${API_PATHS.AddSlots}`;
  return axios
      .post(api, item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}



 static getSlotDetails(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
    headers: {
      "access-token": token,
    },
  };
  let api = `${API_PATHS.API_BASE_URL}${API_PATHS.getSlots}?id=${id}`; // Construct API URL using API_PATHS
  return axios
    .get(api, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
 
 static EditSlots(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
    };
 
    let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.EditSlots}`;

  return axios
      .put(api,item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}

//slot discounts

static getSlotsDiscount(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
      headers: {
        "access-token": token,
      },
    };
  let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.getSlotsDiscounts}?limit=${item?.limit}&page=${item?.page}`;
  return axios
      .get(api,config)
      .then((response) => {
         
          if (response) {
              
          }
          return response;
      });
 }
 static deleteSlotDiscount(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  let api = `${API_PATHS.API_BASE_URL}${API_PATHS.deleteSlotDiscounts}?id=${item.id}`
  const config = {
      headers: {
        "access-token": token,
      },
    };
  return axios
      .delete(api,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}
static AddSlotsDiscount(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
  };
  let api = '';
  api = `${API_PATHS.API_BASE_URL}${API_PATHS.AddSlotsDiscounts}`;
  return axios
      .post(api, item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}



 static getSlotDiscountDetails(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
 
  const config = {
    headers: {
      "access-token": token,
    },
  };
  let api = `${API_PATHS.API_BASE_URL}${API_PATHS.getSlotsDiscounts}?id=${id}`; // Construct API URL using API_PATHS
  return axios
    .get(api, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
 
 static EditSlotsDiscount(item) {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const config = {
      headers: {
        "access-token": token,
      },
    };
 
    let api = '';
    api = `${API_PATHS.API_BASE_URL}${API_PATHS.EditSlotsDiscounts}`;

  return axios
      .put(api,item,config)
      .then((response) => {
          if (response) {
              // localStorage.setItem("user", JSON.stringify(response));
          }
          return response;
      });
}



}
export default CategoryService;