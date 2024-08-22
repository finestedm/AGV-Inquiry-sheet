// src/components/TokenLogger.tsx
import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

export default function AppClient() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const fetchToken = async () => {
      if (accounts.length === 0) {
        console.log('No user accounts available');
        return;
      }

      const request = {
        ...loginRequest,
        account: accounts[0],
      };

      try {
        // Attempt to acquire the token silently
        const response = await instance.acquireTokenSilent(request);
        console.log('Access Token:', response.accessToken);
      } catch (error) {
        console.error('Error acquiring token silently:', error);

        // Fallback to interactive login if silent token acquisition fails
        instance.loginPopup(loginRequest).then(response => {
          console.log('Access Token (Popup):', response.accessToken);
        }).catch(error => {
          console.error('Error acquiring token interactively:', error);
        });
      }
    };

    fetchToken();
  }, [instance, accounts]);

  return <div>Check the console for the token.</div>;
};
