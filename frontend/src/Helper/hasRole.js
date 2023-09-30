function hasRole(data = [], role) {
  if (data.length) {
    return data.find((element) => {
      return element.name === role;
    });
  }
  return false;
}

export default hasRole;
