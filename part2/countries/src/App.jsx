import { useEffect, useState } from 'react';
import axios from 'axios'
import Countries from './components/Countries.jsx';

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => {
                console.error('Error fetching countries:', error)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

  return (
    <div>
        <div>
            <form>
                <div>
                    find countries <input value={filter} onChange={handleFilterChange} />
                </div>
            </form>
        </div>
        <Countries countries={countries} search={filter} />
    </div>
  )
}

export default App
