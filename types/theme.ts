export interface Theme {
  color: {
    title: string,
    font: string,
    background: string
  },
  font: {
    size: number
  }
}

export const DEAULT_THEME: Theme = {
  color: {
    title: '#c83000',
    font: '#000000',
    background: '#ffebcd'
  },
  font: {
    size: 10
  }
}

export const PROTECT_EYE_THEME: Theme = {
  color: {
    title: '#8f583d',
    font: '#000000',
    background: '#ebfed5'
  },
  font: {
    size: 10
  }
}