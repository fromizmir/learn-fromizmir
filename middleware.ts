import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // publicRoutes listesine "/quizzes" eklendi
  publicRoutes: ["/", "/sign-in", "/sign-up", "/quizzes"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};