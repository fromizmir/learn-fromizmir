import { authMiddleware } from "@clerk/nextjs";

// Bu, sitenizin herkese açık olmasını sağlar ve Clerk'in
// giriş/kayıt sayfalarını düzgün yönetmesine olanak tanır.
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};