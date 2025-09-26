import { createSlice } from '@reduxjs/toolkit'

type MarketInfoType = {
    Market: {
        image: string,
        groupItemTitle: string,
        outcomes: string,
        clobIds: string[],
        bestPrice: number[] // ask, bit
    }
}

export const MarketSlice = createSlice({
    name: 'Market',
    initialState: {
        image: '',
        groupItemTitle: '',
        outcomes: '',
        clobIds: [],
        bestPrice: []
    },
    reducers: {
        setMarketImage: (state, action) => {
            state.image = action.payload.image;
        },
        setMarket: (state, action) => {
            state.groupItemTitle = action.payload.groupItemTitle;
            state.image = action.payload.image;
            state.outcomes = action.payload.outcomes;
            state.clobIds = action.payload.clobIds;
            state.bestPrice = action.payload.bestPrice;
        }
    }
})

export const { setMarketImage, setMarket } = MarketSlice.actions

export const MarketImage = (state: MarketInfoType) => state.Market.image
export const MarketGroupItemTitle = (state: MarketInfoType) => state.Market.groupItemTitle
export const MarketOutcomes = (state: MarketInfoType) => state.Market.outcomes
export const MarketClobIds = (state: MarketInfoType) => state.Market.clobIds
export const MarketBestPrice = (state: MarketInfoType) => state.Market.bestPrice

export default MarketSlice.reducer