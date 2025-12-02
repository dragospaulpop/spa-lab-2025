import { useEffect, useState } from "react"

interface User {
  id: number
  name: string
  email: string
}

export default function Page1() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/page1')
      .then(response => response.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false))
  }, [])

  return <div>{loading ? <p>Loading...</p> : <ul>
    {users.map(user => (
      <li key={user.id}>{user.name} - {user.email}</li>
    ))}
  </ul>}</div>
}