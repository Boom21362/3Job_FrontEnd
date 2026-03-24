export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/reservations/manage",
    "/profile/:path*",
    "/admin/dashboard",
    "/profile",
  ],
};
