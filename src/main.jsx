import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationProvider } from './notification/context.js'
import "../src/uitilities/services/tokenService.js"
import { Provider } from 'react-redux';
import { store } from './store/store.js'


const queryclient= new QueryClient
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryclient} >
     <NotificationProvider>
     <Provider store={store} >
       <App />
     </Provider>
     </NotificationProvider>
   </QueryClientProvider>
  </StrictMode>,
)
