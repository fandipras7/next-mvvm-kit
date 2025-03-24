import axios from 'axios';
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    // INTERPOLATING API URL OF BACKEND
    const url: string = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
    // GET REQUEST BODY
    const requestBody = await request.json();

    try {
        // MAKE AN API REQUEST
        /*
        * - WE USE AXIOS INSTEAD OF FETCH 
        * - FETCH ALWAYS RETURNS "TypeError [ERR_INVALID_STATE]: Invalid state: ReadableStream is already closed" 
        *   WHEN WE RUN "response.json()"
        */
        const response = await axios(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: 'emilys',
                password: 'emilyspass',
            })
        })
      
        if (response?.data ?? false) {
            const token: string = response.data.accessToken
            cookies().set({
                name: 'credential',
                value: token,
                httpOnly: false,
                sameSite: 'strict',
                path: '/',
            })    
        }
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(error.response.data, { status: error.response.status });
    }
}