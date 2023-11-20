import { Layout } from '@financial-times/dotcom-ui-layout/src/components/Layout'
import '@financial-times/dotcom-ui-layout/styles.scss'
import { documentStyles } from '@financial-times/dotcom-ui-base-styles'
import './styles.scss'
import { getNavigationData } from '../utils/get-navigation'

export const metadata = {
  title: 'Financial Times',
  description: 'Example Next.js app with FT branding'
}

export default async function RootLayout({ children }: { children?: React.ReactNode }) {
  const navigationData = await getNavigationData('foo')
  return (
    <html className="js enhanced" data-o-component="o-typography" style={documentStyles}>
      <body>
        <Layout navigationData={navigationData} headerBefore={<div />}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
