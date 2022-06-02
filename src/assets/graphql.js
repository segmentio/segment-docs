const getWorkspaces = () => {

  const options = {
    "headers": {
      "accept": "*/*, application/json",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "fetch",
      "x-timezone": "America/Los_Angeles",
    },
    "referrer": "https://app.segment.com/workspaces",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"operationName\":\"getWorkspaces\",\"variables\":{},\"query\":\"query getWorkspaces {\\n  workspaces: workspaces {\\n    id\\n    slug\\n    name\\n    isCurrentUserOwner\\n    isCurrentUserExemptFromSSO\\n    sso {\\n      defaultAuth0ConnectionId\\n      auth0ConnectionIds\\n      isForced\\n      __typename\\n    }\\n    owners {\\n      id\\n      __typename\\n    }\\n    lockouts {\\n      workspaceId\\n      reason\\n      message\\n      createdAt\\n      __typename\\n    }\\n    billing {\\n      isOnStartupProgram\\n      isFreeAccount\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }
  const workspaceResponse = fetch ("https://app.segment.com/gateway-api/graphql", options)

  console.log(workspaceResponse)

}

getWorkspaces()
