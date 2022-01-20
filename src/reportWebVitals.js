const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    console.log("Initializing web vitals...")
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      console.log("Calling vitals...")
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
