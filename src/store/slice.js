import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    color: false,
    expandedMenu: 0,
    isSubmenuVisible: true,
    data : []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        colorInfo: (state, action) => {
            state.color = action.payload;
        },
        setExpandedMenu: (state, action) => {
            state.expandedMenu = action.payload;
        },
        setIsSubmenuVisible: (state, action) => {
            state.isSubmenuVisible = action.payload;
        },
        setData : (state , action) =>{
            state.data = action.payload; 
        }
    },
});

export const { colorInfo, setExpandedMenu, setIsSubmenuVisible , setData } = userSlice.actions;
export default userSlice.reducer;
