import '@fastify/Jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            sub: string,
            name: string,
            avatarUrl: string
        }
    }
}