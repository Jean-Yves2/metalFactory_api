import { Prisma } from '@prisma/client';

/**
 *? Ce Middleware pour supprime les mot de passe des résultats des requêtes Prisma
 */
export const prismaPasswordFilterMiddleware: Prisma.Middleware = async (
  params,
  next,
) => {
  const result = await next(params);

  if (params.model === 'Quote' && result && Array.isArray(result)) {
    result.forEach((quote: any) => {
      if (quote.client) {
        delete quote.client.password;
      }
    });
  } else if (params.model === 'Quote' && result?.client) {
    delete result.client.password;
  }

  return result;
};
