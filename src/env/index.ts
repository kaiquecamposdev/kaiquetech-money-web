import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().default('http://localhost'),
  API_PORT: z.coerce.number().default(8000),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success !== true) {
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
