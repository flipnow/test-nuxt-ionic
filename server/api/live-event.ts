export default defineEventHandler(async (event) => {
  const result = await fetch(`https://europe-west1-elisashop-a7b5f.cloudfunctions.net/shopApi/search/liveEvents`, {
    method: 'POST',
    body: JSON.stringify({ eventIds: '7xjk8lotjth0fbyfm8uigbu' }),
    headers: { 'Content-Type': 'application/json' },
  });
  var data = await result.json();
  console.log(data);

  return data;
});
