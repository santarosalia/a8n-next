import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from "@/app/lib/prisma";

const handler = NextAuth({
    adapter : PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialProvider({
            name : 'Credentials',
            credentials : {
                email : { label : 'Email', type : 'text', placeholder : 'test@example.com'},
                password : { label : 'Passwoard', type : 'password', placeholder : 'pw'}
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password,
                    }),
                });
                const user = await res.json();
                console.log(res)
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
            
        }),
    ],
    session : {
        strategy : "jwt",
        maxAge : 10 * 60 * 60
    },
    callbacks : {
        async jwt({token, user, account}) {
            if (account?.provider === 'google' ) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin/exists`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    email: token.email,
                    }),
                });
                const user = await res.json();
                token.accessToken = user.accessToken;
            }
            return {...token, ...user};
        },
        async session({session, token, user}) {
            session.user = token;
            return session;
        }
    }
});

export {handler as GET, handler as POST}
