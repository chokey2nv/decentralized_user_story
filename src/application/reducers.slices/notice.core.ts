import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'application/store'
export interface NoticeState {
  open: boolean;
  message: any;
  type: 'error' | 'warning' | 'success' | null | undefined
}
export type DisplayNoticeState = Pick<NoticeState, 'type' | 'message'>
const initialState: NoticeState = {
  open: false,
  message: '',
  type: null,
}

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    displayNotice: (state, action: PayloadAction<DisplayNoticeState>) => {
      state = {
        open : true,
        ...action.payload
      }
    },
    closeNotice: (state) => {
      state = {...initialState}
    }
  },
})

export const {displayNotice, closeNotice} = noticeSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectNotice = (state: RootState) => state.notice

export default noticeSlice.reducer;