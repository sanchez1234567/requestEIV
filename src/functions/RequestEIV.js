export default async function RequestEIV(url, changeButton, info) {
  try {
    changeButton(true);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  } catch (err) {}
}
