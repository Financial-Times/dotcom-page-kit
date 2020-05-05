import React from 'react'

export function ClientEmbed({ id, data }: { id: string; data: object }) {
  return <script type="application/json" id={id} dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
