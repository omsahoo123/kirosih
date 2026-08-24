import { NextResponse, type NextRequest } from "next/server";

// ── Supabase auth middleware (commented out until .env.local is configured) ──
// import { createServerClient } from "@supabase/ssr";
//
// export async function middleware(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request });
//
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() { return request.cookies.getAll(); },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
//           supabaseResponse = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           );
//         },
//       },
//     }
//   );
//
//   const { data: { user } } = await supabase.auth.getUser();
//
//   // Protect dashboard routes
//   if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/auth/patient";
//     return NextResponse.redirect(url);
//   }
//
//   // Redirect logged-in users away from auth pages
//   if (user && request.nextUrl.pathname.startsWith("/auth")) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/dashboard/patient";
//     return NextResponse.redirect(url);
//   }
//
//   return supabaseResponse;
// }

// ── Passthrough middleware for testing (no Supabase needed) ──
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
