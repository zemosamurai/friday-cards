import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setStatusLoading } from 'app/appSlice'
import { errorUtils } from 'common/utils/error-utils'
import { cardsAPI, CardType } from 'features/cards/cardsAPI'

export const getCardsDataTC = createAsyncThunk(
  'cards/getCardsData',
  async (cardsPack_id: string, { dispatch }) => {
    dispatch(setStatusLoading(true))
    try {
      const res = await cardsAPI.getCards({ cardsPack_id })

      dispatch(setCardsData(res.data))
    } catch (e) {
      errorUtils(e as AxiosError, dispatch)
    } finally {
      dispatch(setStatusLoading(false))
    }
  }
)

const cardsSLice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 1,
    page: 1,
    pageCount: 7,
    packUserId: '',
  } as CardsStateType,
  reducers: {
    setCardsData(state, action: PayloadAction<CardsStateType>) {
      const { cards, cardsTotalCount, maxGrade, minGrade, page, pageCount, packUserId } = {
        ...state,
        ...action.payload,
      }

      state.cards = cards
      state.cardsTotalCount = cardsTotalCount
      state.maxGrade = maxGrade
      state.minGrade = minGrade
      state.page = page
      state.pageCount = pageCount
      state.packUserId = packUserId
    },
  },
})

export const cardsReducer = cardsSLice.reducer

export const { setCardsData } = cardsSLice.actions

export type CardsStateType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}