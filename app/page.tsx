'use client'

import { TopNav } from '@/components/home/top-nav'
import { HeroSection } from '@/components/home/hero-section'
import { SimulatorPanel } from '@/components/home/simulator-panel'
import { TabContent } from '@/components/home/tab-content'
import { FeatureHighlights } from '@/components/home/feature-highlights'
import { WhySection } from '@/components/home/why-section'
import { ProductFooter } from '@/components/home/product-footer'
import { LimitedPilotBanner } from '@/components/home/limited-pilot-banner'
import { EnterpriseTrustSection } from '@/components/home/enterprise-trust-section'
import { PilotScarcityBar } from '@/components/home/pilot-scarcity-bar'
import { FounderCredibility } from '@/components/home/founder-credibility'
import { TrustStrip } from '@/components/home/trust-strip'
import { StartHere } from '@/components/home/start-here'
import { ProductStatusBar } from '@/components/home/product-status-bar'
import { LaunchBanner } from '@/components/home/launch-banner'
import { PilotCta } from '@/components/home/pilot-cta'
import { StickyPilotCta } from '@/components/home/sticky-pilot-cta'
import { CommandPilot } from '@/components/home/command-pilot'
import { DemoModeBanner } from '@/components/home/demo-mode-banner'
import { PracticeWorkspace } from '@/components/practice-workspace'
import { CustomScenarioGenerator } from '@/components/custom-scenario-generator'
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
    handleCustomScenario,
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

        <ProductStatusBar activeTab={activeTab} />        

        <DemoModeBanner onLaunchDemo={handleLaunchPractice} />

        <CustomScenarioGenerator onGenerate={handleCustomScenario} />

        {activeTab === 'practice' ? (
          <>
            <section className="grid gap-5 lg:grid-cols-[1.95fr_1fr]">
              <HeroSection
                onLaunchPractice={handleLaunchPractice}
                onScrollToWorkspace={scrollToWorkspace}
              />

              
            </section>

            <StartHere />

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

        <FounderCredibility />

        <PilotCta />

        <StickyPilotCta />
        <CommandPilot />

        <EnterpriseTrustSection />

        <PilotScarcityBar />

        <LimitedPilotBanner />

        <ProductFooter />
      </div>
    </main>
  )
}
















