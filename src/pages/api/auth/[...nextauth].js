import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_SECRET,
            version: "2.0",
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token right after signin
            if (account) {
                token.accessToken = account.access_token
            }

            if (profile) {
                token.username = profile.data.username
            }

            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken

            session.handle = token.username

            return session
        }
    }
})