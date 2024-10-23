import React, { Component } from 'react';
import { FullScreenLayout } from 'layouts/FullScreenLayout/FullScreenLayout';
import { Error } from 'views/Error/Error';
import { logAnalyticsEvent } from 'providers/firebase/analytics';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // logAnalyticsEvent(error.toString(), errorInfo);

    logAnalyticsEvent('app_error', {
      value: error.toString(),
      content: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <FullScreenLayout>
          <Error clearError={() => this.setState({ hasError: false })} />
        </FullScreenLayout>
      );
    }

    return this.props.children;
  }
}
