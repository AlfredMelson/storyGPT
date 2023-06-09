import { createNextApiHandler } from '@trpc/server/adapters/next'

import { env } from '@src/env/server.mjs'
import { createContext } from '@src/server/trpc/context'
import { appRouter } from '@src/server/trpc/router/_app'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`[api/trpc/] ❌ tRPC failed on ${path}: ${error}`)
        }
      : undefined,
})
