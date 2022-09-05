import { createSlice } from "@reduxjs/toolkit";
let initialState = {};
initialState = { theme: "light", images: [], query: "", loading: false };

const mySlice = createSlice({
    name: "mySlice",
    initialState: initialState,
    reducers: {
        toggleTheme: (state, action) => {
            if (state.theme === "light") {
                state.theme = "dark"
            } else state.theme = "light";
        },
        setImages: (state, action) => {
            state.images = action.payload
        },
        setQuery: (state, action) => {
            state.query = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }


    }

})


export const { toggleTheme, setImages, setQuery, setLoading } = mySlice.actions;
export default mySlice.reducer;