import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

const queryClient = new QueryClient();
const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <App />
      </PersistQueryClientProvider>
  </React.StrictMode>,
)
