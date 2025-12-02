import { useEffect, useState } from 'react'
import './App.css'
import Page1 from './page1'
import Page2 from './page2'

function App() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('default message')
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [page, setPage] = useState('page1')

  const fetchFromServer = () => {
    setLoading(true)
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .finally(() => {
        setLoading(false);
        setTriggerFetch(false);
      })
  }

  useEffect(() => {
    console.log('triggerFetch', triggerFetch)
    if (triggerFetch) {
      fetchFromServer()
    }
  }, [triggerFetch])

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
      <button onClick={() => setTriggerFetch(true)} disabled={loading}>Refresh</button>
      <button onClick={() => setPage('page1')}>Page1</button>
      <button onClick={() => setPage('page2')}>Page2</button>
      {page === 'page1' ? <Page1 /> : <Page2 />}
    </div>
  )
}

export default App
