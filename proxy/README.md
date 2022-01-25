# Proxy

This is the source code for the proxy server. The proxy only fetches data from the actual source of data and forwards it to the frontend. 

## Purpose

The purpose of the proxy is to circumvent CORS limitations. The actual endpoint does not permit cross-origin requests from the web application at the origin `https://jdingo.github.io`. Therefore, this proxy is set up and is configured to permit cross-origin requests from the origin `https://jdingo.github.io`. The web application then can make requests to the proxy instead which forwards the requests to the actual endpoint. After getting a response from the actual endpoint, the proxy forwards the response back to the frontend according to the proxy's CORS policies.