import React, {ErrorInfo, ReactNode, Suspense} from 'react'
import {PageError} from '@/widgets/PageError'

interface ErrorBoundaryProps {
  // ReactNode - тип под который попадает любой реакт компонент
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback="">
          <PageError/>
        </Suspense>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
