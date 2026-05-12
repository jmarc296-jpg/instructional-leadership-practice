import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie = (await headers()).get("cookie") ?? ""
  const hasClerkSession =
    cookie.includes("__session") || cookie.includes("__client_uat")

  if (!hasClerkSession) {
    redirect("/sign-in")
  }

  return <>{children}</>
}
