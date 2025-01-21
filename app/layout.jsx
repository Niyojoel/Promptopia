import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { PromptProvider } from '@components/context';
import '@styles/globals.css'
import { Suspense } from 'react';

export const metadata = {
    title: "Promptopia",
    description: "Discover and Share AI Prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <PromptProvider>
                    <div className="main">
                        <div className="gradient"/>
                        <div className="hero_bcg"/>
                    </div>
                    <main className='app'>
                        <Nav/>
                        <Suspense fallback={<div>Loading...</div>}>
                            {children}
                        </Suspense>
                    </main>
                </PromptProvider>
            </Provider>
        </body>
    </html>
  )
};

export default RootLayout;