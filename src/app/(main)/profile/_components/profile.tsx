import { useAccount } from "wagmi";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userName } from "@/providers/redux/AuthSlice";

const Profile = () => {
  const _userName = useSelector(userName);
  const [name, setName] = useState("");
  const { address } = useAccount();

  useEffect(() => {
    setName(_userName);
  }, []);

  const handleClipCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(address));
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleUploadAvatar = () => {};

  return (
    <div className="px-[20px] py-[50px]">
      <div className="flex justify-center items-center flex-col relative">
        <div className="w-[80px] h-[80px] rounded-full bg-avatar-gradient"></div>
        <p
          className="text-sm text-black bg-[#BFF816] rounded-full px-2 py[2px] absolute bottom-[-10px] cursor-pointer"
          onClick={handleUploadAvatar}
        >
          <CameraAltIcon className="text-[15px] text-black me-1" />
          Upload
        </p>
        <input
          type="file"
          className="absolute bottom-[-10px] w-[90px] h-[20px] opacity-0"
        />
      </div>
      <p className="text-2xl text-white text-center mt-3">{name}</p>
      <div className="flex justify-center gap-2 mt-2">
        <p className="text-sm text-white bg-neutral-700 px-3 py-[2px] rounded-full">
          {address?.slice(0, 5)}....
        </p>
        <p
          className="text-sm text-white bg-neutral-700 px-3 py-[2px] rounded-full cursor-pointer"
          onClick={handleClipCopy}
        >
          Copy
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-5">
        <input
          type="text"
          className="w-full h-full px-5 py-3 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none max-w-[1000px]"
          placeholder="Email"
          required
        />
        <input
          type="text"
          className="w-full h-full px-5 py-3 text-sm text-gray-400 border border-neutral-700 rounded-lg bg-black placeholder:text-neutral-700 focus-visible:outline-none max-w-[1000px]"
          placeholder="Username"
          required
        />
        <textarea
          className="bg-black w-full border border-neutral-700 rounded-lg px-5 py-3 text-sm text-gray-400 placeholder:text-neutral-700 focus-visible:outline-none max-w-[1000px]"
          rows={5}
          placeholder="Write Description Here...."
        />
      </div>
      <div className="text-center mt-4">
        <button className="gradiant-btn px-4 py-2 text-md text-white rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
