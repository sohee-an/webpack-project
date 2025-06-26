import React, { ErrorInfo, ReactNode } from 'react';

export type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

type ErrorBoundaryProps = {
  FallbackComponent: (props: FallbackProps) => React.ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  resetErrorBoundary() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      return <>{FallbackComponent({ error, resetErrorBoundary: this.resetErrorBoundary })}</>;
    }

    return children;
  }
}

export default ErrorBoundary as React.ComponentType<ErrorBoundaryProps>;
