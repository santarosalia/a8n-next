import { QueryClient } from 'react-query'
import { cache } from 'react'

export default cache(() => new QueryClient());