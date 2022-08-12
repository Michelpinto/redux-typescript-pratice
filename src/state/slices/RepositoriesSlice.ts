import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState: RepositoriesState = {
  loading: false,
  error: null,
  data: [],
};

type NpmPackage = { package: { name: string } };
type NpmRepositoryResponse = { objects: NpmPackage[] };

export const searchRepositories = createAsyncThunk<
  string[],
  string,
  { rejectValue: Error }
>('repositories/search', async (term: string) => {
  const { data } = await axios.get<NpmRepositoryResponse>(
    'https://registry.npmjs.org/-/v1/search',
    { params: { text: term } }
  );

  return data.objects.map((result: NpmPackage) => {
    return result.package.name;
  });
});

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(searchRepositories.pending, (state) => {
      state.loading = false;
      state.error = null;
      state.data = [];
    });

    builder.addCase(searchRepositories.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      }
      state.data = [];
    });

    builder.addCase(searchRepositories.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
  },
});

export default repositoriesSlice.reducer;
