
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookingService from "../../services/booking.service";


export const GetAllBookings = createAsyncThunk(
    "allbookings/get",
    async (item, thunkAPI) => {
        try {
            const data = await BookingService.getAllBookings(item);
            return { bookings: data };
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

export const GetReleventPartners = createAsyncThunk(
    "relevantpartners/get",
    async ( item,thunkAPI) => {
        try {
            const data = await BookingService.getRelevantPartners(item);
            return { partners: data };
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

export const AllotPartner = createAsyncThunk(
    "allotpartner/get",
    async (item, thunkAPI) => {
        try {
            const data = await BookingService.allotPartners(item);
            return { partners: data };
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

export const CancelBooking = createAsyncThunk(
    "cancelbooking/get",
    async (item, thunkAPI) => {
        try {
            const data = await BookingService.cancelBooking(item);
            return { bookings: data };
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


export const GetPromocodes = createAsyncThunk(
    "get/promocodes",
    async ( item,thunkAPI) => {
      try {
        const data = await BookingService.getPromocodes(item);
        return { promocodes: data };
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

  export const AddPromocodes = createAsyncThunk(
    "post/promocodes",
    async(item, thunkAPI) => {
        try {
            const data = await BookingService.addPromocode(item);
            return { promocodes: data };
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

export const DeletePromocodes = createAsyncThunk(
    "delete/promocodes",
    async ( item,thunkAPI) => {
      try {
        const data = await BookingService.deletePromocode(item);
        return { promocodes: data };
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

  export const EditPromocodes = createAsyncThunk(
    "edit/promocodes",
    async(item, thunkAPI) => {
        try {
            const data = await BookingService.editPromocode(item);
            return { promocodes: data };
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
    bookingDetails:  null,
   
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      
    },
});

const { reducer } = bookingSlice;
export default reducer;
