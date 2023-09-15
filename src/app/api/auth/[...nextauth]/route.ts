import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from "@prisma/client";

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret : process.env.GOOGLE_CLIENT_SECRET ?? ''
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
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
            
        }),
    ],
    callbacks : {
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, token}) {
            session.user = token;
            return session;
        }
        
    }
});

export {handler as GET, handler as POST}
