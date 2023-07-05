// ** Router Import
import Router from './router/Router';

// ** React Query Import
import { QueryClientProvider, QueryClient } from 'react-query';
import { SocketProvider } from './utility/context/Socket';

import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData, setTemplateData } from './utility/Utils';
import {
  contactsAction,
  getLeadsSourceAction,
  getTagsAction,
  getStagesAction
} from './views/contacts/store/actions';
import { TemplateContext } from './utility/context/Template';
import { getOnboardingStatus } from './requests/onboarding';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  const { setElements } = useContext(TemplateContext);
  // ** Get Current User
  const [curUserInfo, setCurrentUserInfo] = useState();
  // ** Get All Contacts
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUserInfo(getUserData());
  }, []);

  useEffect(() => {
    if (curUserInfo) {
      dispatch(contactsAction());
      dispatch(getTagsAction());
      dispatch(getStagesAction());
      dispatch(getLeadsSourceAction());
    }
    (async () => {
      const onboardingStatus = await getOnboardingStatus();
      localStorage.setItem('onboarding', JSON.stringify(onboardingStatus));
    })();
  }, [dispatch, curUserInfo]);

  //** Set Template Elements
  useEffect(() => {
    if (curUserInfo) {
      setElements(setTemplateData(curUserInfo.plan.permissions));
    }
  }, [curUserInfo]);

  return (
    <QueryClientProvider client={client}>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default App;
