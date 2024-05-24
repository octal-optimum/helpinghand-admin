
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VerifyPartnerService from "../../services/verifypartner.service";


export const GetAllPartners = createAsyncThunk(
    "allpartners/get",
    async ( item,thunkAPI) => {
        try {
            const data = await VerifyPartnerService.getAllPartners(item);
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


export const GetAllCustomers = createAsyncThunk(
    "allcustomers/get",
    async ( item,thunkAPI) => {
        try {
            const data = await VerifyPartnerService.getAllcustomers(item);
            return { customers: data };
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

export const GetPartnerDocuments = createAsyncThunk(
    "partnersdocuments/get",
    async ( item,thunkAPI) => {
        try {
            const data = await VerifyPartnerService.getPartnerDocuments(item);
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

export const VerifyPartner = createAsyncThunk(
    "verifypartner/get",
    async (item, thunkAPI) => {
        try {
            const data = await VerifyPartnerService.verifyPartner(item);
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


const initialState = {
    loading: false,
    error: "",
    user:  null,
   
};

const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    
    },
});

const { reducer } = partnerSlice;
export default reducer;
