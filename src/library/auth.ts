import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/option";

export async function GetCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return session.user;
}