import { Prisma, PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> | null;

export function createPrismaClient() {
  prismaClient = new PrismaClient();
  prismaClient.$use(async (params, next) => {
    if (params.action == 'delete') {
      params.action = 'update';
      params.args['data'] = { deleted_at: new Date() };
    }
    return next(params);
  });
  return prismaClient;
}

export function prisma() {
  if (!prismaClient) {
    prismaClient = createPrismaClient();
  }
  return prismaClient;
}
