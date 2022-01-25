# Proxy

This is the source code for the proxy server.

## Purpose

The proxy only fetches data from the actual source of data and forwards it to the frontend. The purpose of the proxy is to circumvent CORS limitations for the page deployed on GitHub Pages. The allowed origin for the proxy has been set to: `https://jdingo.github.io` only.