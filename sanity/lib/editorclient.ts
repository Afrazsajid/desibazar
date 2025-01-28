import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const editorclient = createClient({
  projectId,
  dataset,
  apiVersion,
  token:process.env.SANITY_EDIT_TOKEN,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  
  
})
