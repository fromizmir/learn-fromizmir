import { authMiddleware } from "@clerk/nextjs/server"; // Doğru import adresi burası

// Bu ayar, sitenizdeki tüm sayfaların varsayılan olarak
// herkese açık olmasını sağlar.
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};