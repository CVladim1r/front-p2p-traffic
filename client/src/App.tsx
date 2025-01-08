import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import NavBar from './components/NavBar'
import TelegramTest from './components/TelegramTest'
import Ads from './components/Ads'
import Chats from './components/Chats'
import Profile from './components/Profile'
import AddAd from './components/AddAd'
import Info from './components/Info'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        <main>
          <Routes>
            <Route path='/tg' element={<TelegramTest />} />
            <Route path='/ads' element={<Ads />} />
            <Route path='/chat' element={<Chats />} />
            <Route path='/make-ad' element={<AddAd />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/info' element={<Info />} />
          </Routes>
        </main>

        <NavBar />

      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
