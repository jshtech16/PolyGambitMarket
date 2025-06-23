import { createSlice } from '@reduxjs/toolkit'

type WalletInfoType = {
  Wallet: {
    walletactive: boolean,
    walletaddress: string,
    userBalance: number
  }
}

export const WalletSlice = createSlice({
  name: 'Wallet',
  initialState: {
    walletactive: false,
    walletaddress: '',
    userBalance: 0
  },
  reducers: {
    setWallet: (state, action) => {
      state.walletactive = action.payload.active;
      state.walletaddress = action.payload.address;
    },
    setUserBalance: (state, action) => {
      state.userBalance = action.payload
    }
  }
})

export const { setWallet, setUserBalance } = WalletSlice.actions

export const walletactive = (state: WalletInfoType) => state.Wallet.walletactive
export const walletaddress = (state: WalletInfoType) => state.Wallet.walletaddress
export const userBalance = (state: WalletInfoType) => state.Wallet.userBalance

export default WalletSlice.reducer