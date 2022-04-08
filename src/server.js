export const getProfile = (user_id) => {
  const info = { user_id: user_id };
  return fetch('/getProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  })
    .then((response) => response.json())
    .then((data) => data);
};

export const updateProfile = (user_id, name, img, bio) => {
  const info = { user_id: user_id, name: name, img: img, bio: bio };
  fetch('/updateProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  })
    .then((response) => response.json())
    // Ignore eslint for this line because we will likely use this data for something (response) in the future
    // eslint-disable-next-line no-unused-vars
    .then((data) => { });
};