import { configureStore } from '@reduxjs/toolkit'

import client from '../views/contacts/store/reducer'
// import member from '../views/contacts/member/store/reducer'

export default configureStore({
    reducer: {
        client,
        // member
    }
})
