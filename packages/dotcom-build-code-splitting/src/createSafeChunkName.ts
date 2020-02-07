export default function createSafeChunkName(name: string) {
  // Remove or replace any non-safe filename characters
  return name.replace('@', '').replace('/', '-')
}
