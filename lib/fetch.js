//useSWR will use the fetcher func to fetch /api/user
//SWR is a strategy to first return the data from the cache, then send fetch request (revalidate), and then come up with the up-to-date data
export const fetcher = (...args) => {
  return fetch(...args).then(async (res) => {
    let payload;
    try {
      if (res.status === 204) return null; // 204 does not have body
      payload = await res.json();
    } catch (e) {
      /* noop */
    }
    if (res.ok) {
      return payload;
    } else {
      return Promise.reject(payload.error || new Error('Something went wrong'));
    }
  });
};
