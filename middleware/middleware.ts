"use server"

// THIS IS A PLACE FOR GROUPING MIDDLEWARE CAPABILITIES
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export default class Middleware {
    private isLoggedIn: boolean = false;
    private isOnboardRoute: boolean = false;
    private basePath: string = "/main";
    private onboardPath: string = "/onboard";

    chain = (factories: MiddlewareFactory[], index: number = 0): NextMiddleware => {
        // GET CURRENT MIDDLEWARE
        const current = factories[index];
        // CHECK WHETHER CURRENT MIDDLEWARE IS NULL OR NOT
        if(!!current) {
            const next = this.chain(factories, index + 1);
            return current(next)
        }

        // OTHERWISE
        return () => NextResponse.next()
    }

    private redirectToOnboard = (request: NextRequest) => {
        const pathName = request.nextUrl.pathname
        if(pathName === "/") {
            return NextResponse.redirect(new URL("/login", request.url))
        }
        
        // REWRITE TO REAL LOGIN URL
        return NextResponse.rewrite(new URL(`${this.basePath}${this.onboardPath}${pathName}`, request.url))
    }

    validateWhitelistRoute = (middleware: NextMiddleware) => {
        return async (request: NextRequest, event: NextFetchEvent) => {
            // BY PASS ALL WHITELIST ROUTES
            const isWhiteListed = /((^(\/api\/|\/_next\/))|(\/*.(svg|ico)$))/i.test(request.nextUrl.pathname)
            if (isWhiteListed) {
                return NextResponse.next()
            }
            // OTHERWISE, BRING REQUEST TO NEXT MIDDLEWARE
            return middleware(request, event)
        }
    }

    setProperties = (middleware: NextMiddleware) => {
        return async (request: NextRequest, event: NextFetchEvent) => {
            const accessToken = request.cookies.get('credential');
            this.isLoggedIn = !!accessToken
            this.isOnboardRoute = /(register|login)/i.test(request.nextUrl.pathname)

            return middleware(request, event)
        }
    }

    authentication = (middleware: NextMiddleware) => {
        return async (request: NextRequest, event: NextFetchEvent) => {
            if(!this.isLoggedIn) {
                return this.redirectToOnboard(request)
            }
            // OTHERWISE, BRING REQUEST TO NEXT MIDDLEWARE
            return middleware(request, event)
        }
    }

    rewriteMain = (middleware: NextMiddleware) => {
        return async (request: NextRequest, event: NextFetchEvent) => {
            let { pathname } = request.nextUrl;
            const basePath = "/main"
            let subPath = pathname

            // Jika pengguna sudah login, redirect dari halaman onboarding/login ke home
            if(this.isOnboardRoute) {
                return NextResponse.redirect(new URL("/", request.url));
            }
            // Jika path sudah dalam bentuk final, tidak perlu rewrite
            if (pathname === "/") {
                subPath = "/home"
            }

            return NextResponse.rewrite(new URL(`${basePath}${subPath}`, request.url));
    
    
            // OTHERWISE, BRING REQUEST TO NEXT MIDDLEWARE
            return middleware(request, event);
        };
    }
}