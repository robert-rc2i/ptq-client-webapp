import React from 'react';
import Loading from './components/utils/loading';
import { PageLayout1Column } from './components/ui/Layouts';
import { CurrentInstrumentContextProvider, CurrentInstrumentContext, factoryInitialState } from './components/utils/instrumentContext';
import { CurrentInstrumentPage } from './components/pages/currentInstrumentPage';

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

    <CurrentInstrumentContextProvider initState={factoryInitialState({})}>
      <CurrentInstrumentContext.Consumer>
        {([ctx, reducer]) => {
          return (
            <PageLayout1Column>
              <Loading context={ctx} dispatch={reducer}>
                <CurrentInstrumentPage />
              </Loading>
            </PageLayout1Column>
          )
        }}
      </CurrentInstrumentContext.Consumer>
    </CurrentInstrumentContextProvider>
  );
}

export default App;