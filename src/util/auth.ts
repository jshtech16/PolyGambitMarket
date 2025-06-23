import axios from "axios";

export const createUser = async (
  name: string,
  wallet: string,
  image: string
) => {
  console.log(name, wallet, image);
  const ret = await axios.post(
    `${process.env.NEXT_PUBLIC_API}user/createUser?name=${name}&wallet=${wallet}&image=${image}`
  );
  console.log(ret);
  return ret;
};

export const getUserNameByWallet = async (wallet: string) => {
  const ret = await axios.post(
    `${process.env.NEXT_PUBLIC_API}user/getUserNameByWallet?wallet=${wallet}`
  );
  return ret.data || null;
};

export const checkUserNameExist = async (name: string): Promise<string> => {
  const ret = await axios.post(
    `${process.env.NEXT_PUBLIC_API}user/checkUserNameExist?&name=${name}`
  );
  return ret.data || null;
};
