const filter = (state = "SHOW_ALL", action: { type: string, filter: boolean }) => {
	switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
          return action.filter
        default:
          return state
      }
}

export default filter;
