import { useEffect, useState } from 'react'
import paginate from './paginate';

const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getProducts = async () => {
    const response = await fetch(url)
    const result = await response.json()
   
    setData( paginate(result))
    setLoading(false)
  }

  useEffect(() => {
   getProducts()
  }, []);

  return {loading, data}
}

export default useFetch
