function postAdventure() {
  return fetch ('https://117105e4-6093-4d95-8632-31f93d58b35a.mock.pstmn.io/api/v0/adventures', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      "data": {
            "type": "adventures",
            "user_id": 12
      }
    }),
  })
  .then(response => response.json())

}

export default postAdventure;