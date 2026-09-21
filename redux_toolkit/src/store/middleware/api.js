const api = (store) => (next) => async (action) => {
  next(action);

  if (action.type === 'bugs/bugAssignedToUser') {
    const { bugId, userId } = action.payload;

    try {
      await fetch(`http://localhost:5000/api/bugs/${bugId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId
        })
      });

      console.log('Bug assigned to user and saved to server');
    } catch (error) {
      console.error('Failed to save bug:', error);
    }
  }

  if (action.type === 'bugs/bugResolved') {
    const bugId = action.payload;

    try {
      await fetch(`http://localhost:5000/api/bugs/${bugId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          resolved: true
        })
      });

      console.log('Bug resolved and saved to server');
    } catch (error) {
      console.error('Failed to save bug:', error);
    }
  }
};

export default api;