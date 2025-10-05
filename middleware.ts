import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Bu regex, tüm rotaların herkese açık olmasını sağlar.
  publicRoutes: ["/(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};