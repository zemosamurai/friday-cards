import React, { useEffect } from 'react'

import { ThemeProvider } from 'styled-components'

import { Header } from 'common/components/Header/Header'
import { Loader } from 'common/components/Loader/Loader'
import { Snackbar } from 'common/components/Snackbar/Snackbar'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { authMeTC } from 'features/auth/authSlice'
import { Pages } from 'pages/Pages'
import { GlobalStyle, theme } from 'styles/theme'
import 'rsuite/dist/rsuite.min.css'
function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Loader />
      <Snackbar />
      <Header />
      <Pages />
    </ThemeProvider>
  )
}

export default App
