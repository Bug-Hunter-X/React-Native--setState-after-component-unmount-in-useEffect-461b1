The solution involves using the cleanup function provided by `useEffect` to cancel the asynchronous operation before the component unmounts.  This prevents the `setState` call after the component is unmounted.

```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const controller = new AbortController(); // AbortController for cleanup
    fetchData();

    return () => {
      controller.abort(); // Abort the fetch if the component unmounts
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data ? JSON.stringify(data, null, 2) : 'No data'}
    </div>
  );
};

export default MyComponent;
```