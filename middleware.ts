import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Bu rotalar, giriş yapmamış kullanıcılar dahil herkes tarafından erişilebilir.
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};