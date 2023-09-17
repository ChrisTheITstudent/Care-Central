import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user-login/userReducer'
import pagesReducer from './features/page-handler/pagesReducer'
import switchReducer from './features/componants/switch/switchReducer'
import roomSelectorReducer from './features/componants/roomSelector/roomSelectorReducer'
import createAccountReducer from './features/componants/create-account/creatAccountReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        pages: pagesReducer,
        switch: switchReducer,
        roomSelector: roomSelectorReducer,
        createAccount: createAccountReducer
    }
})

export default store