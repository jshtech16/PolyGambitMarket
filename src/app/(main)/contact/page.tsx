const Page = () => {
    return (
        <div className='px-[20px] py-[50px]'>
            <p className='text-2xl text-white text-center mt-3'>Getting Any Problems?</p>
            <p className="text-sm text-neutral-700 text-center mt-2">Connect with us today to solve the problems by filling the form given below.</p>
            <div className='flex flex-col items-center gap-4 mt-[40px] max-w-[1000px] mx-auto'>
                <div className="w-full">
                    <p className="text-sm text-neutral-700">Name</p>
                    <input
                        type="text"
                        className="w-full h-full px-5 py-3 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none mt-2"
                        required
                    />
                </div>
                <div className="w-full">
                    <p className="text-sm text-neutral-700">Email</p>
                    <input
                        type="text"
                        className="w-full h-full px-5 py-3 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none mt-2"
                        required
                    />
                </div>
                <div className="w-full">
                    <p className="text-sm text-neutral-700">Subject</p>
                    <textarea
                        className='bg-black w-full border border-neutral-700 rounded-lg px-5 py-3 text-sm text-gray-400 placeholder:text-neutral-700 focus-visible:outline-none mt-2'
                        rows={5}
                    />
                </div>
            </div>
            <div className='text-center mt-4'>
                <button className='gradiant-btn px-4 py-2 text-md text-white rounded-lg'>Send Message</button>
            </div>
            <div className="flex mt-[40px] divide-x divide-neutral-700 max-w-[1000px] mx-auto">
                <div className="flex-1 py-5 pe-2">
                    <p className="text-lg text-white text-center">Send Us An Email</p>
                    <p className="text-sm text-neutral-700 text-center mt-2">Our team will respond promptly to your inquires</p>
                    <p className="text-sm text-neutral-700 text-center mt-2">support@abc.com</p>
                    <p className="text-sm text-neutral-700 text-center mt-2">sale@abc.com</p>
                </div>
                <div className="flex-1 py-5 ps-2">
                    <p className="text-lg text-white text-center">For More Inquiry</p>
                    <p className="text-sm text-neutral-700 text-center mt-2">Reach out for immediate assistance</p>
                    <p className="text-sm text-neutral-700 text-center mt-2">+52 451545215 41</p>
                </div>
            </div>
        </div>
    )
}

export default Page;