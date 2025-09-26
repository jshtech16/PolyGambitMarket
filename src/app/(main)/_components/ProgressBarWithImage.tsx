import { useEffect } from "react";
import { EventInterface } from "@/interfaces/market.interface";
import { sortByMarkets } from "@/util/sortByMarkets";

interface PropsInterface {
    event: EventInterface
}

const ProgressBarWithImage: React.FC<PropsInterface> = ({event}) => {

    // const [markets, setMarkets] = useState<MarketInterface[] | null>(null);

    useEffect(() => {
        const _markets = sortByMarkets(event);
        console.log(_markets)
    }, [])

    return (
        <div></div>
    )
}

export default ProgressBarWithImage;