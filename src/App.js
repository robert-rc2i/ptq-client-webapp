import React from 'react';
import { Loading } from './components/utils/loading';
import { PageLayout1Column } from './components/ui/Layouts';
import { CurrentInstrumentContextProvider } from './components/utils/instrumentContext';
import { PageRoute } from './components/pages/pageRouter';

/**
 * Helper function to scroll to the top of the page.  Usefull when reloading a page
 */
function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function App() {

  console.log("[App::Main] Started...");

  //Scroll to top on page refresh
  scrollToTop();

  return (

    <CurrentInstrumentContextProvider>
      <PageLayout1Column>
        <Loading>
          <PageRoute />
        </Loading>
      </PageLayout1Column>
    </CurrentInstrumentContextProvider>
  );
}

export default App;