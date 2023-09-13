import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : '639298869227-74ado9k12oc3sh0vc6d1s68kbu71sl35.apps.googleusercontent.com',
            clientSecret : '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'
        })
    ]
});

export {handler as GET, handler as POST}
