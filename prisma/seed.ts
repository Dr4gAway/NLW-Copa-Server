import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'John.doe@gmail.com',
            avatarUrl: 'https://github.com/Dr4gAway.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            tittle: 'Example Pool',
            code: 'ABC123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2023-01-23T01:22:33.072Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }

    })

    await prisma.game.create({
        data: {
            date: '2023-02-25T12:00:00.072Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }

    })

}

main()