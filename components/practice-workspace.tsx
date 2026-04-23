import { PracticeView } from '@/components/practice-view'
import { SessionSetup } from '@/components/session-setup'
import type { Card, SessionSettings } from '@/types'

type Props = {
  settings: SessionSettings
  setSettings: React.Dispatch<React.SetStateAction<SessionSettings>>
  isLoading: boolean
  currentCard: Card | null
  questionNumber: number
  showPrompt: boolean
  showExemplar: boolean
  onRevealPrompt: () => void
  onRevealExemplar: () => void
  onNext: () => void
}

export function PracticeWorkspace({
  settings,
  setSettings,
  isLoading,
  currentCard,
  questionNumber,
  showPrompt,
  showExemplar,
  onRevealPrompt,
  onRevealExemplar,
  onNext
}: Props) {
  return (
    <section
      id="practice-workspace"
      className="grid gap-6 lg:grid-cols-3"
    >
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <SessionSetup
          settings={settings}
          setSettings={setSettings}
        />
      </div>

      <div className="lg:col-span-2">
        {isLoading ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
            Loading practice workspace...
          </div>
        ) : currentCard ? (
          <PracticeView
            card={currentCard}
            settings={settings}
            progressLabel={`Question ${questionNumber}`}
            showPrompt={showPrompt}
            showExemplar={showExemplar}
            onRevealPrompt={onRevealPrompt}
            onRevealExemplar={onRevealExemplar}
            onNext={onNext}
          />
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
            No questions available.
          </div>
        )}
      </div>
    </section>
  )
}