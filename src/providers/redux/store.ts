import { configureStore } from "@reduxjs/toolkit";

import WalletSlice from "./WalletSlice";
import MarketSlice from "./MarketSlice";
import UserSlice from "./AuthSlice";

export default configureStore({
  reducer: {
    Wallet: WalletSlice,
    Market: MarketSlice,
    User: UserSlice,
  },
});
