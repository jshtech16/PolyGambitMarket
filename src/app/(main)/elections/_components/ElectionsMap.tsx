import Image from "next/image";

const ElectionsMap = () => {
    return (
        <div className="py-[50px] lg:py-[100px] w-full flex justify-center">
            <Image src="/assets/img/icons/map.svg" alt="" className="w-[90%]" width={100} height={100} />
        </div>
    )
}

export default ElectionsMap;