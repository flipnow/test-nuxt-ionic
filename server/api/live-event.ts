export default defineEventHandler(async (event) => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/search/liveEvents`, {
    method: 'POST',
    body: JSON.stringify({ eventIds: '7xjk8lotjth0fbyfm8uigbu' }),
    headers: { 'Content-Type': 'application/json' },
  });
  var data = await result.json();
  console.log(data);

  return data;
});
