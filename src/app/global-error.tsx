"use client";

// Last-resort error boundary. Required by Next.js — wraps the entire
// app including the root layout. Triggered when the layout itself
// throws or an error escapes /src/app/error.tsx. Renders its own <html>
// since the layout chain may be broken.

import { useEffect } from "react";

export default function GlobalError({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[global-error.tsx]", error);
  }, [error]);

  return (
    <html>
      <body style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #2a1640 0%, #160a26 55%, #0a0414 100%)",
        color: "#f4ebd9",
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1.5rem",
      }}>
        <div
          style={{
            maxWidth: 440,
            width: "100%",
            padding: "32px 28px",
            borderRadius: 24,
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(18px) saturate(140%)",
            WebkitBackdropFilter: "blur(18px) saturate(140%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 24px 60px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          <p style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "#fca5a5", marginBottom: 16 }}>
            Critical error
          </p>
          <h1 style={{ fontSize: 32, marginBottom: 12, fontWeight: 700 }}>Something broke badly.</h1>
          <p style={{ fontSize: 13, color: "rgba(244,235,217,0.65)", lineHeight: 1.6, marginBottom: 16 }}>
            The app couldn&apos;t recover from an error in its root layout. This shouldn&apos;t happen — the team has been notified via the build logs.
          </p>
          {error.digest && (
            <p style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(244,235,217,0.4)", marginBottom: 16 }}>
              ref: {error.digest}
            </p>
          )}
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              background: "rgba(255,107,53,0.18)",
              color: "#ff8b5c",
              border: "1px solid rgba(255,107,53,0.35)",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
