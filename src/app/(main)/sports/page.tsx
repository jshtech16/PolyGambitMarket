import MobileSportsTags from "./_components/MobileSportsTags";
import Sports from "./_components/Sports";
import SportsSidebar from "./_components/SportsSidebar";

const Page = () => {
    return (
        <div className="bg-black">
            <MobileSportsTags />
            <div className="container mx-auto px-[20px] py-[20px] xl:py-[40px] flex gap-[30px]">
                <SportsSidebar />
                <Sports />
            </div>
        </div>
    )
}

export default Page;