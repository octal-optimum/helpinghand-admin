import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const getEvents = createAsyncThunk(
  "events/get",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const addNewEvent = createAsyncThunk(
  "events/add",
  async (event, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events`, event);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/update",
  async (event, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/events/${event.id}`, event);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (event, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${event.id}`);
      return event;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// Initial state
const initialState = {
  loading: false,
  events: [],
  categories: [],
  error: null,
};

// Create slice
const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    resetCalendar: (state, action) => {
      const { flag, value } = action.payload;
      state[flag] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addNewEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(event => event.id !== action.payload.id);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

// Export actions and reducer
export const { resetCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
