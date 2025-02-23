import { getUserNameByEmail } from "@/actions/profile";

export async function GET({
  params,
}: {
  request: Request;
  params: { email: string };
}) {
  const name = await getUserNameByEmail(params.email);
  return new Response(name, { status: 200 });
}
