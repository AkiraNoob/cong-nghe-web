'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import theme from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
