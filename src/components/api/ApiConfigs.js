
const hostName = window.location.hostname + ":8081";
const protocol = window.location.protocol;

//It is expected to have Pianoteq on the same device as this SPA
let pianoteqUrl = "";

//Setup the Pianoterq URL based on the current environnemt.
if (process.env.REACT_APP_Environnement === "PROD") {
    pianoteqUrl = `${protocol}//${hostName}/jsonrpc`;
}  else {
    pianoteqUrl = "/jsonrpc";
}

// Expose the URL stored locally first, otherwise take the default one from above
export const apiBaseUrl = window.localStorage.getItem("ptqUrl") ? window.localStorage.getItem("ptqUrl") : pianoteqUrl;

console.log("Environement: ", process.env.REACT_APP_Environnement);
console.log("ApiConfigs - Private & public base url:", apiBaseUrl);