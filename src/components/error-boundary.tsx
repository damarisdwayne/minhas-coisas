import { Component } from 'react'
import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallbackLabel?: string
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = () => this.setState({ error: null })

  render() {
    if (this.state.error) {
      return (
        <PageErrorFallback
          label={this.props.fallbackLabel}
          message={this.state.error.message}
          onRetry={this.reset}
        />
      )
    }
    return this.props.children
  }
}

interface FallbackProps {
  label?: string
  message: string
  onRetry: () => void
}

const PageErrorFallback = ({ label, message, onRetry }: FallbackProps) => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-8 text-center">
    <AlertTriangle className="text-destructive" size={36} />
    <div className="space-y-1">
      <p className="font-semibold text-foreground">
        {label ? `Erro em ${label}` : 'Algo deu errado'}
      </p>
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
    </div>
    <Button size="sm" onClick={onRetry}>
      Tentar novamente
    </Button>
  </div>
)
