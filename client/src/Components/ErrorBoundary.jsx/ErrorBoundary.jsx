import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error reporting service.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI here.
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
