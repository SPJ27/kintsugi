import { notFound } from "next/navigation";
import { getUserById } from "../actions";
import UserDetails from "./UserDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userData = await getUserById(id);

  if (!userData) {
    notFound();
  }

  return <UserDetails userData={userData} />;
}