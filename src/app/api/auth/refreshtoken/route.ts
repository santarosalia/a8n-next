import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    const cookie = cookies();
    const refreshToken = cookie.get('SantaRosalia');
    return new NextResponse(JSON.stringify(refreshToken));
}

export const POST = async (req: NextRequest) => {
    const refreshToken = req.cookies.get('SantaRosalia');
    console.log(refreshToken);
    
}

export const DELETE = async () => {
    const cookie = cookies();
    cookie.delete('SantaRosalia');
    return new NextResponse();
}