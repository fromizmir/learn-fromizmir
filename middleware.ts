import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Hangi sayfaların herkese açık olacağını belirliyoruz.
const isPublicRoute = createRouteMatcher([
  '/', // Ana sayfa
  '/sign-in(.*)', // Giriş yapma sayfası ve alt yolları
  '/sign-up(.*)', // Kayıt olma sayfası ve alt yolları
]);

export default clerkMiddleware((auth, request) => {
  // Eğer ziyaret edilen sayfa herkese açık bir sayfa DEĞİLSE,
  // kullanıcının giriş yapmasını zorunlu kıl.
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};