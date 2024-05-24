import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryService from "../../services/category.service";


export const getCategory= createAsyncThunk(
    "get/category",
    async ( item,thunkAPI) => {
      try {
        const data = await CategoryService.getCategory(item);
        return { category: data };
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue({ message });
      }
    }
  );

  export const AddCategory = createAsyncThunk(
    "post/category",
    async(item, thunkAPI) => {
        try {
            const data = await CategoryService.AddCategory(item);
            return { category: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "delete/category",
    async ( item,thunkAPI) => {
      try {
        const data = await CategoryService.deleteCategory(item);
        console.log({data})
        return { category: data };
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue({ message });
      }
    }
  );
  
  export const getCategoryDetails= createAsyncThunk(
    "get/category",
    async ( id,thunkAPI) => {
    
      try {
        const data = await CategoryService.getCategoryDetails(id);
        
        return { category: data };
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue({ message });
      }
    }
  );
  export const editCategory = createAsyncThunk(
    "edit/category",
    async(item, thunkAPI) => {
        try {
            const data = await CategoryService.editCategory(item);
            return { category: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
  );

  export const getService= createAsyncThunk(
    "get/service",
    async ( item,thunkAPI) => {
      try {
        const data = await CategoryService.getService(item);
        console.log({data})
        return { service: data };
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue({ message });
      }
    }
  );
  export const AddServices = createAsyncThunk(
    "post/service",
    async(item, thunkAPI) => {
        try {
            const data = await CategoryService.AddServices(item);
            return { service: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);
export const deleteService= createAsyncThunk(
  "delete/service",
  async ( item,thunkAPI) => {
    try {
      const data = await CategoryService.deleteService(item);
      console.log({data})
      return { service: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const getServiceDetails = createAsyncThunk(
  "get/service",
  async ( item,thunkAPI) => {
    try {
      // const {id,id1}=item;
      
      const data = await CategoryService.getServiceDetails(item);
      console.log({data})
      return { service: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const editService = createAsyncThunk(
  "edit/category",
  async(item, thunkAPI) => {
      try {
          const data = await CategoryService.editService(item);
          return { service: data };
      } catch (error) {
          const message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue({ message });
      }
  }
);


export const getSlots= createAsyncThunk(
  "get/slots",
  async ( item,thunkAPI) => {
    try {
      const data = await CategoryService.getSlots(item);
      console.log({data})
      return { slot: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const deleteSlot = createAsyncThunk(
  "delete/slots",
  async ( item,thunkAPI) => {
    try {
      const data = await CategoryService.deleteSlot(item);
      console.log({data})
      return { slot: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const AddSlots = createAsyncThunk(
  "post/slot",
  async(item, thunkAPI) => {
      try {
          const data = await CategoryService.AddSlots(item);
          return { slot: data };
      } catch (error) {
          const message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue({ message });
      }
  }
);
export const getSlotDetails= createAsyncThunk(
  "get/slot",
  async ( id,thunkAPI) => {
  
    try {
      const data = await CategoryService.getSlotDetails(id);
      
      return { slot: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const EditSlots = createAsyncThunk(
  "edit/slot",
  async(item, thunkAPI) => {
      try {
          const data = await CategoryService.EditSlots(item);
          return { slot: data };
      } catch (error) {
          const message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue({ message });
      }
  }
);


export const getSlotsdiscount= createAsyncThunk(
  "get/slots/discount",
  async ( item,thunkAPI) => {
    try {
      const data = await CategoryService.getSlotsDiscount(item);
      console.log({data})
      return { slot: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const deleteSlotdiscount = createAsyncThunk(
  "delete/slots/discount",
  async ( item,thunkAPI) => {
    try {
      const data = await CategoryService.deleteSlotDiscount(item);
      console.log({data})
      return { slot: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const AddSlotsdiscount = createAsyncThunk(
  "post/slot/discount",
  async(item, thunkAPI) => {
      try {
          const data = await CategoryService.AddSlotsDiscount(item);
          return { slot: data };
      } catch (error) {
          const message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue({ message });
      }
  }
);


export const getSlotddiscountDetails= createAsyncThunk(
  "get/slot/discount",
  async ( id,thunkAPI) => {
  
    try {
      const data = await CategoryService.getSlotDiscountDetails(id);
      
      return { slot: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
export const EditSlotsdiscount = createAsyncThunk(
  "edit/slot/discount",
  async(item, thunkAPI) => {
      try {
          const data = await CategoryService.EditSlotsDiscount(item);
          return { slot: data };
      } catch (error) {
          const message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue({ message });
      }
  }
);


  const initialState = {
    loading: false,
    error: "",
    category: [] || null,
    isLoggedIn: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: {
     
        // [logout.fulfilled]: (state) => {
        //     state.isLoggedIn = false;
        //     state.user = null;
        // },
    },
});

const { reducer } = categorySlice;
export default reducer;