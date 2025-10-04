import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Aşağıdaki rotalar koruma dışında bırakılacaktır.
  // Herkes bu sayfalara erişebilir.
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};