import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    color: true,
}

export const slice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        colorInfo: (state, action) => {
            state.color = action.payload;
        }
    }
})

export const {colorInfo} = slice.actions; 

export default slice.reducer; 