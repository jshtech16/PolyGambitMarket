import axios from "axios";

export const getLeaderboard = async () => {
    const ret = await axios.post(
        `api.gambitmarket.io/order/leaderboard`
    );
    return ret.data || null;
}