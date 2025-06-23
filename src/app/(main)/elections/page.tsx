import ElectionsForecast from "./_components/ElectionsForecast";
import ElectionsMap from "./_components/ElectionsMap";
import ElectionsPopularVS from "./_components/ElectionsPopularVS";
import ElectionsSwingState from "./_components/ElectionsSwingState";
import ElectionsTab from "./_components/ElectionsTab";
import ElectionsTrending from "./_components/ElectionsTreding";
import ElectionsVS from "./_components/ElectionsVS";

const ElectionPage = () => {
    return (
        <div className="bg-black px-[20px] py-[30px] lg:py-[60px] flex items-center flex-col ">
            <div className="w-full max-w-[1100px]">
                <ElectionsForecast />
                <ElectionsTab />
                <ElectionsVS />
                <ElectionsMap />
                <ElectionsSwingState />
                <ElectionsPopularVS />
                <ElectionsTrending />
            </div>
        </div>
    )
}

export default ElectionPage;