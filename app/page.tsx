'use client'

import { TopNav } from '@/components/home/top-nav'
import { HeroSection } from '@/components/home/hero-section'
import { SimulatorPanel } from '@/components/home/simulator-panel'
import { TabContent } from '@/components/home/tab-content'
import { FeatureHighlights } from '@/components/home/feature-highlights'
import { WhySection } from '@/components/home/why-section'
import { ProductFooter } from '@/components/home/product-footer'
import { TrustStrip } from '@/components/home/trust-strip'
import { ProductStatusBar } from '@/components/home/product-status-bar'import { LaunchBanner } from '@/components/home/launch-banner'
import { PracticeWorkspace } from '@/components/practice-workspace'
import { useHomeDashboard } from '@/hooks/use-home-dashboard'

export default function HomePage() {
  const {
    activeTab,
    setActiveTab,
    currentCard,
    showPrompt,
    showExemplar,
    questionNumber,
    analytics,
    isLoading,
    settings,
    setSettings,
    favoriteCards,
    strongestDomain,
    weakestDomain,
    recentTrend,
    coachingInsight,
    handleLaunchPractice,
    handleNext,
    handleRetryWeakestArea,
    handleOpenPracticeCard,
    scrollToWorkspace,
    setShowPrompt,
    setShowExemplar
  } = useHomeDashboard()

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <TopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <ProductStatusBar activeTab={activeTab} />        <LaunchBanner />

        {activeTab === 'practice' ? (
          <>
            <section className="grid gap-5 lg:grid-cols-[1.95fr_1fr]">
              <HeroSection
                onLaunchPractice={handleLaunchPractice}
                onScrollToWorkspace={scrollToWorkspace}
              />

              <SimulatorPanel
                totalCompleted={analytics?.totalCompleted ?? 0}
                strongestDomain={strongestDomain}
              />
            </section>

            <TrustStrip />

            <FeatureHighlights />

            <WhySection />

            <PracticeWorkspace
              settings={settings}
              setSettings={setSettings}
              isLoading={isLoading}
              currentCard={currentCard}
              questionNumber={questionNumber}
              showPrompt={showPrompt}
              showExemplar={showExemplar}
              onRevealPrompt={() => setShowPrompt(true)}
              onRevealExemplar={() => setShowExemplar(true)}
              onNext={handleNext}
            />
          </>
        ) : (
          <TabContent
            activeTab={activeTab}
            analytics={analytics}
            strongestDomain={strongestDomain}
            weakestDomain={weakestDomain}
            recentTrend={recentTrend}
            coachingInsight={coachingInsight}
            favoriteCards={favoriteCards}
            onRetryWeakestArea={handleRetryWeakestArea}
            onOpenFavorite={handleOpenPracticeCard}
            onOpenHistoryCard={handleOpenPracticeCard}
          />
        )}

        <ProductFooter />
      </div>
    </main>
  )
}
