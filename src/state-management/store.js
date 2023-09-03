import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user-login/userReducer'
import pagesReducer from './features/page-handler/pagesReducer'
import switchReducer from './features/componants/switch/switchReducer'
import roomSelectorReducer from './features/componants/roomSelector/roomSelectorReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        pages: pagesReducer,
        switch: switchReducer,
        roomSelector: roomSelectorReducer
    }
})

export default store