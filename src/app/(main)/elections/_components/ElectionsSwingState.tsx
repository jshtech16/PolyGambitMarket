import Image from "next/image";

const ElectionsSwingState = () => {

    const data = [
        {
            title: 'arizona',
            votes: 11,
            child: [
                {
                    title: 'trump',
                    rate: 64,
                    img: '/assets/img/trump.png'
                },
                {
                    title: 'harris',
                    rate: 36,
                    img: '/assets/img/haris.png'
                }
            ]
        },
        {
            title: 'georgia',
            votes: 16,
            child: [
                {
                    title: 'trump',
                    rate: 59,
                    img: '/assets/img/trump.png'
                },
                {
                    title: 'harris',
                    rate: 41,
                    img: '/assets/img/haris.png'
                }
            ]
        },
        {
            title: 'pennsylvania',
            votes: 19,
            child: [
                {
                    title: 'trump',
                    rate: 49,
                    img: '/assets/img/trump.png'
                },
                {
                    title: 'harris',
                    rate: 51,
                    img: '/assets/img/haris.png'
                }
            ]
        },
        {
            title: 'pennsylvania',
            votes: 19,
            child: [
                {
                    title: 'trump',
                    rate: 49,
                    img: '/assets/img/trump.png'
                },
                {
                    title: 'harris',
                    rate: 51,
                    img: '/assets/img/haris.png'
                }
            ]
        },
        {
            title: 'arizona',
            votes: 11,
            child: [
                {
                    title: 'trump',
                    rate: 64,
                    img: '/assets/img/trump.png'
                },
                {
                    title: 'harris',
                    rate: 36,
                    img: '/assets/img/haris.png'
                }
            ]
        },
        {
            title: 'georgia',
            votes: 16,
            child: [
                {
                    title: 'trump',
                    rate: 59,
                    img: '/assets/img/trump.png'
                },
                {
                    title: 'harris',
                    rate: 41,
                    img: '/assets/img/haris.png'
                }
            ]
        }
    ]

    return (
        <div>
            <p className="text-2xl text-white font-integralcf">SWING STATES</p>
            <div className="mt-[20px] lg:mt-[30px] flex lg:grid grid-cols-6 lg:grid-cols-3 gap-[20px] overflow-x-scroll hide-scroll">
                {
                    data.map((ele, idx) => (
                        <div className="p-6 border border-[#565656] rounded-lg flex flex-col gap-[10px]" key={idx}>
                            <div className="flex justify-between items-center gap-[30px]">
                                <p className="text-base lg:text-2xl text-white font-integralcf mb-[6px]">{ele.title}</p>
                                <div className="flex gap-1 items-center">
                                    <p className="text-base lg:text-2xl text-white font-bold">{ele.votes}</p>
                                    <div>
                                        <p className="text-[10px] lg:text-base text-[#535353] leading-[13px]">Electoral</p>
                                        <p className="text-[10px] lg:text-base text-[#535353] leading-[13px]">votes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                {
                                    ele.child.map((element, jdx) => (
                                        <div className="flex items-center gap-[10px] bg-[rgba(217,217,217,0.2)] rounded-md h-[45px] px-4 relative" key={jdx}>
                                            <div className={`h-[45px] rounded-md absolute top-0 left-0 ${jdx === 0 ? 'bg-[rgba(256,0,0,0.7)]' : 'bg-[rgba(0,136,204,0.7)]'}`} style={{ width: element.rate + '%' }}></div>
                                            <p className="text-base lg:text-2xl text-white font-integralcf relative">{element.rate}%</p>
                                            <Image src={element.img} alt="" className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] relative" width={100} height={100} />
                                            <p className="text-[10px] lg:text-base text-white font-integralcf relative">{element.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ElectionsSwingState;