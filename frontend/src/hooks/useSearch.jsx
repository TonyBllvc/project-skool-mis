import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext'

const useSearch = () => {
    const { user } = useAuthContext()

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])

  return (
    <div>useSearch</div>
  )
}

export default useSearch