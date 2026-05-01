'use client'

import { useEffect } from 'react'
import { track } from '@/app/lib/track'

type Props = {
  escalationCount: number
  atRiskLeaders: number
  ownershipGaps: number
}

export default function TrackView({ escalationCount, atRiskLeaders, ownershipGaps }: Props) {
  useEffect(() => {
    track('demo_run_view', {
      escalationCount,
      atRiskLeaders,
      ownershipGaps
    })

    const fiveSecondTimer = window.setTimeout(() => {
      track('demo_run_attention_5s', {
        escalationCount,
        atRiskLeaders,
        ownershipGaps
      })
    }, 5000)

    const fifteenSecondTimer = window.setTimeout(() => {
      track('demo_run_attention_15s', {
        escalationCount,
        atRiskLeaders,
        ownershipGaps
      })
    }, 15000)

    return () => {
      window.clearTimeout(fiveSecondTimer)
      window.clearTimeout(fifteenSecondTimer)
    }
  }, [escalationCount, atRiskLeaders, ownershipGaps])

  return null
}
