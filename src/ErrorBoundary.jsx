import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    const message = error?.message || "";
    const isChunkError =
      message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Importing a module script failed") ||
      error?.name === "ChunkLoadError";

    if (isChunkError && !sessionStorage.getItem("chunk_reload_attempted")) {
      sessionStorage.setItem("chunk_reload_attempted", "true");
      window.location.reload();
      return;
    }

    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center p-6 text-center relative z-[9999]">
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-[#0d0d14] p-8 space-y-5 shadow-2xl">
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
            <p className="text-sm text-gray-400">
              A new version of the site may have been deployed. Reload the page to fetch the latest bundle.
            </p>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("chunk_reload_attempted");
                window.location.reload();
              }}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-colors"
            >
              Reload Page
            </button>
            <details className="text-left text-xs text-gray-500 whitespace-pre-wrap pt-2">
              <summary className="cursor-pointer hover:text-gray-300">Error details</summary>
              <div className="mt-2">
                {this.state.error && this.state.error.toString()}
                {"\n"}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </div>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
