import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { User } from "../types";

export const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (
  response: CredentialResponse
): Promise<void> => {
  const base64Url: string = response!.credential!.split(".")[1];
  const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload: string = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { name, picture, sub } = JSON.parse(jsonPayload);

  const user: User = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  await axios.post(`${BASE_URL}/api/auth`, user);
};
