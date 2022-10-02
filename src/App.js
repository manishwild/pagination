import React, { useEffect, useState } from 'react'
import Follower from './Follower'
import useFetch from './useFetch'

const App = () => {
  const { loading, data } = useFetch()
  // console.log(data)
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, data, page])

  const handlePage = (index) => {
    setPage(index)
  }

  const prePage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  function nxtPage() {
    setPage((oldPage) => {
      let crntPage = oldPage + 1
      if (crntPage > data.length - 1) {
        crntPage = 0
      }
      return crntPage
    })
  }

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'Loading...' : 'Pagination'}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prePage}>
              Pre
            </button>
            {data.map((item, index) => {
              return (
                <button
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  key={index}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className="next-btn" onClick={nxtPage}>
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
