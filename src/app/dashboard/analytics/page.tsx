export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track your profile performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Profile Views
          </div>
          <div className="mt-2 text-3xl font-bold">0</div>
          <div className="mt-2 text-xs text-muted-foreground">
            Coming soon
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Collaboration Requests
          </div>
          <div className="mt-2 text-3xl font-bold">0</div>
          <div className="mt-2 text-xs text-muted-foreground">
            Coming soon
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Active Collabs
          </div>
          <div className="mt-2 text-3xl font-bold">0</div>
          <div className="mt-2 text-xs text-muted-foreground">
            Coming soon
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950 rounded-xl border p-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Detailed Analytics Coming Soon</h2>
          <p className="text-muted-foreground">
            Get insights into your profile performance, audience demographics, and more.
          </p>
        </div>
      </div>
    </div>
  )
}

