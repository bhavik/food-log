import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-6 text-center">
          <p className="text-amber-200">Something went wrong loading this section.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
