const LEETCODE_USERNAME = 'justnotarandomkid'
const LEETCODE_API_URL = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`

export default async function handler(req, res) {
  try {
    const upstreamResponse = await fetch(LEETCODE_API_URL, {
      headers: {
        Accept: 'application/json'
      }
    })

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')

    if (!upstreamResponse.ok) {
      const body = await upstreamResponse.text()
      res.status(upstreamResponse.status).json({
        error: 'LeetCode upstream error',
        status: upstreamResponse.status,
        body
      })
      return
    }

    const data = await upstreamResponse.json()
    res.status(200).json(data)
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(500).json({ error: 'LeetCode proxy failed' })
  }
}
