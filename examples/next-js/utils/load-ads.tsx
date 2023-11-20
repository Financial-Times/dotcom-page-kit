'use client'
import { displayAds } from '@financial-times/ads-display'
import { useEffect } from 'react'

const flagsStore = { ads: true }
const flags = { get: (flag) => flagsStore[flag] }

const LoadAds = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('loading ads')
    const displayAdsOptions = {
      sandbox: true, // in this demo context, always sandbox ads
      waitForMoat: true,
      adUnit: ['world', 'coronavirus'],
      appName: 'article'
    }

    displayAds.init({ ...displayAdsOptions }, flags)
    // eslint-disable-next-line no-console
    console.log('loaded ads')
  }, [])
  return <div data-o-ads-name="top" data-o-ads-targeting="pos=top" data-o-ads-formats="MediumRectangle"></div>
}

export default LoadAds
