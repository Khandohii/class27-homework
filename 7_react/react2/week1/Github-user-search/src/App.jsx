import './App.css';
import { useContext, useState, useMemo } from 'react';
import useSWR from 'swr';
import { SearchQueryContext } from './SearchQueryContext';

const fetcher = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

function App() {
  const [searchRequest, setSearchRequest] = useState('');

  return (
    <>
      <h1>GitHub users searcher</h1>

      <SearchQueryContext.Provider value={searchRequest}>
        <Form setSearchRequest={setSearchRequest} />

        <Result />
      </SearchQueryContext.Provider>
    </>
  );
}

const Form = ({ setSearchRequest }) => {
  const value = useContext(SearchQueryContext);
  return (
    <form action="/">
      <input
        type="text"
        name="query"
        value={value}
        className='input'
        onChange={(e) => setSearchRequest(e.target.value)}
      />
    </form>
  );
}

const Result = () => {
  const query = useContext(SearchQueryContext);

  if (!query || query.length === 0) {
    return <div className="search-message">No results...</div>;
  }

  return <UsersList query={query} />;
}

const UsersList = ({ query }) => {
  const url = `https://api.github.com/search/users?q=${query}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  const renderList = useMemo(() => {
    if (!data || data.items.length === 0) {
      return <div className="search-message">No results...</div>;
    }

    return (
      <ul className='user-list'>
        {data.items.map((item) => (
          <li key={item.id}>
            <a href={item.html_url} target='_blank' rel="noreferrer">
              <span className="thumb"><img src={item.avatar_url} alt={item.login} /></span>
              {item.login}
            </a>
          </li>
        ))}
      </ul>
    );
  }, [data]);

  if (error) {
    return <div className="error-message">{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{renderList}</>;
}

export default App;