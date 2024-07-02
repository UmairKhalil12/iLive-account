import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    color: true,
    expandedMenu: null, 
}

export const slice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        colorInfo: (state, action) => {
            state.color = action.payload;
        },
        setExpandedMenu: (state, action) => {
            state.expandedMenu = action.payload;  
        }
    }
})

export const { colorInfo, setExpandedMenu } = slice.actions; 

export default slice.reducer;
