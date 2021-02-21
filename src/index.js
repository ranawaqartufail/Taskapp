import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "antd/dist/antd.css";

import Client from 'aws-appsync'
import {ApolloProvider} from 'react-apollo'
import {Rehydrated} from 'aws-appsync-react'
import AppSync from './AppSync'

const client =new Client({
    url: AppSync.ApiUrl,
    region:AppSync.Region,
    auth:{
      type:AppSync.AuthMode,
      apiKey:AppSync.ApiKey
    }
  })

  const WithProvider=()=>(
    <ApolloProvider client={client}>
      <Rehydrated>
         <App />
      </Rehydrated> 
    </ApolloProvider>
  )

ReactDOM.render(<WithProvider />, document.getElementById("root"));
