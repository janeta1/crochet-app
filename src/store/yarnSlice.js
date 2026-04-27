import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllYarns,
  saveYarn,
  deleteYarn as deleteYarnDB,
} from "../db/database";

export const loadYarns = createAsyncThunk("yarns/load", async () => {
  return await getAllYarns();
});

export const addYarnAsync = createAsyncThunk("yarns/add", async (newYarn) => {
  await saveYarn(newYarn);
  return newYarn;
});

export const deleteYarnAsync = createAsyncThunk(
  "yarns/delete",
  async (yarnId) => {
    await deleteYarnDB(yarnId);
    return yarnId;
  },
);

export const editYarnAsync = createAsyncThunk(
  "yarns/edit",
  async ({ id, data }) => {
    await saveYarn(data);
    return { id, data };
  },
);

export const toggleYarnFavoriteAsync = createAsyncThunk(
  "yarns/toggleFavorite",
  async ({ id, yarns }) => {
    const yarn = yarns.find((y) => y.id === id);
    const updated = { ...yarn, isFavorite: !yarn.isFavorite };
    await saveYarn(updated);
    return updated;
  },
);

const yarnsSlice = createSlice({
  name: "yarns",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadYarns.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadYarns.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addYarnAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteYarnAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((y) => y.id !== action.payload);
      })
      .addCase(editYarnAsync.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.items.findIndex((y) => y.id === id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...data };
      })
      .addCase(toggleYarnFavoriteAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((y) => y.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default yarnsSlice.reducer;
