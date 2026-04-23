import { AnalyticsView } from '@/components/analytics-view'
import { FavoritesView } from '@/components/favorites-view'
import { ResponseHistoryView } from '@/components/response-history-view'
import { QUESTION_BANK } from '@/data/questions'
import type { AnalyticsSnapshot, Card } from '@/types'

type View = 'practice' | 'analytics' | 'favorites' | 'history'

type Props = {
  activeTab: View
  analytics: AnalyticsSnapshot | null
  strongestDomain: string
  weakestDomain: string
  recentTrend: string
  coachingInsight: string
  favoriteCards: Card[]
  onRetryWeakestArea: () => void
  onOpenFavorite: (card: Card) => void
  onOpenHistoryCard: (card: Card) => void
}

export function TabContent({
  activeTab,
  analytics,
  strongestDomain,
  weakestDomain,
  recentTrend,
  coachingInsight,
  favoriteCards,
  onRetryWeakestArea,
  onOpenFavorite,
  onOpenHistoryCard
}: Props) {
  if (activeTab === 'analytics') {
    return (
      <AnalyticsView
        analytics={analytics}
        strongestDomain={strongestDomain}
        weakestDomain={weakestDomain}
        recentTrend={recentTrend}
        coachingInsight={coachingInsight}
        onRetryWeakestArea={onRetryWeakestArea}
      />
    )
  }

  if (activeTab === 'favorites') {
    return (
      <FavoritesView
        favoriteCards={favoriteCards}
        onOpenFavorite={onOpenFavorite}
      />
    )
  }

  if (activeTab === 'history') {
    return (
      <ResponseHistoryView
        onOpenCard={(id) => {
          const card = QUESTION_BANK.find((c) => c.id === id)

          if (card) {
            onOpenHistoryCard(card)
          }
        }}
      />
    )
  }

  return null
}
